using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;
using BackEnd.interfaces;
using BackEnd.dtos;


namespace BackEnd.controller
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/auth")]
    public class AuthV1Controller : ControllerBase
    {
        private readonly IAuthService _auth;

        public AuthV1Controller(IAuthService auth)
        {
            _auth = auth;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CadastrarUsuario(UserV1Dto user)
        {
            var response = await _auth.RegisterUser(user);
            if (!response.Sucesso)
            {
               return Unauthorized(response);
            }
            return StatusCode(201, response);
        }

        [HttpPost("login")]

        public async Task<IActionResult> Authenticate (UserV1Dto userDto)
        {
            var response = await _auth.Authenticate(userDto);
            if (!response.Sucesso)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}