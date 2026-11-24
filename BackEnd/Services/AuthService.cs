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

        public async Task<ApiResponse<UserV1Response>> RegisterUser(UserV1Dto userDto, string? ipAddress = null)
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
            var (rawRefreshToken, refreshTokenEntity) = _jwtService.GenerateRefreshToken(user.Id, ipAddress);

            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();

            var userResponse = new UserV1Response
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = accessToken,
                RefreshToken = rawRefreshToken,
                RefreshTokenExpiresAt = refreshTokenEntity.ExpiresAt
            };

            return ApiResponse<UserV1Response>.Ok(userResponse, "Usuário cadastrado com sucesso");
        }

        public async Task<ApiResponse<UserV1Response>> Authenticate(UserV1Dto userDto, string? ipAddress = null)
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
            var (rawRefreshToken, refreshTokenEntity) = _jwtService.GenerateRefreshToken(userExist.Id, ipAddress);

            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();

            var userResponse = new UserV1Response
            {
                UserName = userExist.UserName,
                Email = userExist.Email,
                Token = accessToken,
                RefreshToken = rawRefreshToken,
                RefreshTokenExpiresAt = refreshTokenEntity.ExpiresAt
            };

            return ApiResponse<UserV1Response>.Ok(userResponse, $"Bem vindo de volta {userResponse.UserName}");
        }

        public async Task<ApiResponse<UserV1Response>> RefreshToken(string? refreshToken, string? ipAddress = null)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return ApiResponse<UserV1Response>.Erro("Token de renovação não fornecido.");
            }

            // O front manda o token puro, entao a gente calcula o hash dele pra achar a linha certa no banco
            var tokenHash = _jwtService.HashToken(refreshToken);

            var tokenEntity = await _context.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash);

            if (tokenEntity == null || !tokenEntity.IsActive)
            {
                return ApiResponse<UserV1Response>.Erro("Token de renovação inválido ou expirado.");
            }

            // Gera o novo token já associado ao IP do requisitante
            var (newRawRefreshToken, newRefreshTokenEntity) = _jwtService.GenerateRefreshToken(tokenEntity.UserId, ipAddress);
            var newAccessToken = _jwtService.GenerateAccessToken(tokenEntity.User);

            // Invalida o token antigo, anota quem revogou e salva o hash do token novo que o substituiu (SCRUM-13)
            tokenEntity.RevokedAt = DateTime.UtcNow;
            tokenEntity.RevokedByIp = ipAddress;
            tokenEntity.ReplacedByTokenHash = newRefreshTokenEntity.TokenHash;

            _context.RefreshTokens.Add(newRefreshTokenEntity);
            await _context.SaveChangesAsync();

            var userResponse = new UserV1Response
            {
                UserName = tokenEntity.User.UserName,
                Email = tokenEntity.User.Email,
                Token = newAccessToken,
                RefreshToken = newRawRefreshToken,
                RefreshTokenExpiresAt = newRefreshTokenEntity.ExpiresAt
            };

            return ApiResponse<UserV1Response>.Ok(userResponse, "Token renovado com sucesso");
        }

        public async Task<ApiResponse<bool>> RevokeToken(string? refreshToken, string? ipAddress = null)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return ApiResponse<bool>.Ok(true, "Nenhuma sessão ativa encontrada.");
            }

            var tokenHash = _jwtService.HashToken(refreshToken);

            var tokenEntity = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.TokenHash == tokenHash);

            if (tokenEntity != null && tokenEntity.IsActive)
            {
                tokenEntity.RevokedAt = DateTime.UtcNow;
                tokenEntity.RevokedByIp = ipAddress;
                await _context.SaveChangesAsync();
            }

            return ApiResponse<bool>.Ok(true, "Sessão encerrada com sucesso.");
        }
    }
}
