using Microsoft.AspNetCore.Mvc;
using VRL.API.DTOs;
using VRL.API.Services;
using VRL.API.Models;
namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly AIService _aiService;
    private readonly VendorService _vendorService;

    public AIController(
        AIService aiService,
        VendorService vendorService)
    {
        _aiService = aiService;
        _vendorService = vendorService;
    }

    [HttpPost("ask")]
    public async Task<IActionResult> AskAI(AskAIRequest request)
    {
        var response = await _aiService.AskAIAsync(request.Prompt);

        return Ok(new
        {
            Success = true,
            Message = "AI response generated successfully.",
            Data = response
        });
    }

    [HttpPost("vendor-summary")]
    public async Task<IActionResult> VendorSummary(
        VendorSummaryRequest request)
    {
        var vendor =
            await _vendorService.GetVendorByIdAsync(request.VendorId);

        if (vendor == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Vendor not found."
            });
        }

        var summary =
            await _aiService.GenerateVendorSummaryAsync(vendor);

        return Ok(new
        {
            Success = true,
            Message = "Vendor summary generated successfully.",
            Data = summary
        });
    }
}