using TaskManagementAPI.DTOs;

namespace TaskManagementAPI.Services;

public interface IAuthService
{
    Task<string?> Login(LoginDto dto);
    Task<bool> Register(RegisterDto dto);
}