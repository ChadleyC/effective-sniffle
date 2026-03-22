using TaskManager.Api.DTOs;

namespace TaskManager.Api.Services;

public interface IAuthService
{
    Task<string?> Login(LoginDto dto);
    Task<bool> Register(RegisterDto dto);
}