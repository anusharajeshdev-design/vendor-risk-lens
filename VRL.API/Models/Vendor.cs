namespace VRL.API.Models;

public class Vendor
{
    public int VendorId { get; set; }

    public string VendorName { get; set; } = string.Empty;

    public string VendorType { get; set; } = string.Empty;

    public string? ContactEmail { get; set; }

    public string RiskRating { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }
}