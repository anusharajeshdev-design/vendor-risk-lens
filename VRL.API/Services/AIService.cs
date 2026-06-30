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

    public async Task<string> GenerateVendorSummaryAsync(Vendor vendor)
    {
        var prompt = $@"
    You are a Senior Vendor Risk Analyst.

    Analyze the following vendor and generate a professional executive summary.

    Vendor Name: {vendor.VendorName}
    Vendor Type: {vendor.VendorType}
    Risk Rating: {vendor.RiskRating}
    Status: {(vendor.IsActive ? "Active" : "Inactive")}
    Owner: {vendor.OwnerUserId}
    Review Date: {vendor.NextReviewDate:dd-MMM-yyyy}

    Generate a professional summary in less than 150 words.
    Do not use bullet points.
    Use business language suitable for senior management.
    ";

        var messages = new List<ChatMessage>
        {
            new UserChatMessage(prompt)
        };

        var result = await _chatClient.CompleteChatAsync(messages);

        return result.Value.Content[0].Text;
    }

}