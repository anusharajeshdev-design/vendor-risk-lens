using VRL.API.Data;
using VRL.API.Models;

namespace VRL.API.Services;

public class AuditLogService
{
    private readonly VrlDbContext _context;

    public AuditLogService(
        VrlDbContext context)
    {
        _context = context;
    }

    public async Task<AuditLog> CreateAuditLogAsync(
        AuditLog auditLog)
    {
        auditLog.CreatedDate = DateTime.UtcNow;

        _context.AuditLogs.Add(auditLog);

        await _context.SaveChangesAsync();

        return auditLog;
    }

    public async Task LogAsync(
        string entityType,
        int entityId,
        string actionType,
        string performedBy,
        string description)
    {
        var auditLog = new AuditLog
        {
            EntityType = entityType,
            EntityId = entityId,
            ActionType = actionType,
            PerformedBy = performedBy,
            Description = description,
            CreatedDate = DateTime.UtcNow
        };

        _context.AuditLogs.Add(auditLog);

        await _context.SaveChangesAsync();
    }
}