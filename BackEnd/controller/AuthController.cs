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
                BadRequest(response);
            }
            return StatusCode(201, response);
        }


    }
}