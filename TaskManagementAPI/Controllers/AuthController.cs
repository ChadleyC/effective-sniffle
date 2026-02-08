using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Services;

namespace TaskManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // Inject IAuthService here

        // [HttpPost("register")]
        // public IActionResult Register(RegisterDto dto) { ... }

        // [HttpPost("login")]
        // public IActionResult Login(LoginDto dto) { ... }
    }
}
