using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class AuditLog
{
    [Key]
    public int AuditLogId { get; set; }

    [Required]
    [MaxLength(30)]
    public string EntityType { get; set; } = string.Empty;

    [Required]
    public int EntityId { get; set; }

    [MaxLength(50)]
    public string? FieldName { get; set; }

    public string? OldValue { get; set; }

    public string? NewValue { get; set; }

    [Required]
    [MaxLength(20)]
    public string ActionType { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string PerformedBy { get; set; } = string.Empty;

    public DateTime CreatedDate { get; set; }
}