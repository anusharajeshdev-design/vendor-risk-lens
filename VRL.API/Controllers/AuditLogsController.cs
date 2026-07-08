using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using VRL.API.Services;
namespace VRL.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuditLogsController : ControllerBase
{
    private readonly VrlDbContext _context;
    private readonly AuditLogService _auditLogService;

    public AuditLogsController(
        VrlDbContext context, AuditLogService auditLogService)
    {
        _context = context;
        _auditLogService = auditLogService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAuditLogs()
    {
        var logs = await _context.AuditLogs
            .OrderByDescending(x => x.CreatedDate)
            .ToListAsync();

        return Ok(logs);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAuditLog(
        AuditLog auditLog)
    {
        auditLog.CreatedDate = DateTime.Now;

        _context.AuditLogs.Add(auditLog);

        await _context.SaveChangesAsync();

        return Ok(auditLog);
    }

    [HttpGet("{entityType}/{entityId}")]
    public async Task<IActionResult> GetHistory(
        string entityType,
        int entityId)
    {
        var history = await _auditLogService
            .GetHistoryAsync(entityType, entityId);

        return Ok(history);
    }
}