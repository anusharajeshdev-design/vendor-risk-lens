namespace VRL.API.DTOs;

public class DashboardSummaryDto
{
    public int TotalVendors { get; set; }
    public int CriticalVendors { get; set; }
    public int OpenIncidents { get; set; }
    public int ActiveUsers { get; set; }
    public int VendorsDueForReview { get; set; }
    public int CriticalIncidents { get; set; }
    public int VendorsAddedThisMonth { get; set; }
    public int IncidentsOpenedThisMonth { get; set; }
    public decimal ComplianceScore { get; set; }
}

public class RiskDistributionDto
{
    public int LowRisk { get; set; }
    public int MediumRisk { get; set; }
    public int HighRisk { get; set; }
}

public class IncidentStatusDto
{
    public int Open { get; set; }
    public int InProgress { get; set; }
    public int Closed { get; set; }
}

public class RecentVendorDto
{
    public int VendorId { get; set; }
    public string VendorName { get; set; } = string.Empty;
    public string RiskRating { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
}