using BackEnd.DTOs.v1;

namespace BackEnd.interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<UserV1Response>> RegisterUser(UserV1Dto userDto, string? ipAddress = null); 
        Task<ApiResponse<UserV1Response>> Authenticate(UserV1Dto userDto, string? ipAddress = null);
        Task<ApiResponse<UserV1Response>> RefreshToken(string? refreshToken, string? ipAddress = null);
        Task<ApiResponse<bool>> RevokeToken(string? refreshToken, string? ipAddress = null);
    }
}