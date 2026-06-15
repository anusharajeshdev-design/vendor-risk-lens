using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class IncidentPriorities
{
    [Key]
    public int IncidentPriorityId	{get; set;}
    public string PriorityName	{get; set;} = string.Empty;
}