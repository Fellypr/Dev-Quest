using BackEnd.Data;
using BackEnd.dtos;
using BackEnd.interfaces;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using BCryptNet = BCrypt.Net.BCrypt;
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

                return ApiResponse<UserResponse>.Erro("Essa conta já existe.");
                // return new ApiResponse<UserResponse>
                // {
                //     Sucesso = false,
                //     Mensagem = "E-mail já cadastrado"
                // };
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

            var userResponse = new UserResponse
            {
                UserName = user.UserName,
                Email = user.Email
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
            if (!BCryptNet.Verify(userExist.Password ,userDto.Password))
            {
                return ApiResponse<UserResponse>.Erro("Usuário ou senha incorretos");
            }

            var userResponse = new UserResponse{
              Email = userDto.Email,
              UserName = userDto.UserName  
            };

            return ApiResponse<UserResponse>.Ok(userResponse,$"Bem vindo de volta {userResponse.UserName}");
            
        }
    }
}
