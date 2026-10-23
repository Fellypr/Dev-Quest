using BackEnd.Models;

namespace BackEnd.interfaces
{
    public interface IJwtService
    {
        string GenerateAccessToken(Users user);
        RefreshToken GenerateRefreshToken(int userId);
        string GenerateToken(Users user, bool rememberMe = false);
    }
}