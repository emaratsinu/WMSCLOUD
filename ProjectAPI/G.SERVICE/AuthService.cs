using Dapper;
using G.ENTITY;
using G.REPOSITORY;
using System;
using System.Data;

namespace G.SERVICE
{
    public interface IAuthService
    {
        UserDto Authenticate(string username, string password);
    }

    public class AuthService : IAuthService
    {
        private readonly IDapperRepository _dapperRepository;

        public AuthService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }

        public UserDto Authenticate(string username, string password)
        {
            try
            {
                string encryptedUsername = EncryptionHelper.Encrypt(username);
                string encryptedPassword = EncryptionHelper.Encrypt(password);

                var dbparams = new DynamicParameters();
                dbparams.Add("@Username", encryptedUsername, DbType.String);
                dbparams.Add("@Password", encryptedPassword, DbType.String);

                var user = _dapperRepository.Get<UserDto>(
                    "[dbo].[G_AuthenticateUser_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Error authenticating user", ex);
            }
        }

    }
}
