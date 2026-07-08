using System.Reflection;
using VRL.API.Data;
using VRL.API.Models;
using Microsoft.EntityFrameworkCore;
namespace VRL.API.Services;

public class AuditLogService
{
    private readonly VrlDbContext _context;

    public AuditLogService(VrlDbContext context)
    {
        _context = context;
    }

    public void LogFieldChange(
        string entityType,
        int entityId,
        string fieldName,
        string? oldValue,
        string? newValue,
        string actionType,
        string performedBy)
    {
        var auditLog = new AuditLog
        {
            EntityType = entityType,
            EntityId = entityId,
            FieldName = fieldName,
            OldValue = oldValue,
            NewValue = newValue,
            ActionType = actionType,
            PerformedBy = performedBy,
            CreatedDate = DateTime.Now
        };

        _context.AuditLogs.Add(auditLog);
    }

    public void LogCreate(
        string entityType,
        int entityId,
        object entity,
        string performedBy)
    {
        var properties = entity.GetType().GetProperties();

        foreach (PropertyInfo property in properties)
        {
            // Skip the primary key of the entity
            if (property.Name.Equals($"{entityType}Id", StringComparison.OrdinalIgnoreCase))
                continue;

            // Skip system fields
            if (property.Name == "CreatedDate" ||
                property.Name == "UpdatedDate")
                continue;

            var value = property.GetValue(entity);

            LogFieldChange(
                entityType,
                entityId,
                property.Name,
                null,
                value?.ToString(),
                "Created",
                performedBy);
        }
    }

    public void LogUpdate(string entityType, int entityId, object oldEntity, object newEntity, string performedBy)
    {
        var properties = oldEntity.GetType().GetProperties();

        foreach (PropertyInfo property in properties)
        {
            // Skip primary key
            if (property.Name.Equals($"{entityType}Id", StringComparison.OrdinalIgnoreCase))
                continue;

            // Skip system fields
            if (property.Name == "CreatedDate" ||
                property.Name == "UpdatedDate")
                continue;

            var oldValue = property.GetValue(oldEntity)?.ToString();
            var newValue = property.GetValue(newEntity)?.ToString();

            if (oldValue != newValue)
            {
                LogFieldChange(
                    entityType,
                    entityId,
                    property.Name,
                    oldValue,
                    newValue,
                    "Updated",
                    performedBy);
            }
        }
    }

    public void LogDelete(string entityType,
    int entityId,
    object entity,
    string performedBy)
    {
        var properties = entity.GetType().GetProperties();

        foreach (PropertyInfo property in properties)
        {
            if (property.Name.Equals($"{entityType}Id", StringComparison.OrdinalIgnoreCase))
                continue;

            if (property.Name == "CreatedDate" ||
                property.Name == "UpdatedDate")
                continue;

            var value = property.GetValue(entity);

            LogFieldChange(
                entityType,
                entityId,
                property.Name,
                value?.ToString(),
                null,
                "Deleted",
                performedBy);
        }
    }

    public async Task<List<AuditLog>> GetHistoryAsync(string entityType, int entityId)
    {
        return await _context.AuditLogs
            .Where(a =>
                a.EntityType == entityType &&
                a.EntityId == entityId)
            .OrderByDescending(a => a.CreatedDate)
            .ThenBy(a => a.AuditLogId)
            .ToListAsync();
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}