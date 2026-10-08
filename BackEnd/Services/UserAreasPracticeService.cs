using BackEnd.DTOs.v1;
using BackEnd.interfaces;
using Microsoft.EntityFrameworkCore;
using BackEnd.Data;
namespace BackEnd.Services
{
    public class UserAreasPracticeService : IUserAreasPracticeService
    {
        private readonly AppDbContext _context;

        public UserAreasPracticeService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ApiResponse<UserAreasPracticeV1Response>> CreateUserAreasPractice(UserAreasPracticeV1Request request)
        {
            
        }
    }
}