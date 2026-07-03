namespace VRL.API.AI;

public class AIQuery
{
    public AIIntent Intent { get; set; }

    public string? VendorName { get; set; }
    
    public string? Status { get; set; }

    public string? Severity { get; set; }

    public string? RiskRating { get; set; }

    public bool? DueForReview { get; set; }

    public bool? IsActive { get; set; }
}