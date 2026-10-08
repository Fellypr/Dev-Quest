using BackEnd.Data;
using BackEnd.DTOs.v1;
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

        
        public async Task<ApiResponse<UserV1Response>> RegisterUser(UserV1Dto userDto)
        {
            var emailExists = await _context.AppUsers.AnyAsync(user => user.Email == userDto.Email);

            if (emailExists)
            {
                return ApiResponse<UserV1Response>.Erro("Essa conta já existe.");
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


            var userResponse = new UserV1Response
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = token
            };

            return ApiResponse<UserV1Response>.Ok(userResponse, "Usuário cadastrado com sucesso");
        }
        public async Task<ApiResponse<UserV1Response>> Authenticate(UserV1Dto userDto)
        {
            var userExist = await _context.AppUsers.FirstOrDefaultAsync(banco => banco.Email == userDto.Email || banco.UserName == userDto.UserName);

            if(userExist == null)
            {
                return ApiResponse<UserV1Response>.Erro("Usuario não encontrado");
            }
            if (!BCryptNet.Verify(userDto.Password,userExist.Password))
            {
                return ApiResponse<UserV1Response>.Erro("Usuário ou senha incorretos");
            }

            var userResponse = new UserV1Response{
              Email = userExist.Email,
              UserName = userExist.UserName  
            };

            return ApiResponse<UserV1Response>.Ok(userResponse,$"Bem vindo de volta {userResponse.UserName}");
            
        }
    }
}
