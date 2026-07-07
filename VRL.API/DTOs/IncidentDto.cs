namespace VRL.API.DTOs;

public class IncidentDto
{
    public int IncidentId { get; set; }

    public string IncidentNumber { get; set; } = string.Empty;

    public string VendorName { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Severity { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime ReportedDate { get; set; }
}