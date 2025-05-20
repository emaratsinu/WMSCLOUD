using Dapper;
using G.ENTITY;  
using G.REPOSITORY;
using System.Collections.Generic;
using System.Data;


namespace G.SERVICE
{
    public interface IBranchAreaService
    {

        List<BranchArea> GetBranchArea(string filterField = null, string filterCondition = null, string filterValue = null);
        string GetNxtBranchAreaCode();
        BranchArea GetBranchArea_id(long Area_Id);

        DB_STATUS SaveBranchArea(BranchArea BrArea);
    }


    public class BranchAreaService : IBranchAreaService
    {
        private readonly IDapperRepository _dapperRepository;

        public BranchAreaService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }



        public List<BranchArea> GetBranchArea(string FilterField = null, string FilterCondition = null, string FilterValue = null)
        {
            List<BranchArea> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                result = _dapperRepository.GetAll<BranchArea>("[dbo].[G_Get_BranchAreas_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch
            {
                throw;
            }
            finally
            {
                // Optional: Clean-up code if needed
            }
            return result;
        }


        public string GetNxtBranchAreaCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Get_NextBranchArea_Code_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }

        public BranchArea GetBranchArea_id(long Area_Id)
        {
            BranchArea? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@Area_Id ", Area_Id, DbType.Int32);

                result = _dapperRepository.Get<BranchArea>("[dbo].[G_Get_BranchArea_ById]"
                    , dbparams,
                    commandType: CommandType.StoredProcedure);

            }
            catch
            {
                throw;
            }
            finally
            {

            }
            return result;
        }




        public DB_STATUS SaveBranchArea(BranchArea model)
        {
            try
            {
                var parameters = new DynamicParameters();

                // Add parameters for the Currency model
                parameters.Add("@Area_Id", model.Area_Id);                  // Input: Currency ID (0 for insert)
                parameters.Add("@Area_Code", model.Area_Code);              // Input: Currency Code (non-null, 3 characters)
                parameters.Add("@Area_NameEn", model.Area_NameEn);    
                parameters.Add("@Area_NameAr", model.Area_NameAr);              // Input: Currency Description (non-null)

                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Call the repository method to execute the stored procedure
                var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_BranchAreas_Api]", parameters, CommandType.StoredProcedure);

                // Get the Result output parameter from the stored procedure
                var resultCode = parameters.Get<int>("@Result");

                // Check the result and return appropriate DB_STATUS
                if (resultCode == 1) // Insert operation
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Branch Area  inserted successfully.",
                        Id = resultCode
                    };
                }
                else if (resultCode == 2) // Update operation
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Branch Area updated successfully.",
                        Id = resultCode
                    };
                }
                else
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Branch Area record was not saved successfully."
                    };
                }
            }
            catch (Exception ex)
            {
                // Log the exception details for troubleshooting
                return new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred while saving the Branch Area record.",

                };
            }


        }









        public List<BranchArea> GetAll()
        {
            List<BranchArea> list;
            try
            {
                // No parameters needed for this stored procedure
                list = _dapperRepository.GetAll<BranchArea>("[dbo].[GetBranchAreas_Api]",
                    null,
                    commandType: CommandType.StoredProcedure);
            }
            catch
            {
                throw;  // Consider logging or handling the exception
            }

            return list;
        }
    }
}
