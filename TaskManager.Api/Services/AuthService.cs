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
            PasswordHash = Hash(dto.Password),
            TaskItem = null!
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<string?> Login(LoginDto dto)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null)
            return null;

        if (user.PasswordHash != Hash(dto.Password))
            return null;

        return tokenService.CreateToken(user);
    }

    private static string Hash(string password)
    {
        using var sha = SHA256.Create();
        return Convert.ToBase64String(
            sha.ComputeHash(Encoding.UTF8.GetBytes(password))
        );
    }
}