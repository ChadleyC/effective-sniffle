using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models.Enums;

namespace TaskManager.Api.Services;
public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(
        ApplicationDbContext context,
        ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<bool> Register(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(x => x.Email == dto.Email))
            return false;

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = Hash(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<string?> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null)
            return null;

        if (user.PasswordHash != Hash(dto.Password))
            return null;

        return _tokenService.CreateToken(user);
    }

    private static string Hash(string password)
    {
        using var sha = SHA256.Create();
        return Convert.ToBase64String(
            sha.ComputeHash(Encoding.UTF8.GetBytes(password))
        );
    }
}