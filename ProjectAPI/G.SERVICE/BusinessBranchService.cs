using Dapper;
using G.ENTITY;
using G.REPOSITORY;
using System;
using System.Data;

namespace G.SERVICE
{
    public interface IBusinessBranchService
    {
        BranchDto GetBranchDet(long branchId);
        BusinessDto GetBusinessDet(long businessId);



    }

    public class BusinessBranchService : IBusinessBranchService
    {
        private readonly IDapperRepository _dapperRepository;

        public BusinessBranchService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }

        public BranchDto GetBranchDet(long branchId)
        {
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@branchId", branchId, DbType.Int64);

                return _dapperRepository.Get<BranchDto>(
                    "[dbo].[G_GetBranchDetails_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving branch details", ex);
            }
        }

        public BusinessDto GetBusinessDet(long businessId)
        {
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@businessId", businessId, DbType.Int64);

                return _dapperRepository.Get<BusinessDto>(
                    "[dbo].[G_GetBusinessDetails_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception("Error retrieving business details", ex);
            }
        }



        public UserDto Authenticate(string username, string password)
        {
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Username", username, DbType.String);
                dbparams.Add("@Password", password, DbType.String);

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
