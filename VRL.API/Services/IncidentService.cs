using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;

namespace VRL.API.Services;

public class IncidentsService
{
    private readonly VrlDbContext _context;


    public IncidentsService(VrlDbContext context)
    {
        _context = context;
    }

    public async Task<List<Incident>> GetIncidentsAsync()
    {
        return await _context.Incidents.ToListAsync();
    }

    public async Task<Incident> CreateIncidentAsync(Incident incident)
    {
        incident.CreatedDate = DateTime.UtcNow;

        _context.Incidents.Add(incident);

        await _context.SaveChangesAsync();

        return incident;
    }

    public async Task<bool> UpdateIncidentAsync(
    int id,
    Incident updatedIncident)
    {
        var incident = await _context.Incidents
            .FirstOrDefaultAsync(i =>
                i.IncidentId == id);

        if (incident == null)
        {
            return false;
        }

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

        await _context.SaveChangesAsync();

        return true;
    }

     public async Task<Incident?> GetIncidentByIdAsync(int id)
    {
        return await _context.Incidents
            .FirstOrDefaultAsync(i => i.IncidentId == id);
    }
}