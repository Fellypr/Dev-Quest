using BackEnd.DTOs.v1;
namespace BackEnd.interfaces
{
    public interface IUserAreasPracticeService
    {
        Task<ApiResponse<UserAreasPracticeV1Response>> CreateUserAreasPractice(UserAreasPracticeV1Request request);
    }
}