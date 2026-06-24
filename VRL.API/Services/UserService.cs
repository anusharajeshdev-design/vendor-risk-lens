using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;

namespace VRL.API.Services;

public class UserService
{
    private readonly VrlDbContext _context;
    private readonly AuditLogService _auditLogService;
    private readonly CurrentUserService _currentUserService;



    public UserService(VrlDbContext context, AuditLogService auditLogService, CurrentUserService currentUserService)
    {
        _context = context;
        _auditLogService = auditLogService;
        _currentUserService = currentUserService;
    }

    public async Task<List<Users>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<Users> CreateUserAsync(Users user)
    {
        user.CreatedDate = DateTime.UtcNow;

        _context.Users.Add(user);

        await _context.SaveChangesAsync();
        await _auditLogService.LogAsync(
            "User",
            user.UserId,
            "Created",
            _currentUserService.Username,
            $"User {user.Username} created");
        return user;
    }

    public async Task<bool> UpdateUserAsync(
        int id,
        Users updatedUser)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u =>
                u.UserId == id);

        if (user == null)
        {
            return false;
        }

        user.RoleId = updatedUser.RoleId;
        user.FirstName = updatedUser.FirstName;
        user.LastName = updatedUser.LastName;
        user.Email = updatedUser.Email;
        user.Username = updatedUser.Username;
        user.Password = updatedUser.Password;
        user.IsActive = updatedUser.IsActive;

        await _context.SaveChangesAsync();
        await _auditLogService.LogAsync(
            "User",
            updatedUser.UserId,
            "Updated",
            _currentUserService.Username,
            $"User {updatedUser.Username} updated");
        return true;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);

        if (user == null)
        {
            return false;
        }

        _context.Users.Remove(user);

        await _context.SaveChangesAsync();
        await _auditLogService.LogAsync(
            "User",
            user.UserId,
            "Deleted",
            _currentUserService.Username,
            $"User {user.Username} deleted");
        return true;
    }

    public async Task<Users?> GetUserByIdAsync(int id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u =>
                u.UserId == id);
    }

     public async Task<List<Roles>> GetRoles()
    {
        return await _context.Roles.ToListAsync();
    }
}