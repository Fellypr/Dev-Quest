using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.dtos;
namespace BackEnd.interfaces
{
    public interface IAuth
    {
        Task<ApiResponse<UserResponse>> RegisterUser (UserDto userDto); 
        
    }
}