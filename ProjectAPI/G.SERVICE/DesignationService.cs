using Dapper;
using G.ENTITY;  // Ensure BranchType is defined in this namespace
using G.REPOSITORY;
using System.Collections.Generic;
using System.Data;

namespace G.SERVICE
{
    public  interface IDesignationService
    {
        List<Designation> GetDesignation(string filterField = null, string filterCondition = null, string filterValue = null);
        string GetNxtDesignationCode();
        Designation GetDesignation_id(long Desig_Id);

        DB_STATUS SaveDesignation(Designation Dept);

        

    }




    public class DesignationService : IDesignationService
    {
        private readonly IDapperRepository _dapperRepository;

        public DesignationService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }


        public List<Designation> GetDesignation(string FilterField = null, string FilterCondition = null, string FilterValue = null)
        {
            List<Designation> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                result = _dapperRepository.GetAll<Designation>("[dbo].[G_Get_Designation_Api]",
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


        public string GetNxtDesignationCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Get_NextDesignation_Code_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public Designation GetDesignation_id(long Desig_Id)
        {
            Designation? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@Desig_Id ", Desig_Id, DbType.Int32);

                result = _dapperRepository.Get<Designation>("[dbo].[G_Get_Designation_ById]"
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




        public DB_STATUS SaveDesignation(Designation model)
        {
            try
            {
                var parameters = new DynamicParameters();

                // Add parameters for the Currency model
                parameters.Add("@Desig_Id", model.Desig_Id);
                parameters.Add("@Desig_Code", model.Desig_Code);
                parameters.Add("@Desig_NameEn", model.Desig_NameEn);
                parameters.Add("@Desig_NameAr", model.Desig_NameAr);
               

                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Call the repository method to execute the stored procedure
                var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_Designation_Api]", parameters, CommandType.StoredProcedure);

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


    
