using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class VendorTypes
{
    [Key]
    public int VendorTypeId { get; set; }

    public string VendorTypeName { get; set; } = string.Empty;

    public string? Description { get; set; }

    public bool IsActive { get; set; }
}