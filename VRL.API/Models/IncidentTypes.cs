namespace VRL.API.Models;

public class IncidentType
{
    public int IncidentTypeId	{get; set;}
    public string IncidentTypeName	{get; set;} = string.Empty;
    public bool IsActive	{get; set;}
}