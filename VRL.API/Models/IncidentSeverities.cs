using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class IncidentSeverities
{
    [Key]
    public int IncidentSeverityId	{get; set;}
    public string SeverityName	{get; set;} = string.Empty;
}