using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VRL.API.Data;
using VRL.API.DTOs;

namespace VRL.API.Services;

public class AuthService
{
    private readonly VrlDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly AuditLogService _auditLogService;

    public AuthService(
        VrlDbContext context,
        IConfiguration configuration,
        AuditLogService auditLogService)
    {
        _context = context;
        _configuration = configuration;
        _auditLogService = auditLogService;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users
        .Join(
        _context.Roles,
        u => u.RoleId,
        r => r.RoleId,
        (u, r) => new
        {
        User = u,
        RoleName = r.RoleName
        })
        .FirstOrDefaultAsync(x =>
        x.User.Username == request.Username &&
        x.User.IsActive);


        if (user == null)
        {
            return null;
        }
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.User.Password))
        {
            return null;
        }
        _auditLogService.LogFieldChange(
            "Login",
            user.User.UserId,
            "LoginStatus",
            null,
            "Success",
            "Login",
            user.User.Username);

        await _auditLogService.SaveAsync();
        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                user.User.UserId.ToString()),

            new Claim(
                ClaimTypes.Name,
                user.User.Username),

            new Claim(
                ClaimTypes.Role,
                user.RoleName)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!));

        var credentials =
            new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer:
                _configuration["Jwt:Issuer"],

            audience:
                _configuration["Jwt:Audience"],

            claims: claims,

            expires:
                DateTime.Now.AddHours(8),

            signingCredentials:
                credentials);

        var tokenString =
            new JwtSecurityTokenHandler()
                .WriteToken(token);

        return new LoginResponseDto
        {
            Token = tokenString,

            UserId = user.User.UserId,

            Username = user.User.Username,

            RoleName = user.RoleName,

            FullName =
                $"{user.User.FirstName} {user.User.LastName}"
        };


    }


}