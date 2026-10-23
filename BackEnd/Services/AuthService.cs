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

            var accessToken = _jwtService.GenerateAccessToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken(user.Id);

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            var userResponse = new UserV1Response
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = accessToken,
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiresAt = refreshToken.ExpiresAt
            };

            return ApiResponse<UserV1Response>.Ok(userResponse, "Usuário cadastrado com sucesso");
        }

        public async Task<ApiResponse<UserV1Response>> Authenticate(UserV1Dto userDto)
        {
            var userExist = await _context.AppUsers
                .FirstOrDefaultAsync(u => u.Email == userDto.Email || u.UserName == userDto.UserName);

            if (userExist == null)
            {
                return ApiResponse<UserV1Response>.Erro("Usuário não encontrado");
            }

            if (!BCryptNet.Verify(userDto.Password, userExist.Password))
            {
                return ApiResponse<UserV1Response>.Erro("Usuário ou senha incorretos");
            }

            var accessToken = _jwtService.GenerateAccessToken(userExist);
            var refreshToken = _jwtService.GenerateRefreshToken(userExist.Id);

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            var userResponse = new UserV1Response
            {
                UserName = userExist.UserName,
                Email = userExist.Email,
                Token = accessToken,
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiresAt = refreshToken.ExpiresAt
            };

            return ApiResponse<UserV1Response>.Ok(userResponse, $"Bem vindo de volta {userResponse.UserName}");
        }

        public async Task<ApiResponse<UserV1Response>> RefreshToken(string? refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return ApiResponse<UserV1Response>.Erro("Token de renovação não fornecido.");
            }

            var tokenEntity = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (tokenEntity == null || !tokenEntity.IsActive)
            {
                return ApiResponse<UserV1Response>.Erro("Token de renovação inválido ou expirado.");
            }

            // Rotação de Refresh Token: revoga o atual e cria um novo
            tokenEntity.RevokedAt = DateTime.UtcNow;

            var newRefreshToken = _jwtService.GenerateRefreshToken(tokenEntity.UserId);
            var newAccessToken = _jwtService.GenerateAccessToken(tokenEntity.User);

            _context.RefreshTokens.Add(newRefreshToken);
            await _context.SaveChangesAsync();

            var userResponse = new UserV1Response
            {
                UserName = tokenEntity.User.UserName,
                Email = tokenEntity.User.Email,
                Token = newAccessToken,
                RefreshToken = newRefreshToken.Token,
                RefreshTokenExpiresAt = newRefreshToken.ExpiresAt
            };

            return ApiResponse<UserV1Response>.Ok(userResponse, "Token renovado com sucesso");
        }

        public async Task<ApiResponse<bool>> RevokeToken(string? refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return ApiResponse<bool>.Ok(true, "Nenhuma sessão ativa encontrada.");
            }

            var tokenEntity = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

            if (tokenEntity != null && tokenEntity.IsActive)
            {
                tokenEntity.RevokedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            return ApiResponse<bool>.Ok(true, "Sessão encerrada com sucesso.");
        }
    }
}
