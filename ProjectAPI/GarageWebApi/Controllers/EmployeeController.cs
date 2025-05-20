using G.ENTITY;
using G.SERVICE;
using GarageWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace GarageWebApi.Controllers


{

    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("AllowCors")]

    public class EmployeeController:BaseController
    {

        private readonly IConfiguration _config;
        private readonly IEmployeeService _employeeService;
        //private readonly IStringLocalizer<StatusMessages> _statusMessageLocalizer;
        public EmployeeController(IConfiguration config, IEmployeeService employeeService, IStringLocalizer<StatusMessages> statusMessageLocalizer) : base(statusMessageLocalizer)
        {
            _config = config;
            _employeeService = employeeService;

        }




        [HttpGet]
        public ActionResult<IEnumerable<Employee_Main>> GetAllEmployee()
        {
            try
            {
                var Employees = _employeeService.GetAllEmployee();
                return Ok(Employees);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
            }
        }
        [HttpGet]
        [Route("/api/GetEmployeeById")]

        public JsonResult GetEmployee(int Emp_id)
        {
            Employee_Main employee = new();
            try
            {
                var result = _employeeService.Get(Emp_id);
                if (result != null)
                {
                    // Map the result to BranchModelResponse
                    employee.Emp_Id = result.Emp_Id;
                    employee.Emp_Code = result.Emp_Code;
                    employee.Emp_MainCode = result.Emp_MainCode;
                    employee.Emp_NameEn = result.Emp_NameEn;
                    employee.Emp_NameAr = result.Emp_NameAr;
                    employee.Emp_Initials = result.Emp_Initials;
                    employee.Emp_DesigId = result.Emp_DesigId;
                    employee.Emp_DeptId = result.Emp_DeptId;
                    employee.Emp_Address = result.Emp_Address;
                    employee.Emp_Phone = result.Emp_Phone;
                    employee.Emp_Mobile = result.Emp_Mobile;
                    employee.Emp_Email = result.Emp_Email;
                    employee.Emp_Doj = result.Emp_Doj;
                    employee.Emp_Dob = result.Emp_Dob;
                    employee.Emp_BasicSal = result.Emp_BasicSal;
                    employee.Emp_PhotoPath = result.Emp_PhotoPath;
                    employee.Emp_IsActive = result.Emp_IsActive;
                    employee.Emp_IsOnVacation = result.Emp_IsOnVacation;
                    employee.Emp_IqamaNo = result.Emp_IqamaNo;
                    employee.Emp_IqamaIssueDate = result.Emp_IqamaIssueDate;
                    employee.Emp_IqamaExpDate = result.Emp_IqamaExpDate;
                    employee.Emp_IqamaPlace = result.Emp_IqamaPlace;
                    employee.Emp_PassportNo = result.Emp_PassportNo;
                    employee.Emp_CountryId = result.Emp_CountryId;
                    employee.Emp_IsActiveUser = result.Emp_IsActiveUser;
                    employee.Emp_LoginName = result.Emp_LoginName;
                    employee.Emp_Pwd = result.Emp_Pwd;
                    employee.Emp_IsLoggedIn = result.Emp_IsLoggedIn;
                    employee.Emp_CreatedBy = result.Emp_CreatedBy;
                    employee.Emp_CreatedOn = result.Emp_CreatedOn;
                    employee.Emp_UpdatedBy = result.Emp_UpdatedBy;
                    employee.Emp_UpdatedOn = result.Emp_UpdatedOn;
                    employee.Emp_BrId = result.Emp_BrId;
                    employee.Emp_IsAllowRetailOnly = result.Emp_IsAllowRetailOnly;
                }
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(employee);
        }






        [HttpGet]
        [Route("/api/GetEmployeeDesignation")]
        public ActionResult<IEnumerable<Employee_Designation>> GetEmployee_Designations()
        {
            try
            {
                var Employees = _employeeService.GetEmployee_Designations();
                return Ok(Employees);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
            }
        }




        [HttpGet]
        [Route("/api/GetEmpDept")]
        public ActionResult<IEnumerable<Employee_Department>> GetEmployee_Dept()
        {
            try
            {
                var Employees = _employeeService.GetEmployee_Dept();
                return Ok(Employees);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
            }
        }




        [HttpGet]
        [Route("/api/GetNextEmployeeCode")]

        public JsonResult GetNextEmployeeCode()
        {

            string code = "";
            try
            {
                code = _employeeService.GetNextEmployeeCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextEmpCode = code
            });
        }




        [HttpGet]
        [Route("/api/GetNextEmployeeCodeMain")]

        public JsonResult GetNextEmpMainCode()
        {

            string code = "";
            try
            {
                code = _employeeService.GetNextEmpMainCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextEmpMainCode = code
            });
        }






        [HttpPost]
        [Route("SaveEmployee")]
        public ActionResult<DB_STATUS> Save([FromBody] Employee_Main model)
        {
            try
            {
                // Check if model is null or has required properties
                if (model == null)
                {
                    return BadRequest("Invalid model");
                }

                // Create a new Employee object from the model
                Employee_Main employee = new Employee_Main
                {
                    Emp_Id = model.Emp_Id, // Make sure Emp_Id exists in Employee class
                    Emp_Code = model.Emp_Code,
                    Emp_MainCode = model.Emp_MainCode,
                    Emp_NameEn = model.Emp_NameEn,
                    Emp_NameAr = model.Emp_NameAr,
                    Emp_Initials = model.Emp_Initials,
                    Emp_DesigId = model.Emp_DesigId,
                    Emp_DeptId = model.Emp_DeptId,
                    Emp_Address = model.Emp_Address,
                    Emp_Phone = model.Emp_Phone,
                    Emp_Mobile = model.Emp_Mobile,
                    Emp_Email = model.Emp_Email,
                    Emp_Doj = model.Emp_Doj,
                    Emp_Dob = model.Emp_Dob,
                    Emp_BasicSal = model.Emp_BasicSal,
                    Emp_PhotoPath = model.Emp_PhotoPath,
                    Emp_IsActive = model.Emp_IsActive,
                    Emp_IsOnVacation = model.Emp_IsOnVacation,
                    Emp_IqamaNo = model.Emp_IqamaNo,
                    Emp_IqamaIssueDate = model.Emp_IqamaIssueDate,
                    Emp_IqamaExpDate = model.Emp_IqamaExpDate,
                    Emp_IqamaPlace = model.Emp_IqamaPlace,
                    Emp_PassportNo = model.Emp_PassportNo,
                    Emp_CountryId = model.Emp_CountryId,
                    Emp_IsActiveUser = model.Emp_IsActiveUser,
                    Emp_LoginName = model.Emp_LoginName,
                    Emp_Pwd = model.Emp_Pwd,
                    Emp_IsLoggedIn = model.Emp_IsLoggedIn,
                    Emp_CreatedBy = model.Emp_CreatedBy,
                    Emp_UpdatedBy = model.Emp_UpdatedBy,
                    Emp_BrId = model.Emp_BrId,
                    Emp_IsAllowRetailOnly = model.Emp_IsAllowRetailOnly
                };

                // Call the Save method from the service
                var result = _employeeService.Save(employee);

                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception
                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS { Status = "Failure", Success = false, StatusMessage = "An unexpected error occurred." });
            }
        }


        [HttpGet]
        [Route("/api/GetCountries")]
        public ActionResult<IEnumerable<Country>> GetEmployee_Country()
        {
            try
            {
                var Employees = _employeeService.GetEmployee_Country();
                return Ok(Employees);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving .");
            }
        }





    }
}
