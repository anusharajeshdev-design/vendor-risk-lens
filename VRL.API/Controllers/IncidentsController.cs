using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using VRL.API.Services;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IncidentController : ControllerBase
{
   private readonly IncidentsService _incidentService;

    public IncidentController(IncidentsService incidentService)
    {
        _incidentService = incidentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetIncidents()
    {
        var incidents = await _incidentService.GetIncidentsAsync();

        return Ok(new ApiResponse<List<Incident>>
        {
            Success = true,
            Message = "Incident retrieved successfully",
            Data = incidents
        });
    }

    [HttpPost]
    public async Task<IActionResult> CreateIncident(Incident incident)
    {
        var createdIncident =
            await _incidentService.CreateIncidentAsync(incident);

        return Ok(new ApiResponse<Incident>
        {
            Success = true,
            Message = "Incident created successfully",
            Data = createdIncident
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateIncident(int id, Incident incident)
    {
        var updated = await _incidentService.UpdateIncidentAsync(id, incident);

        if (!updated)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Incident not found"
            });
        }

        return Ok(new ApiResponse<Incident>
        {
            Success = true,
            Message = "Incident updated successfully",
            Data = incident
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetIncidentByIdAsync(int id)
    {
        var incidents = await _incidentService.GetIncidentByIdAsync(id);

        if (incidents == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Incidents not found"
            });
        }

        return Ok(new ApiResponse<Incident>
        {
            Success = true,
            Message = "Incidents retrieved successfully",
            Data = incidents
        });
    }
}