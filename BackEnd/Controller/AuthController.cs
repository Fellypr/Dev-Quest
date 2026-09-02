using Microsoft.AspNetCore.Mvc;
using BackEnd.interfaces;
using BackEnd.dtos;
namespace BackEnd.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class Auth : ControllerBase
    {
        private readonly IAuth _auth;
        public Auth(IAuth auth)
        {
            _auth = auth;
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> CadastrarUsuario(UserDto user)
        {
            var response = await _auth.RegisterUser(user);
            if (!response.Sucesso)
            {
               return BadRequest(response);
            }
            return StatusCode(201, response);
        }

        [HttpPost("login")]

        public async Task<IActionResult> Authenticate (UserDto userDto)
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