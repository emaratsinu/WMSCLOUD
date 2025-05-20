
using Dapper;
using G.ENTITY;  // Ensure BranchType is defined in this namespace
using G.REPOSITORY;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.SERVICE
{
    public interface IUserMainService
    {
        USER_MAINResult Get(USER_MAIN user);
    }



    public class UserMainService : IUserMainService
    {
        private IDapperRepository _DapperRepository;
        public UserMainService(IDapperRepository DapperRepository)
        {
            this._DapperRepository = DapperRepository;

        }
        public USER_MAINResult Get(USER_MAIN login)
        {
            USER_MAINResult? model = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@loginname", login.USER_LoginName, DbType.String);
                dbparams.Add("@password", login.USER_Password, DbType.String);
                //dbparams.Add("@version", 2, DbType.String);
                // dbparams.Add("@Output", dbType: DbType.Int32, direction: ParameterDirection.Output);
                // model = _DapperRepository.Get<USER_MAINResult>("[dbo].[Api_Usp_Get_UserLoginDetails]", dbparams, commandType: CommandType.StoredProcedure);

                if (model != null)
                {
                    if (model.Success == true)
                    {
                        model = new USER_MAINResult
                        {
                            //USER_LoginName ="Super",
                            USER_Name_En = "Administrator",
                            USER_Name_Ar = "Administrator",
                            USER_UserId = 1
                        };
                    }
                }


            }
            catch (Exception ex)
            {
                // ErrorLoggingHelper.LogException(ex);
                throw ex;
            }
            finally
            {

            }
            return model;
        }

    }
}
