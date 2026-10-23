using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using BackEnd.interfaces;
using BackEnd.DTOs.v1;

namespace BackEnd.controller
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/auth")]
    public class AuthV1Controller : ControllerBase
    {
        private const string RefreshTokenCookieName = "refreshToken";
        private readonly IAuthService _auth;

        public AuthV1Controller(IAuthService auth)
        {
            _auth = auth;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CadastrarUsuario([FromBody] UserV1Dto user)
        {
            var response = await _auth.RegisterUser(user);
            if (!response.Sucesso)
            {
               return Unauthorized(response);
            }

            if (!string.IsNullOrEmpty(response.Dados?.RefreshToken))
            {
                SetRefreshTokenCookie(response.Dados.RefreshToken, response.Dados.RefreshTokenExpiresAt ?? DateTime.UtcNow.AddDays(7));
            }

            return StatusCode(201, response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] UserV1Dto userDto)
        {
            var response = await _auth.Authenticate(userDto);
            if (!response.Sucesso)
            {
                return BadRequest(response);
            }

            if (!string.IsNullOrEmpty(response.Dados?.RefreshToken))
            {
                SetRefreshTokenCookie(response.Dados.RefreshToken, response.Dados.RefreshTokenExpiresAt ?? DateTime.UtcNow.AddDays(7));
            }

            return Ok(response);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies[RefreshTokenCookieName];
            var response = await _auth.RefreshToken(refreshToken);

            if (!response.Sucesso)
            {
                DeleteRefreshTokenCookie();
                return Unauthorized(response);
            }

            if (!string.IsNullOrEmpty(response.Dados?.RefreshToken))
            {
                SetRefreshTokenCookie(response.Dados.RefreshToken, response.Dados.RefreshTokenExpiresAt ?? DateTime.UtcNow.AddDays(7));
            }

            return Ok(response);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies[RefreshTokenCookieName];
            var response = await _auth.RevokeToken(refreshToken);

            DeleteRefreshTokenCookie();
            return Ok(response);
        }

        private void SetRefreshTokenCookie(string refreshToken, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.Lax,
                Expires = expires,
                Path = "/api/v1/auth"
            };

            Response.Cookies.Append(RefreshTokenCookieName, refreshToken, cookieOptions);
        }

        private void DeleteRefreshTokenCookie()
        {
            Response.Cookies.Delete(RefreshTokenCookieName, new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps,
                SameSite = SameSiteMode.Lax,
                Path = "/api/v1/auth"
            });
        }
    }
}