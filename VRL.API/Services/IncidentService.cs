using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using System.Text.Json;

namespace VRL.API.Services;

public class IncidentsService
{
    private readonly VrlDbContext _context;
    private readonly AuditLogService _auditLogService;
    private readonly CurrentUserService _currentUserService;
    public IncidentsService(VrlDbContext context, AuditLogService auditLogService, CurrentUserService currentUserService)
    {
        _context = context;
        _auditLogService = auditLogService;
        _currentUserService = currentUserService;
    }

    public async Task<List<Incident>> GetIncidentsAsync()
    {
        return await _context.Incidents.ToListAsync();
    }

   public async Task<Incident> CreateIncidentAsync(Incident incident)
    {
        incident.IncidentNumber = await GenerateIncidentNumberAsync();

        incident.CreatedDate = DateTime.UtcNow;

        _context.Incidents.Add(incident);

        await _context.SaveChangesAsync();
        _auditLogService.LogCreate(
            "Incident",
            incident.IncidentId,
            incident,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();
        return incident;
    }

    public async Task<bool> UpdateIncidentAsync(int id, Incident updatedIncident)
    {
        var incident = await _context.Incidents
            .FirstOrDefaultAsync(i =>
                i.IncidentId == id);

        if (incident == null)
        {
            return false;
        }

        var oldIncident = new Incident
        {
            IncidentId = incident.IncidentId,
            IncidentNumber = incident.IncidentNumber,
            VendorId = incident.VendorId,
            Title = incident.Title,
            Description = incident.Description,
            IncidentType = incident.IncidentType,
            Severity = incident.Severity,
            Priority = incident.Priority,
            Status = incident.Status,
            AssignedUserId = incident.AssignedUserId,
            CreatedByUserId = incident.CreatedByUserId,
            ReportedDate = incident.ReportedDate,
            DueDate = incident.DueDate,
            ExpectedCloseDate = incident.ExpectedCloseDate,
            ActualCloseDate = incident.ActualCloseDate,
            ResolutionSummary = incident.ResolutionSummary,
            CreatedDate = incident.CreatedDate,
            UpdatedDate = incident.UpdatedDate
        };

        incident.Title = updatedIncident.Title;
        incident.Description = updatedIncident.Description;
        incident.IncidentType = updatedIncident.IncidentType;
        incident.Severity = updatedIncident.Severity;
        incident.Priority = updatedIncident.Priority;
        incident.Status = updatedIncident.Status;

        incident.AssignedUserId =
            updatedIncident.AssignedUserId;

        incident.ReportedDate =
            updatedIncident.ReportedDate;

        incident.DueDate =
            updatedIncident.DueDate;

        incident.ExpectedCloseDate =
            updatedIncident.ExpectedCloseDate;

        incident.ActualCloseDate =
            updatedIncident.ActualCloseDate;

        incident.ResolutionSummary =
            updatedIncident.ResolutionSummary;

        incident.UpdatedDate = DateTime.UtcNow;

        _auditLogService.LogUpdate(
            "Incident",
            incident.IncidentId,
            oldIncident,
            incident,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();
        return true;
    }

     public async Task<Incident?> GetIncidentByIdAsync(int id)
    {
        return await _context.Incidents
            .FirstOrDefaultAsync(i => i.IncidentId == id);
    }

    public async Task<List<IncidentType>> GetIncidentTypeAsync()
    {
        return await _context.IncidentTypes.ToListAsync();
    }

     public async Task<List<IncidentPriorities>> GetIncidentPrioritiesAsync()
    {
        return await _context.IncidentPriorities.ToListAsync();
    }
    public async Task<List<IncidentSeverities>> GetIncidentSeveritiesAsync()
    {
        return await _context.IncidentSeverities.ToListAsync();
    }

     public async Task<List<IncidentStatuses>> GetIncidentStatusesAsync()
    {
        return await _context.IncidentStatuses.ToListAsync();
    }

    public async Task<List<Vendor>> GetActiveVendorsAsync()
    {
        return await _context.Vendors.Where(v => v.IsActive).OrderBy(v => v.VendorName).ToListAsync();
    }

    private async Task<string> GenerateIncidentNumberAsync()
    {
        string today = DateTime.UtcNow.ToString("yyyyMMdd");

        string prefix = $"INC{today}";

        var lastIncident = await _context.Incidents
            .Where(i => i.IncidentNumber.StartsWith(prefix))
            .OrderByDescending(i => i.IncidentNumber)
            .FirstOrDefaultAsync();

        int nextSequence = 1;

        if (lastIncident != null)
        {
            string lastSequence =
                lastIncident.IncidentNumber.Substring(prefix.Length);

            nextSequence = int.Parse(lastSequence) + 1;
        }

        return $"{prefix}{nextSequence:D3}";
    }
}