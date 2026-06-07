using System.ComponentModel.DataAnnotations;

namespace VRL.API.Models;

public class Users
{
    [Key]
    public int UserId { get; set; }

    public int RoleId { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public DateTime CreatedDate { get; set; }

    public string Username {get; set;} = string.Empty;

    public string Password {get; set;} = string.Empty;
}