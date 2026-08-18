using BackEnd.Data;
using BackEnd.dtos;
using BackEnd.interfaces;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.services
{
    public class AuthService : IAuth
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<UserResponse>> RegisterUser(UserDto userDto)
        {
            var emailExists = await _context.AppUsers.AnyAsync(user => user.Email == userDto.Email);

            if (emailExists)
            {
                return new ApiResponse<UserResponse>
                {
                    Sucesso = false,
                    Mensagem = "E-mail já cadastrado"
                };
            }

            var user = new Users
            {
                UserName = userDto.UserName,
                Email = userDto.Email,
                Password = userDto.Password
            };

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            var userResponse = new UserResponse
            {
                UserName = user.UserName,
                Email = user.Email
            };

            return ApiResponse<UserResponse>.Ok(userResponse, "Usuário cadastrado com sucesso");
        }
    }
}
