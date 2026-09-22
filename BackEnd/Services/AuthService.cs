using BackEnd.Data;
using BackEnd.dtos;
using BackEnd.interfaces;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using BCryptNet = BCrypt.Net.BCrypt;
namespace BackEnd.services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;

        public AuthService(AppDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        
        public async Task<ApiResponse<UserResponse>> RegisterUser(UserDto userDto)
        {
            var emailExists = await _context.AppUsers.AnyAsync(user => user.Email == userDto.Email);

            if (emailExists)
            {
                return ApiResponse<UserResponse>.Erro("Essa conta já existe.");
            }
            string passwordHash = BCryptNet.HashPassword(userDto.Password);

            var user = new Users
            {
                UserName = userDto.UserName,
                Email = userDto.Email,
                Password = passwordHash
            };

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();
            var token = _jwtService.GenerateToken(user);


            var userResponse = new UserResponse
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = token
            };

            return ApiResponse<UserResponse>.Ok(userResponse, "Usuário cadastrado com sucesso");
        }
        public async Task<ApiResponse<UserResponse>> Authenticate(UserDto userDto)
        {
            var userExist = await _context.AppUsers.FirstOrDefaultAsync(banco => banco.Email == userDto.Email || banco.UserName == userDto.UserName);

            if(userExist == null)
            {
                return ApiResponse<UserResponse>.Erro("Usuario não encontrado");
            }
            if (!BCryptNet.Verify(userDto.Password,userExist.Password))
            {
                return ApiResponse<UserResponse>.Erro("Usuário ou senha incorretos");
            }

            var userResponse = new UserResponse{
              Email = userExist.Email,
              UserName = userExist.UserName  
            };

            return ApiResponse<UserResponse>.Ok(userResponse,$"Bem vindo de volta {userResponse.UserName}");
            
        }
    }
}
