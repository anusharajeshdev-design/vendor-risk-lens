using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.DTOs;

namespace VRL.API.Services;

public class DashboardService
{
    private readonly VrlDbContext _context;

    public DashboardService(VrlDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryDto> GetDashboardSummaryAsync()
    {
        DateTime today = DateTime.UtcNow.Date;

        DateTime firstDayOfMonth =
            new DateTime(today.Year, today.Month, 1);

        return new DashboardSummaryDto
        {
            TotalVendors =
                await _context.Vendors.CountAsync(),

            CriticalVendors =
                await _context.Vendors.CountAsync(v =>
                    v.RiskRating == "High"),

            OpenIncidents =
                await _context.Incidents.CountAsync(i =>
                    i.Status == "Open"),

            ActiveUsers =
                await _context.Users.CountAsync(),

            VendorsDueForReview =
                await _context.Vendors.CountAsync(v =>
                    v.NextReviewDate <= today),

            CriticalIncidents =
                await _context.Incidents.CountAsync(i =>
                    i.Severity == "Critical"),

            VendorsAddedThisMonth =
                await _context.Vendors.CountAsync(v =>
                    v.CreatedDate >= firstDayOfMonth),

            IncidentsOpenedThisMonth =
                await _context.Incidents.CountAsync(i =>
                    i.CreatedDate >= firstDayOfMonth),

            ComplianceScore =
                await CalculateComplianceScore()
        };
    }

    private async Task<decimal> CalculateComplianceScore()
    {
        int totalVendors =
            await _context.Vendors.CountAsync();

        if (totalVendors == 0)
            return 100;

        int compliantVendors =
            await _context.Vendors.CountAsync(v =>
                v.NextReviewDate > DateTime.UtcNow);

        return Math.Round(
            ((decimal)compliantVendors / totalVendors) * 100,
            2);
    }

    public async Task<RiskDistributionDto> GetRiskDistributionAsync()
    {
        return new RiskDistributionDto
        {
            LowRisk = await _context.Vendors
                .CountAsync(v => v.RiskRating == "Low"),

            MediumRisk = await _context.Vendors
                .CountAsync(v => v.RiskRating == "Medium"),

            HighRisk = await _context.Vendors
                .CountAsync(v => v.RiskRating == "High")
        };
    }

    public async Task<IncidentStatusDto> GetIncidentStatusAsync()
    {
        return new IncidentStatusDto
        {
            Open =
                await _context.Incidents.CountAsync(i =>
                    i.Status == "Open"),

            InProgress =
                await _context.Incidents.CountAsync(i =>
                    i.Status == "In Progress"),

            Closed =
                await _context.Incidents.CountAsync(i =>
                    i.Status == "Closed")
        };
    }

    public async Task<List<RecentVendorDto>> GetRecentVendorsAsync()
    {
        return await _context.Vendors
            .OrderByDescending(v => v.CreatedDate)
            .Take(5)
            .Select(v => new RecentVendorDto
            {
                VendorId = v.VendorId,
                VendorName = v.VendorName,
                RiskRating = v.RiskRating,
                CreatedDate = v.CreatedDate
            })
            .ToListAsync();
    }

    public async Task<string> BuildBusinessContextAsync()
    {
        var vendors = await _context.Vendors
            .Where(v => !v.IsDeleted)
            .ToListAsync();

        var incidents = await _context.Incidents
            .ToListAsync();

        return $@"
    Total Vendors: {vendors.Count}

    High Risk Vendors:
    {string.Join(", ",
        vendors.Where(v => v.RiskRating == "High")
            .Select(v => v.VendorName))}

    Open Incidents:
    {incidents.Count(i => i.Status == "Open")}

    Critical Incidents:
    {incidents.Count(i => i.Severity == "Critical")}

    Vendors Due For Review:
    {string.Join(", ",
        vendors.Where(v => v.NextReviewDate <= DateTime.UtcNow)
            .Select(v => v.VendorName))}
    ";
    }
}