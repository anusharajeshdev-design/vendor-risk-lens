using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VRL.API.DTOs;
using VRL.API.Models;
using VRL.API.Services;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]

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
}