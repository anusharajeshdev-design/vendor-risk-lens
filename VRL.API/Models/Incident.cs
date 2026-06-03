namespace VRL.API.Models;

public class Incident
{
    public int IncidentId { get; set; }

    public string IncidentNumber { get; set; } = string.Empty;

    public int VendorId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string IncidentType { get; set; } = string.Empty;

    public string Severity { get; set; } = string.Empty;

    public string Priority { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public int? AssignedUserId { get; set; }

    public int CreatedByUserId { get; set; }

    public DateTime ReportedDate { get; set; }

    public DateTime? DueDate { get; set; }

    public DateTime? ExpectedCloseDate { get; set; }

    public DateTime? ActualCloseDate { get; set; }

    public string? ResolutionSummary { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    //public bool IsDeleted { get; set; }
}