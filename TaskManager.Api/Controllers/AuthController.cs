using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.DTOs;
using TaskManager.Api.Services;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await _authService.Register(dto);

        if (!result)
            return BadRequest(new { message = "Email already exists" });

        var (token, user) = await _authService.Login(new LoginDto
        {
            Email = dto.Email,
            Password = dto.Password
        });

        return Ok(new { token, user });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var (token, user) = await _authService.Login(dto);

        if (token == null)
            return Unauthorized(new { message = "Invalid credentials" });

        return Ok(new { token, user });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var user = await _authService.GetCurrentUser(userId);
        if (user == null) return NotFound();
        return Ok(user);
    }
}