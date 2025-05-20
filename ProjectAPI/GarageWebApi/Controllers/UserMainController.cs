using G.ENTITY; // Ensure the correct namespace for your models
using G.ENTITY.G.ENTITY;
using G.SERVICE;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using System.Security.Cryptography;
using GarageWebApi.Models;



namespace GarageWebApi.Controllers

{
    [Produces("application/json")]
    [EnableCors("AllowCors")]
    public class UserMainController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserMainService _userMainService;
        private readonly RefreshTokenService _refreshTokenService;
        private readonly IDictionary<long, string> _refreshTokens;
        public ResponseModel response;

        public UserMainController(IConfiguration config, IUserMainService userMainService, RefreshTokenService refreshTokenService)
        {
            _config = config;
            _userMainService = userMainService;
            _refreshTokens = new Dictionary<long, string>();
            _refreshTokenService = refreshTokenService;

        }
        private static readonly Dictionary<string, string> mockUsers = new()
{
    { "admin", "password" } // Key: Username, Value: Plain Password (not recommended for real-world scenarios)
};

        private USER_MAIN AuthenticateUser(USER_MAIN login)
        {
            string decryptedUsername = EncryptionHelper.Decrypt(login.USER_LoginName);
            string decryptedPassword = EncryptionHelper.Decrypt(login.USER_Password);

            if (mockUsers.TryGetValue(decryptedUsername, out string storedPassword) && storedPassword == decryptedPassword)
            {
                return new USER_MAIN
                {
                    Success = true,
                    Name_En = "Admin User",
                    Name_Ar = "مشرف",
                    CurrentBranchId = 1,
                    UserBranchId = 1,
                    BRANCH_Name_En = "Main Branch",
                    UserId = 1,
                    IsMainStore = true,
                    EmployeeId = 1,
                    EMPLOYEE_Number = "EMP001",
                    IsWholesale = true,
                    StatusMessage = "Login successful!"
                };
            }

            return null;
        }


        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                var refreshToken = Convert.ToBase64String(randomNumber);
                return refreshToken;
            }
        }

        private GenerateToken GenerateJSONWebToken(UserMainModel userInfo) //*** modified by edwin 2/10/23
        {
            var refreshToken = "";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.NameId, userInfo.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, userInfo.Name_En),
                new Claim(JwtRegisteredClaimNames.GivenName, userInfo.Name_En),
               // new Claim(ClaimTypes.NameIdentifier, userInfo.UId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
        _config["Jwt:Issuer"],
        claims,
        expires: DateTime.Now.AddMinutes(120),
        signingCredentials: credentials);

            refreshToken = GenerateRefreshToken();
            _refreshTokenService.add(userInfo.UId, refreshToken);
            GenerateToken generateToken = new GenerateToken();
            generateToken.Token = new JwtSecurityTokenHandler().WriteToken(token); // Store the refresh token
            generateToken.RefreshToken = refreshToken;

            return generateToken;
        }



        public void StoreRefreshToken(long userId, string refreshToken)
        {
            _refreshTokens[userId] = refreshToken;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("~/api/RefreshToken")]
        public IActionResult RefreshToken([FromBody] UserMainModel user, string refreshToken)
        {
            IDictionary<long, string> _refreshTokens = _refreshTokenService.GetRefreshTokens();
            if (!_refreshTokens.TryGetValue(user.UId, out var storedRefreshToken) || storedRefreshToken != user.RefreshToken)
            {
                return Unauthorized();
            }
            var newAccessToken = GenerateJSONWebToken(user);
            var newRefreshToken = GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            _refreshTokenService.add(user.UId, newRefreshToken);

            return new JsonResult(new
            {
                Token = newAccessToken,
                ExpiresInhrs = 120,
                StatusCode = 1,
                StatusMessage = "Token refreshed successfully",
                Name = user.Name_En + ' ' + user.Name_Ar,
                RefreshToken = newRefreshToken,
                CurrentBranchId = user.CurrentBranchId,
                UserBranchId = user.UserBranchId,
                BRANCHName_En = user.BRANCH_Name_En,
                UserId = user.UId,
                user = user,
                EmployeeId = user.EmployeeId
            });
        }


    }
}

