using BackEnd.Data;
using BackEnd.interfaces;
using BackEnd.Models;
using BackEnd.services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace DevQuestApi.Tests
{
    public class AuthServiceReplayAttackTests
    {
        private AppDbContext CreateInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        [Fact]
        public async Task RefreshToken_WhenReplayAttackDetected_RevokesAllActiveTokensForUser()
        {
            // Arrange
            using var context = CreateInMemoryDbContext();
            var jwtServiceMock = new Mock<IJwtService>();
            var loggerMock = new Mock<ILogger<AuthService>>();

            var user = new Users
            {
                Id = 1,
                UserName = "johndoe",
                Email = "john@example.com",
                Password = "hashedpassword"
            };
            context.AppUsers.Add(user);

            // Token T1: Já foi substituído no passado pelo Token T2 (Replay Attack se for apresentado de novo)
            var token1 = new RefreshToken
            {
                Id = 1,
                UserId = user.Id,
                TokenHash = "hash_token_1",
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                RevokedAt = DateTime.UtcNow.AddHours(-2),
                RevokedByIp = "192.168.1.1",
                ReplacedByTokenHash = "hash_token_2"
            };

            // Token T2: Token legítimo ativo do usuário
            var token2 = new RefreshToken
            {
                Id = 2,
                UserId = user.Id,
                TokenHash = "hash_token_2",
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow.AddHours(-2),
                RevokedAt = null
            };

            // Token T3: Outra sessão ativa do usuário (ex: celular)
            var token3 = new RefreshToken
            {
                Id = 3,
                UserId = user.Id,
                TokenHash = "hash_token_3",
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow.AddHours(-1),
                RevokedAt = null
            };

            context.RefreshTokens.AddRange(token1, token2, token3);
            await context.SaveChangesAsync();

            // Quando o atacante mandar o token raw correspondente a T1:
            jwtServiceMock.Setup(j => j.HashToken("raw_token_1")).Returns("hash_token_1");

            var authService = new AuthService(context, jwtServiceMock.Object, loggerMock.Object);

            // Act: Invasor tenta reutilizar raw_token_1 a partir do IP 203.0.113.195
            var attackerIp = "203.0.113.195";
            var result = await authService.RefreshToken("raw_token_1", attackerIp);

            // Assert
            Assert.False(result.Sucesso);
            Assert.Contains("Violação de segurança detectada", result.Mensagem);

            // Verifica se TODOS os tokens ativos do usuário foram revogados como medida de contenção (RFC 6819)
            var updatedToken2 = await context.RefreshTokens.FindAsync(2);
            var updatedToken3 = await context.RefreshTokens.FindAsync(3);

            Assert.NotNull(updatedToken2);
            Assert.NotNull(updatedToken2.RevokedAt);
            Assert.Equal(attackerIp, updatedToken2.RevokedByIp);
            Assert.Equal("REVOKED_FAMILY_REPLAY_ATTACK", updatedToken2.ReplacedByTokenHash);

            Assert.NotNull(updatedToken3);
            Assert.NotNull(updatedToken3.RevokedAt);
            Assert.Equal(attackerIp, updatedToken3.RevokedByIp);
            Assert.Equal("REVOKED_FAMILY_REPLAY_ATTACK", updatedToken3.ReplacedByTokenHash);
        }

        [Fact]
        public async Task RefreshToken_WhenLegitimateToken_RotatesSuccessfully()
        {
            // Arrange
            using var context = CreateInMemoryDbContext();
            var jwtServiceMock = new Mock<IJwtService>();
            var loggerMock = new Mock<ILogger<AuthService>>();

            var user = new Users
            {
                Id = 1,
                UserName = "johndoe",
                Email = "john@example.com",
                Password = "hashedpassword"
            };
            context.AppUsers.Add(user);

            var activeToken = new RefreshToken
            {
                Id = 1,
                UserId = user.Id,
                User = user,
                TokenHash = "hash_active_token",
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow,
                RevokedAt = null
            };
            context.RefreshTokens.Add(activeToken);
            await context.SaveChangesAsync();

            var newEntity = new RefreshToken
            {
                UserId = user.Id,
                TokenHash = "hash_new_token",
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow,
                CreatedByIp = "192.168.1.50"
            };

            jwtServiceMock.Setup(j => j.HashToken("raw_active_token")).Returns("hash_active_token");
            jwtServiceMock.Setup(j => j.GenerateRefreshToken(user.Id, "192.168.1.50")).Returns(("raw_new_token", newEntity));
            jwtServiceMock.Setup(j => j.GenerateAccessToken(It.IsAny<Users>())).Returns("new_access_token");

            var authService = new AuthService(context, jwtServiceMock.Object, loggerMock.Object);

            // Act
            var result = await authService.RefreshToken("raw_active_token", "192.168.1.50");

            // Assert
            Assert.True(result.Sucesso);
            Assert.Equal("Token renovado com sucesso", result.Mensagem);
            Assert.Equal("new_access_token", result.Dados?.Token);
            Assert.Equal("raw_new_token", result.Dados?.RefreshToken);

            // O token antigo foi revogado e aponta para o novo (linhagem mantida)
            var oldTokenInDb = await context.RefreshTokens.FindAsync(1);
            Assert.NotNull(oldTokenInDb);
            Assert.NotNull(oldTokenInDb.RevokedAt);
            Assert.Equal("192.168.1.50", oldTokenInDb.RevokedByIp);
            Assert.Equal("hash_new_token", oldTokenInDb.ReplacedByTokenHash);
        }

        [Fact]
        public async Task RefreshToken_WhenLoggedOutVoluntarily_DoesNotRevokeOtherSessions()
        {
            // Arrange
            using var context = CreateInMemoryDbContext();
            var jwtServiceMock = new Mock<IJwtService>();
            var loggerMock = new Mock<ILogger<AuthService>>();

            var user = new Users
            {
                Id = 1,
                UserName = "johndoe",
                Email = "john@example.com",
                Password = "hashedpassword"
            };
            context.AppUsers.Add(user);

            // Token deslogado voluntariamente: RevokedAt != null, mas ReplacedByTokenHash == null
            var loggedOutToken = new RefreshToken
            {
                Id = 1,
                UserId = user.Id,
                TokenHash = "hash_logged_out_token",
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                RevokedAt = DateTime.UtcNow.AddHours(-1),
                RevokedByIp = "192.168.1.10",
                ReplacedByTokenHash = null
            };

            // Outra sessão ativa do usuário
            var activeSessionToken = new RefreshToken
            {
                Id = 2,
                UserId = user.Id,
                TokenHash = "hash_active_session",
                ExpiresAt = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow,
                RevokedAt = null
            };

            context.RefreshTokens.AddRange(loggedOutToken, activeSessionToken);
            await context.SaveChangesAsync();

            jwtServiceMock.Setup(j => j.HashToken("raw_logged_out_token")).Returns("hash_logged_out_token");

            var authService = new AuthService(context, jwtServiceMock.Object, loggerMock.Object);

            // Act
            var result = await authService.RefreshToken("raw_logged_out_token", "192.168.1.10");

            // Assert
            Assert.False(result.Sucesso);
            Assert.Equal("Token de renovação inválido ou expirado.", result.Mensagem);

            // A outra sessão ativa NÃO deve ter sido derrubada, pois não foi um replay attack
            var session2 = await context.RefreshTokens.FindAsync(2);
            Assert.NotNull(session2);
            Assert.Null(session2.RevokedAt);
        }
    }
}
