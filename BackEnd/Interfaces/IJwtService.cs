using BackEnd.Models;

namespace BackEnd.interfaces
{
    public interface IJwtService
    {
        string GenerateAccessToken(Users user);
        (string RawToken, RefreshToken Entity) GenerateRefreshToken(int userId);
        string HashToken(string token);
        string GenerateToken(Users user, bool rememberMe = false);
    }
}