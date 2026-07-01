using OpenAI.Chat;
using VRL.API.Models;

namespace VRL.API.Services;

public class AIService
{
    private readonly IConfiguration _configuration;
    private readonly ChatClient _chatClient;

    private readonly string _apiKey;
    private readonly string _model;

    public AIService(IConfiguration configuration)
    {
        _configuration = configuration;

        _apiKey = _configuration["OpenAI:ApiKey"]!;
        _model = _configuration["OpenAI:Model"]!;

        _chatClient = new ChatClient(
            model: _model,
            apiKey: _apiKey);
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
        You are a Senior Vendor Risk Analyst.

        Analyze the following vendor and generate a professional executive summary.

        Vendor Name: {vendor.VendorName}
        Vendor Type: {vendor.VendorType}
        Risk Rating: {vendor.RiskRating}
        Status: {(vendor.IsActive ? "Active" : "Inactive")}
        Owner User Id: {vendor.OwnerUserId}
        Next Review Date: {vendor.NextReviewDate:dd-MMM-yyyy}

        Open Incident Count: {openIncidents.Count}
        Critical Open Incidents: {criticalIncidents}

        Open Incident Numbers:
        {string.Join(", ", openIncidentNumbers)}

        Generate a professional executive summary in less than 150 words.

        Mention the vendor's current risk posture and the impact of the open incidents.

        Do not use bullet points.

        Use professional language suitable for senior management.
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

}