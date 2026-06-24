using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class AuditLog
{
    [Key]
    public int AuditLogId { get; set; }

    public string EntityType { get; set; } = string.Empty;

    public int EntityId { get; set; }

    public string ActionType { get; set; } = string.Empty;

    public string PerformedBy { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime CreatedDate { get; set; }
}