using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;

namespace VRL.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuditLogsController : ControllerBase
{
    private readonly VrlDbContext _context;

    public AuditLogsController(
        VrlDbContext context)
    {
        _context = context;
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
        auditLog.CreatedDate = DateTime.UtcNow;

        _context.AuditLogs.Add(auditLog);

        await _context.SaveChangesAsync();

        return Ok(auditLog);
    }
}