using Microsoft.AspNetCore.Mvc;
using VRL.API.DTOs;
using VRL.API.Services;

namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(
        AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var loginResponse =  await _authService.LoginAsync(request);


        if (loginResponse == null)
        {
            return Unauthorized(
                new
                {
                    message =
                        "Invalid username or password"
                });
        }

        return Ok(loginResponse);
    }
}