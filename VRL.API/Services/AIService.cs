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

}