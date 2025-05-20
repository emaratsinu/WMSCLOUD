using Dapper;
using G.ENTITY;  // Ensure BranchType is defined in this namespace
using G.REPOSITORY;
using System.Collections.Generic;
using System.Data;

namespace G.SERVICE
{
    public interface IBranchTypeService
    {
        List<BranchType> GetAll();



        List<BranchType> GetBranchType(string filterField = null, string filterCondition = null, string filterValue = null);
        string GetNxtBranchTypeCode();
        BranchType GetBranchType_id(long BrType_Id);

        DB_STATUS SaveBranchType(BranchType BrType);
    }

    public class BranchTypeService : IBranchTypeService
    {
        private readonly IDapperRepository _dapperRepository;

        public BranchTypeService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }

        public List<BranchType> GetAll()
        {
            List<BranchType> list;
            try
            {
                // No parameters needed for this stored procedure
                list = _dapperRepository.GetAll<BranchType>("[dbo].[G_GetAllBranchTypes_Api]",
                    null,
                    commandType: CommandType.StoredProcedure);
            }
            catch
            {
                throw;  // Consider logging or handling the exception
            }

            return list;
        }

        public List<BranchType> GetBranchType(string FilterField = null, string FilterCondition = null, string FilterValue = null)
        {
            List<BranchType> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                result = _dapperRepository.GetAll<BranchType>("[dbo].[G_Get_BranchType_Api]",
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


        public string GetNxtBranchTypeCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Get_NextBranchType_Code_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public BranchType GetBranchType_id(long BrType_Id)
        {
            BranchType? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@BrType_Id ", BrType_Id, DbType.Int32);

                result = _dapperRepository.Get<BranchType>("[dbo].[G_Get_BranchType_ById]"
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




        public DB_STATUS SaveBranchType(BranchType model)
        {
            try
            {
                var parameters = new DynamicParameters();

                // Add parameters for the Currency model
                parameters.Add("@BrType_Id", model.BrType_Id);                  // Input: Currency ID (0 for insert)
                parameters.Add("@BrType_Code", model.BrType_Code);              // Input: Currency Code (non-null, 3 characters)
                parameters.Add("@BrType_NameEn", model.BrType_NameEn);
                parameters.Add("@BrType_NameAr", model.BrType_NameAr);              // Input: Currency Description (non-null)

                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Call the repository method to execute the stored procedure
                var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_BranchType_Api]", parameters, CommandType.StoredProcedure);

                // Get the Result output parameter from the stored procedure
                var resultCode = parameters.Get<int>("@Result");

                // Check the result and return appropriate DB_STATUS
                if (resultCode == 1) // Insert operation
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Branch Type   inserted successfully.",
                        Id = resultCode
                    };
                }
                else if (resultCode == 2) // Update operation
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Branch Type  updated successfully.",
                        Id = resultCode
                    };
                }
                else
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Branch Type record was not saved successfully."
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


    }
}
