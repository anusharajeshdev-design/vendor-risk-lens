using Microsoft.AspNetCore.Mvc;
using VRL.API.DTOs;
using VRL.API.Services;
using VRL.API.Models;
namespace VRL.API.Controllers;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
public class AIController : ControllerBase
{
    private readonly AIService _aiService;
    private readonly VendorService _vendorService;
    private readonly IncidentsService _incidentService;
    private readonly DashboardService _dashboardService;
    public AIController(
        AIService aiService,
        VendorService vendorService, IncidentsService incidentService, DashboardService dashboardService)
    {
        _aiService = aiService;
        _vendorService = vendorService;
        _incidentService = incidentService;
        _dashboardService = dashboardService;
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
    public async Task<IActionResult> VendorSummary(VendorSummaryRequest request)
    {
        var vendor = await _vendorService.GetVendorByIdAsync(request.VendorId);
        if (vendor == null)
        {
            return NotFound(new
            {
                Success = false,
                Message = "Vendor not found."
            });
        }

        var incidents = await _incidentService.GetIncidentsByVendorIdAsync(request.VendorId);
        var summary = await _aiService.GenerateVendorSummaryAsync(vendor, incidents);

        return Ok(new
        {
            Success = true,
            Message = "Vendor summary generated successfully.",
            Data = summary
        });
    }

    [HttpPost("ask-vrl")]
    public async Task<IActionResult> AskVRL(AskAIRequest request)
    {
        var response = await _aiService.ProcessQuestionAsync(request.Prompt);

        return Ok(new
        {
            Success = true,
            Data = response
        });
    }
}