using G.ENTITY;
using G.SERVICE;
using GarageWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Text.Json.Serialization;

namespace GarageWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   // [EnableCors("AllowCors")] 
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] LoginRequestModel request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.username) || string.IsNullOrWhiteSpace(request.password))
            {
                return BadRequest(new { message = "Username and password are required." });
            }

            var user = _authService.Authenticate(request.username, request.password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password." });
            }

            return Ok(user);
        }

    }
}
