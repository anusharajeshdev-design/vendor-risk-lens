using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Models;
using VRL.API.Services;
using Microsoft.AspNetCore.Authorization;


namespace VRL.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userService.GetUsers();

        return Ok(new ApiResponse<List<Users>>
        {
            Success = true,
            Message = "Users retrieved successfully",
            Data = users
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user =
            await _userService.GetUserByIdAsync(id);

        if (user == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "User not found"
            });
        }

        return Ok(new ApiResponse<Users>
        {
            Success = true,
            Message = "User retrieved successfully",
            Data = user
        });
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(
        Users user)
    {
        var createdUser =
            await _userService.CreateUserAsync(user);

        return Ok(new ApiResponse<Users>
        {
            Success = true,
            Message = "User created successfully",
            Data = createdUser
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(
        int id,
        Users user)
    {
        var updated =
            await _userService.UpdateUserAsync(
                id,
                user);

        if (!updated)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "User not found"
            });
        }

        return Ok(new ApiResponse<Users>
        {
            Success = true,
            Message = "User updated successfully",
            Data = user
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(
        int id)
    {
        var deleted = await _userService.DeleteUserAsync(id);

        if (!deleted)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "User not found"
            });
        }

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "User deleted successfully"
        });
    }

    [HttpGet("roles")]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await _userService.GetRoles();

        return Ok(new ApiResponse<List<Roles>>
        {
            Success = true,
            Message = "Roles retrieved successfully",
            Data = roles
        });
    }
} 