using Dapper;
using G.ENTITY;
using G.REPOSITORY;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.SERVICE
{



    public interface IEmployeeService
    {


        IEnumerable<Employee_Main> GetAllEmployee();
        Employee_Main Get(long Emp_id);

        IEnumerable<Employee_Designation> GetEmployee_Designations();

        IEnumerable<Employee_Department> GetEmployee_Dept();

        IEnumerable<Country> GetEmployee_Country();



        string GetNextEmployeeCode();

        string GetNextEmpMainCode();

        DB_STATUS Save(Employee_Main employee);


        public class EmployeeService : IEmployeeService

        {
            private readonly IDapperRepository _dapperRepository;

            public EmployeeService(IDapperRepository dapperRepository)
            {
                _dapperRepository = dapperRepository;
            }

            public IEnumerable<Employee_Main> GetAllEmployee()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<Employee_Main>("[G_Get_Employee_Details_Api]", parameters, CommandType.StoredProcedure);
            }




            public Employee_Main Get(long Emp_id)
            {
                Employee_Main? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@Emp_Id", Emp_id, DbType.Int32);

                    result = _dapperRepository.Get<Employee_Main>("[dbo].[Api_P_GetItemMainLocation]"
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

            public IEnumerable<Employee_Designation> GetEmployee_Designations()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<Employee_Designation>("[G_Get_Employee_Des_Api]", parameters, CommandType.StoredProcedure);
            }

            public IEnumerable<Country> GetEmployee_Country()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<Country>("[G_Get_Countries_Api]", parameters, CommandType.StoredProcedure);
            }



            public IEnumerable<Employee_Department> GetEmployee_Dept()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<Employee_Department>("[G_Get_Emp_Dept_Api]", parameters, CommandType.StoredProcedure);
            }


            public string GetNextEmployeeCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_Next_Emp_Code_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }


            public string GetNextEmpMainCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_Next_Emp_Main_Code_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }




            public DB_STATUS Save(Employee_Main model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@Emp_Id", model.Emp_Id);
                    parameters.Add("@Emp_Code", model.Emp_Code);
                    parameters.Add("@Emp_MainCode", model.Emp_MainCode);
                    parameters.Add("@Emp_NameEn", model.Emp_NameEn);
                    parameters.Add("@Emp_NameAr", model.Emp_NameAr);
                    parameters.Add("@Emp_Initials", model.Emp_Initials);
                    parameters.Add("@Emp_DesigId", model.Emp_DesigId);
                    parameters.Add("@Emp_DeptId", model.Emp_DeptId);
                    parameters.Add("@Emp_Address", model.Emp_Address);
                    parameters.Add("@Emp_Phone", model.Emp_Phone);
                    parameters.Add("@Emp_Mobile", model.Emp_Mobile);
                    parameters.Add("@Emp_Email", model.Emp_Email);
                    parameters.Add("@Emp_Doj", model.Emp_Doj);
                    parameters.Add("@Emp_Dob", model.Emp_Dob);
                    parameters.Add("@Emp_BasicSal", model.Emp_BasicSal);
                    parameters.Add("@Emp_PhotoPath", model.Emp_PhotoPath);
                    parameters.Add("@Emp_IsActive", model.Emp_IsActive);
                    parameters.Add("@Emp_IsOnVacation", model.Emp_IsOnVacation);
                    parameters.Add("@Emp_IqamaNo", model.Emp_IqamaNo);
                    parameters.Add("@Emp_IqamaIssueDate", model.Emp_IqamaIssueDate);
                    parameters.Add("@Emp_IqamaExpDate", model.Emp_IqamaExpDate);
                    parameters.Add("@Emp_IqamaPlace", model.Emp_IqamaPlace);
                    parameters.Add("@Emp_PassportNo", model.Emp_PassportNo);
                    parameters.Add("@Emp_CountryId", model.Emp_CountryId);
                    parameters.Add("@Emp_IsActiveUser", model.Emp_IsActiveUser);
                    parameters.Add("@Emp_LoginName", model.Emp_LoginName);
                    parameters.Add("@Emp_Pwd", model.Emp_Pwd);
                    parameters.Add("@Emp_IsLoggedIn", model.Emp_IsLoggedIn);
                    parameters.Add("@Emp_CreatedBy", model.Emp_CreatedBy);
                    parameters.Add("@Emp_UpdatedBy", model.Emp_UpdatedBy);
                    parameters.Add("@Emp_BrId", model.Emp_BrId);
                    parameters.Add("@Emp_IsAllowRetailOnly", model.Emp_IsAllowRetailOnly);

                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Employee_insert_Api]", parameters, CommandType.StoredProcedure);

                    var resultCode = parameters.Get<int>("@Result");

                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Branch record saved successfully.",
                            Id = resultCode
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Branch record was not saved successfully."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the branch record."
                    };
                }
            }

        }
    }
}
