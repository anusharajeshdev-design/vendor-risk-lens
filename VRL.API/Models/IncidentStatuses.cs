using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class IncidentStatuses
{
    [Key]
    public int IncidentStatusId	{get; set;}
    public string StatusName	{get; set;} = string.Empty;
}