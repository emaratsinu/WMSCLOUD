using Dapper;
using G.ENTITY;  // Ensure BranchType is defined in this namespace
using G.REPOSITORY;
using System.Collections.Generic;
using System.Data;


namespace G.SERVICE
{


    public interface IDepartmentService
    {


        List<Department> GetDepartment(string filterField = null, string filterCondition = null, string filterValue = null);
        string GetNxtDepartmentCode();
        Department GetDepartment_id(long Dept_Id);

        DB_STATUS SaveDepartment(Department Dept);

        List<Business> GetBusiness();

        List<Business> GetBusinessAll(string filterField = null, string filterCondition = null, string filterValue = null);

        string GetNxtBusinessCode();

        DB_STATUS SaveBusiness(Business Bus);

        Business GetBusiness_id(long Bus_Id);

    }



    public  class DepartmentService: IDepartmentService
    {
        private readonly IDapperRepository _dapperRepository;

        public DepartmentService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }


        public List<Department> GetDepartment(string FilterField = null, string FilterCondition = null, string FilterValue = null)
        {
            List<Department> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                result = _dapperRepository.GetAll<Department>("[dbo].[G_Get_Departments_Api]",
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


        public string GetNxtDepartmentCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Get_NextDepartment_Code_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public Department GetDepartment_id(long Dept_Id)
        {
            Department? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@Dept_Id ", Dept_Id, DbType.Int32);

                result = _dapperRepository.Get<Department>("[dbo].[G_Get_Departments_ById]"
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




        public DB_STATUS SaveDepartment(Department model)
        {
            try
            {
                var parameters = new DynamicParameters();

                // Add parameters for the Currency model
                parameters.Add("@Dept_Id", model.Dept_Id);                
                parameters.Add("@Dept_Code", model.Dept_Code);             
                parameters.Add("@Dept_NameEn", model.Dept_NameEn);
                parameters.Add("@Dept_NameAr", model.Dept_NameAr);
                parameters.Add("@Dept_BusId", model.Dept_BusId);

                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Call the repository method to execute the stored procedure
                var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_Department_Api]", parameters, CommandType.StoredProcedure);

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


        public List<Business> GetBusiness()
        {
            List<Business> result = null;
            try
            {
                var dbparams = new DynamicParameters();
               
                result = _dapperRepository.GetAll<Business>("[dbo].[G_Get_Business_Api]",
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



        public List<Business> GetBusinessAll(string FilterField = null, string FilterCondition = null, string FilterValue = null)
        {
            List<Business> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                result = _dapperRepository.GetAll<Business>("[dbo].[G_Get_AllBusiness_Api]",
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


        public string GetNxtBusinessCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Get_NextBusiness_Code_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public DB_STATUS SaveBusiness(Business model)
        {
            try
            {
                var parameters = new DynamicParameters();

                // Add parameters for the Currency model
                parameters.Add("@Bus_Id", model.Bus_Id);
                parameters.Add("@Bus_Code", model.Bus_Code);
                parameters.Add("@Bus_NameEn", model.Bus_NameEn);
                parameters.Add("@Bus_NameAr", model.Bus_NameAr);
               

                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Call the repository method to execute the stored procedure
                var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_Business_Api]", parameters, CommandType.StoredProcedure);

                // Get the Result output parameter from the stored procedure
                var resultCode = parameters.Get<int>("@Result");

                // Check the result and return appropriate DB_STATUS
                if (resultCode == 1) // Insert operation
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Business    inserted successfully.",
                        Id = resultCode
                    };
                }
                else if (resultCode == 2) // Update operation
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Business updated successfully.",
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




        public Business GetBusiness_id(long Bus_Id)
        {
            Business? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@Bus_Id ", Bus_Id, DbType.Int32);

                result = _dapperRepository.Get<Business>("[dbo].[G_Get_Business_Byid]"
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




    }
}
