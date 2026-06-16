using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class Roles
{
    [Key]
    public int RoleId	{get; set;}
    public string RoleName	{get; set;} = string.Empty;
}