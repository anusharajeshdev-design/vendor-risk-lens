using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VRL.API.Data;
using VRL.API.DTOs;

namespace VRL.API.Services;

public class DashboardService
{
    private readonly VrlDbContext _context;
    private readonly IConfiguration _configuration;

    public DashboardService(VrlDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<DashboardSummaryDto> GetDashboardSummaryAsync()
    {
        var summary = new DashboardSummaryDto
        {
            TotalVendors = await _context.Vendors.CountAsync(),
            CriticalVendors = await _context.Vendors.CountAsync(v => v.RiskRating == "High"),
            OpenIncidents = await _context.Incidents.CountAsync(i => i.Status == "Open"),
            ActiveUsers = await _context.Users.CountAsync()
        };

        return summary;
    }
}