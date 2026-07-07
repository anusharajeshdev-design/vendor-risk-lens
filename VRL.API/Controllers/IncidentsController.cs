using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using VRL.API.Services;
using Microsoft.AspNetCore.Authorization;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

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

        return Ok(incidents);
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

    [HttpGet("types")]
    public async Task<IActionResult> GetIncidentType()
    {
        var incidentType = await _incidentService.GetIncidentTypeAsync();

        if(incidentType == null)
        {
            return NotFound(new ApiResponse<object>
            {
               Success = false,
               Message = "Incident Type not found" 
            });
        }

        return Ok(new ApiResponse<List<IncidentType>>
        {
            Success = true,
            Message = "Incident types retrieved successfully",
            Data = incidentType
        });
    }

    [HttpGet("priorities")]
    public async Task<IActionResult> GetIncidentPriorities()
    {
        var incidentpriorities = await _incidentService.GetIncidentPrioritiesAsync();

        if(incidentpriorities == null)
        {
            return NotFound(new ApiResponse<object>
            {
               Success = false,
               Message = "Incident priorities not found" 
            });
        }

        return Ok(new ApiResponse<List<IncidentPriorities>>
        {
            Success = true,
            Message = "Incident priorities retrieved successfully",
            Data = incidentpriorities
        });
    }

    [HttpGet("severities")]
    public async Task<IActionResult> GetIncidentSeverities()
    {
        var incidentseverities = await _incidentService.GetIncidentSeveritiesAsync();

        if(incidentseverities == null)
        {
            return NotFound(new ApiResponse<object>
            {
               Success = false,
               Message = "Incident severities not found" 
            });
        }

        return Ok(new ApiResponse<List<IncidentSeverities>>
        {
            Success = true,
            Message = "Incident severities retrieved successfully",
            Data = incidentseverities
        });
    }

    [HttpGet("statuses")]
    public async Task<IActionResult> GetIncidentStatuses()
    {
        var incidentstatuses = await _incidentService.GetIncidentStatusesAsync();

        if(incidentstatuses == null)
        {
            return NotFound(new ApiResponse<object>
            {
               Success = false,
               Message = "Incident statuses not found" 
            });
        }

        return Ok(new ApiResponse<List<IncidentStatuses>>
        {
            Success = true,
            Message = "Incident statuses retrieved successfully",
            Data = incidentstatuses
        });
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveVendors()
    {
        var vendors = await _incidentService.GetActiveVendorsAsync();

        return Ok(new ApiResponse<List<Vendor>>
        {
            Success = true,
            Message = "Active vendors retrieved successfully",
            Data = vendors
        });
    }
}