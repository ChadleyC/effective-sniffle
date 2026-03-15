namespace TaskManagementAPI.Services;

public interface ITokenService
{
    string CreateToken(User user);
}