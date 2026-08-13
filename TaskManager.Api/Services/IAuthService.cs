using TaskManager.Api.DTOs;

namespace TaskManager.Api.Services;

public interface IAuthService
{
    Task<(string? Token, object? User)> Login(LoginDto dto);
    Task<bool> Register(RegisterDto dto);
    Task<object?> GetCurrentUser(int userId);
}