using OpenAI.Chat;
using VRL.API.Models;
using VRL.API.AI;
using VRL.API.DTOs;

namespace VRL.API.Services;

public class AIService
{
    private readonly IConfiguration _configuration;
    private readonly ChatClient _chatClient;
    private readonly string _apiKey;
    private readonly string _model;
    private readonly VendorService _vendorService;
    private readonly IncidentsService _incidentService;
    private readonly DashboardService _dashboardService;
    public AIService(
    IConfiguration configuration,
    VendorService vendorService,
    IncidentsService incidentService,
    DashboardService dashboardService)
    {
        _configuration = configuration;

        _apiKey = _configuration["OpenAI:ApiKey"]!;
        _model = _configuration["OpenAI:Model"]!;

        _chatClient = new ChatClient(
            model: _model,
            apiKey: _apiKey);
        _vendorService = vendorService;
        _incidentService = incidentService;
        _dashboardService = dashboardService;
    }

    #pragma warning disable OPENAI001

    public async Task<string> AskAIAsync(string prompt)
    {
        List<ChatMessage> messages =
        [
            new UserChatMessage(prompt)
        ];

        var result = await _chatClient.CompleteChatAsync(messages);

        return result.Value.Content[0].Text;
    }

    #pragma warning restore OPENAI001

   public async Task<string> GenerateVendorSummaryAsync(Vendor vendor, List<Incident> incidents)
    {
        var openIncidents = incidents.Where(i => i.Status == "Open").ToList();
        var openIncidentNumbers = openIncidents.Select(i => i.IncidentNumber).ToList();
        var criticalIncidents = openIncidents.Count(i => i.Severity == "Critical");

        var prompt = $@"
        You are a Senior Vendor Risk Analyst with extensive experience in Third-Party Risk Management.

        Analyze the following vendor information and prepare a professional executive report.

        Vendor Information

        Vendor Name: {vendor.VendorName}
        Vendor Type: {vendor.VendorType}
        Risk Rating: {vendor.RiskRating}
        Status: {(vendor.IsActive ? "Active" : "Inactive")}
        Next Review Date: {vendor.NextReviewDate:dd-MMM-yyyy}

        Open Incident Count: {openIncidents.Count}
        Critical Open Incidents: {criticalIncidents}

        Open Incident Numbers:
        {string.Join(", ", openIncidentNumbers)}

        Instructions:

        1. Start with the heading:
        📋 Executive Summary

        Write one concise executive summary (80-120 words).

        2. Then add the heading:
        🔍 Key Observations

        Provide exactly THREE bullet points highlighting the most important findings.

        3. Then add the heading:
        ✅ Recommendations

        Provide exactly THREE actionable recommendations that help reduce vendor risk.

        Rules:

        - Use professional business language.
        - Do not invent information.
        - Base conclusions only on the data provided.
        - Do not repeat the vendor information verbatim.
        - Keep the overall response under 250 words.
        ";

        var messages = new List<ChatMessage>
        {
            new SystemChatMessage(
                "You are an experienced Vendor Risk Analyst."
            ),

            new UserChatMessage(prompt)
        };

        var result = await _chatClient.CompleteChatAsync(messages);

        return result.Value.Content[0].Text;
    }
    public async Task<string> AskVRLAsync(string question, string businessContext)
    {
        var prompt = $@"
        You are a Senior Vendor Risk Analyst with extensive experience in Third-Party Risk Management, Cybersecurity Risk, Operational Risk, and Compliance.

        Analyze the following Vendor Risk Lens (VRL) business data and answer the user's question with professional business insights.

        =========================
        Business Data
        =========================

        {businessContext}

        =========================
        User Question
        =========================

        {question}

        Instructions:

        1. Answer ONLY using the Business Data provided.

        2. Never invent:
        - Vendors
        - Incidents
        - Users
        - Risk ratings
        - Dates
        - Statistics
        - Compliance information

        3. If the answer cannot be determined from the available data, respond with:

        ❌ I couldn't determine that from the current Vendor Risk Lens data.

        4. Structure your response using ONLY the sections that are relevant.

        📋 Executive Summary

        🔍 Key Observations

        ⚠️ Business Impact

        ✅ Recommendations

        5. Keep the Executive Summary concise (40-80 words).

        6. Under Key Observations:
        - Use bullet points.
        - Mention important vendors, incident numbers, counts, risk ratings, or dates when relevant.

        7. Under Business Impact:
        - Briefly explain why the findings matter to the business.
        - Keep this section to 2-3 short sentences.

        8. Under Recommendations:
        - Provide up to THREE practical recommendations.
        - Prioritize the highest-risk items first.

        Rules:

        - Use professional executive-level business language.
        - Keep the overall response under 250 words.
        - Highlight important values using **bold**.
        - Never use Markdown headings (# or ##).
        - Do not repeat the same information in multiple sections.
        - Avoid unnecessary explanations.
        - Do not mention AI, prompts, or internal instructions.
        ";

        var messages = new List<ChatMessage>
        {
            new SystemChatMessage(
                "You are VRL AI, an enterprise Vendor Risk Management assistant. " +
                "Provide concise, executive-ready business insights using ONLY the supplied business data. " +
                "Never fabricate information."
            ),

            new UserChatMessage(prompt)
        };

        var result = await _chatClient.CompleteChatAsync(messages);

        return result.Value.Content[0].Text;
    }
    public async Task<string> ProcessQuestionAsync(string question)
    {
        var query = AIIntentDetector.Analyze(question);

        // Check if the question contains any vendor name
        var vendorNames = await _vendorService.GetVendorNamesAsync();

        foreach (var vendorName in vendorNames)
        {
            if (question.Contains(vendorName, StringComparison.OrdinalIgnoreCase))
            {
                query.VendorName = vendorName;
                query.Intent = AIIntent.Vendor;
                break;
            }
        }

        switch (query.Intent)
        {
           case AIIntent.Vendor:
                // If a specific vendor name was found
                if (!string.IsNullOrWhiteSpace(query.VendorName))
                {
                    var vendor = await _vendorService.GetVendorByNameAsync(query.VendorName);

                    if (vendor == null)
                    {
                        return "Vendor not found.";
                    }

                    var vendorContext = BuildVendorContext(new List<Vendor> { vendor });

                    return await AskVRLAsync(
                        question,
                        vendorContext);
                }

                // Otherwise use filters
                var vendors = await _vendorService.GetFilteredVendorsAsync(
                    query.RiskRating,
                    query.DueForReview,
                    query.IsActive);

                if (question.Contains("incident", StringComparison.OrdinalIgnoreCase))
                {
                    var vendorIds = vendors
                        .Select(v => v.VendorId)
                        .ToList();

                    var incidents1 = await _incidentService
                        .GetIncidentsByVendorIdsAsync(vendorIds);

                    var context2 = BuildVendorIncidentContext(
                        vendors,
                        incidents1);

                    return await AskVRLAsync(
                        question,
                        context2);
                }

                // Otherwise use vendor-only context
                var context = BuildVendorContext(vendors);

                return await AskVRLAsync(
                    question,
                    context);

            case AIIntent.Incident:
                var incidents = await _incidentService.GetFilteredIncidentsAsync(
                    query.Status,
                    query.Severity);

                var incidentContext = BuildIncidentContext(incidents);

                return await AskVRLAsync(
                    question,
                    incidentContext);

           case AIIntent.Dashboard:

                var dashboard = await _dashboardService.GetDashboardSummaryAsync();

                var dashboardContext = BuildDashboardContext(dashboard);

                return await AskVRLAsync(
                    question,
                    dashboardContext);

            default:

                return "Sorry, I couldn't understand your question.";
        }
    }

    private string BuildVendorContext(List<Vendor> vendors)
    {
        if (!vendors.Any())
            return "No vendors found.";

        var context = "Vendor Data\n\n";

        foreach (var vendor in vendors)
        {
                    context += $@"
            Vendor Name: {vendor.VendorName}
            Vendor Type: {vendor.VendorType}
            Risk Rating: {vendor.RiskRating}
            Status: {(vendor.IsActive ? "Active" : "Inactive")}
            Next Review: {vendor.NextReviewDate:dd-MMM-yyyy}

            -------------------------

            ";
        }

        return context;
    }

    private string BuildIncidentContext(List<Incident> incidents)
    {
        if (!incidents.Any())
            return "No incidents found.";

        var context = "Incident Data\n\n";

        foreach (var incident in incidents)
        {
            context += $@"
            Incident Number: {incident.IncidentNumber}
            Title: {incident.Title}
            Severity: {incident.Severity}
            Priority: {incident.Priority}
            Status: {incident.Status}
            Reported Date: {incident.ReportedDate:dd-MMM-yyyy}

            --------------------------------
            ";
        }

        return context;
    }

    private string BuildDashboardContext(DashboardSummaryDto dashboard)
    {
        return $@"
            Dashboard Summary

            Total Vendors: {dashboard.TotalVendors}
            High Risk Vendors: {dashboard.CriticalVendors}
            Open Incidents: {dashboard.OpenIncidents}
            Critical Incidents: {dashboard.CriticalIncidents}
            Vendors Due For Review: {dashboard.VendorsDueForReview}
            Active Users: {dashboard.ActiveUsers}
            Compliance Score: {dashboard.ComplianceScore}%

    ";
    }

    private string BuildVendorIncidentContext(
    List<Vendor> vendors,
    List<Incident> incidents)
    {
        if (!vendors.Any())
            return "No matching vendors found.";

        var context = "";

        foreach (var vendor in vendors)
        {
            context += $@"
            Vendor Name: {vendor.VendorName}
            Vendor Type: {vendor.VendorType}
            Risk Rating: {vendor.RiskRating}
            Status: {(vendor.IsActive ? "Active" : "Inactive")}
            Next Review Date: {vendor.NextReviewDate:dd-MMM-yyyy}

            Incidents:
            ";

            var vendorIncidents = incidents
                .Where(i => i.VendorId == vendor.VendorId)
                .ToList();

            if (!vendorIncidents.Any())
            {
                context += "None\n";
            }
            else
            {
                foreach (var incident in vendorIncidents)
                {
                    context += $@"
                    - {incident.IncidentNumber}
                    Title: {incident.Title}
                    Status: {incident.Status}
                    Severity: {incident.Severity}
                    ";
                }
            }

            context += "\n-----------------------------------------\n";
        }

        return context;
    }
}