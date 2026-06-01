namespace VRL.API.Models;

public class Vendor
{
    public int VendorId { get; set; }

    public string VendorName { get; set; } = string.Empty;

    public string VendorType { get; set; } = string.Empty;

    public string? ContactEmail { get; set; }

    public string? Website { get; set; }

    public string RiskRating { get; set; } = string.Empty;

    public int? OwnerUserId { get; set; }

    public DateTime? LastReviewDate { get; set; }

    public DateTime? NextReviewDate { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
}