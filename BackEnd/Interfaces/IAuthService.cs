using BackEnd.dtos;
namespace BackEnd.interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<UserV1Response>> RegisterUser (UserV1Dto userDto); 
        Task<ApiResponse<UserV1Response>> Authenticate (UserV1Dto userDto);
    }
}