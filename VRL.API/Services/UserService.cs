using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using VRL.API.DTOs;

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

    public async Task<List<UserDto>> GetUsers()
    {
        return await
        (
            from u in _context.Users

            join r in _context.Roles
                on u.RoleId equals r.RoleId

            select new UserDto
            {
                UserId = u.UserId,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Username = u.Username,
                RoleName = r.RoleName,
                IsActive = u.IsActive
            }

        ).ToListAsync();
    }

    public async Task<Users> CreateUserAsync(Users user)
    {
        user.CreatedDate = DateTime.Now;
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _context.Users.Add(user);

        await _context.SaveChangesAsync();
       _auditLogService.LogCreate(
            "User",
            user.UserId,
            user,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();
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

        var oldUser = new Users
        {
            UserId = user.UserId,
            RoleId = user.RoleId,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Username = user.Username,
            Password = user.Password,
            IsActive = user.IsActive,
            CreatedDate = user.CreatedDate
        };

        user.RoleId = updatedUser.RoleId;
        user.FirstName = updatedUser.FirstName;
        user.LastName = updatedUser.LastName;
        user.Email = updatedUser.Email;
        user.Username = updatedUser.Username;
        if (!string.IsNullOrWhiteSpace(updatedUser.Password))
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
        }
        user.IsActive = updatedUser.IsActive;

        await _context.SaveChangesAsync();
        _auditLogService.LogUpdate(
            "User",
            user.UserId,
            oldUser,
            user,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();
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
        _auditLogService.LogDelete(
            "User",
            user.UserId,
            user,
            _currentUserService.Username);

        await _auditLogService.SaveAsync();
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

    public async Task<List<UserDto>> SearchUsersAsync(string keyword)
    {
        keyword = keyword?.Trim() ?? string.Empty;

        return await
        (
            from u in _context.Users

            join r in _context.Roles
                on u.RoleId equals r.RoleId

            where string.IsNullOrEmpty(keyword)
                || u.FirstName.Contains(keyword)
                || u.LastName.Contains(keyword)
                || u.Email.Contains(keyword)
                || u.Username.Contains(keyword)
                || r.RoleName.Contains(keyword)

            select new UserDto
            {
                UserId = u.UserId,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Username = u.Username,
                RoleName = r.RoleName,
                IsActive = u.IsActive
            }

        ).ToListAsync();
    }
}