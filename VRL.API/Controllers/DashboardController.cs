using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VRL.API.DTOs;
using VRL.API.Models;
using VRL.API.Services;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly DashboardService _dashboardService;

    public DashboardController(DashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetDashboardSummary()
    {
        var summary = await _dashboardService.GetDashboardSummaryAsync();

        return Ok(new ApiResponse<DashboardSummaryDto>
        {
            Success = true,
            Message = "Dashboard summary retrieved successfully",
            Data = summary
        });
    }

    [HttpGet("risk-distribution")]
    public async Task<IActionResult> GetRiskDistribution()
    {
        var data =
            await _dashboardService.GetRiskDistributionAsync();

        return Ok(new ApiResponse<RiskDistributionDto>
        {
            Success = true,
            Message = "Risk distribution retrieved",
            Data = data
        });
    }

    [HttpGet("incident-status")]
    public async Task<IActionResult> GetIncidentStatus()
    {
        var data =
            await _dashboardService.GetIncidentStatusAsync();

        return Ok(new ApiResponse<IncidentStatusDto>
        {
            Success = true,
            Message = "Incident status retrieved",
            Data = data
        });
    }

    [HttpGet("recent-vendors")]
    public async Task<IActionResult> GetRecentVendors()
    {
        var data =
            await _dashboardService.GetRecentVendorsAsync();

        return Ok(new ApiResponse<List<RecentVendorDto>>
        {
            Success = true,
            Message = "Recent vendors retrieved",
            Data = data
        });
    }
}