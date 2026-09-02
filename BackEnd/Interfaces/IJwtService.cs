using BackEnd.Models;

public interface IJwtService
{
    string GenerateToken(Users user, bool rememberMe = false);
}