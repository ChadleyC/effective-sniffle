using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;

namespace TaskManager.Api.Services;
public class AuthService(
    ApplicationDbContext context,
    ITokenService tokenService)
    : IAuthService
{
    public async Task<bool> Register(RegisterDto dto)
    {
        if (await context.Users.AnyAsync(x => x.Email == dto.Email))
            return false;

        var user = new User
        {
            Email = dto.Email,
            Username = dto.Username,
            PasswordHash = Hash(dto.Password),
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<(string? Token, object? User)> Login(LoginDto dto)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null)
            return (null, null);

        if (user.PasswordHash != Hash(dto.Password))
            return (null, null);

        var token = tokenService.CreateToken(user);
        var userData = new { user.Id, user.Username, user.Email, user.CreatedAt };
        return (token, userData);
    }

    public async Task<object?> GetCurrentUser(int userId)
    {
        var user = await context.Users.FindAsync(userId);
        if (user == null) return null;
        return new { user.Id, user.Username, user.Email, user.CreatedAt };
    }

    private static string Hash(string password)
    {
        using var sha = SHA256.Create();
        return Convert.ToBase64String(
            sha.ComputeHash(Encoding.UTF8.GetBytes(password))
        );
    }
}