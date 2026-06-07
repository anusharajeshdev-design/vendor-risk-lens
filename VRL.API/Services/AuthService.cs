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

    public AuthService(
        VrlDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<string?> LoginAsync(
        LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u =>
                u.Username == request.Username &&
                u.Password == request.Password &&
                u.IsActive);

        if (user == null)
        {
            return null;
        }

        var claims = new[]
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                user.UserId.ToString()),

            new Claim(
                ClaimTypes.Name,
                user.Username),

            new Claim(
                "RoleId",
                user.RoleId.ToString())
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

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}