using BackEnd.dtos;
namespace BackEnd.interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<UserResponse>> RegisterUser (UserDto userDto); 
        Task<ApiResponse<UserResponse>> Authenticate (UserDto userDto);
    }
}