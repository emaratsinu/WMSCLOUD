using G.ENTITY; // Ensure the correct namespace for your models
using G.ENTITY.G.ENTITY;
using G.SERVICE; // Ensure the correct namespace for your services
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GarageWebApi.Controllers
{
    [Produces("application/json")]
    [EnableCors("AllowCors")]
    public class DepartmentController: ControllerBase


    {

        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }


       

        [HttpGet]
        [Route("/api/GetDepartment")]
        public IActionResult GetDepartment(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _departmentService.GetDepartment(filterField, filterCondition, filterValue);

                if (result == null || !result.Any())
                {
                    return NotFound("No item units found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here if needed
                // For example: _logger.LogError(ex, "Error occurred while fetching item units.");
                return StatusCode(500, new { Error = ex.Message });
            }
        }


        [HttpGet]
        [Route("/api/GetNxtDepartmentCode")]

        public JsonResult GetNextDepartmentCode()
        {

            string code = "";
            try
            {
                code = _departmentService.GetNxtDepartmentCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtCountryCode = code
            });
        }



        [HttpGet]
        [Route("/api/GetDepartment_Id")]
        public JsonResult GetDepartment_id(int Dept_Id)
        {
            Department dept = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _departmentService.GetDepartment_id(Dept_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    dept.Dept_Id = result.Dept_Id;
                    dept.Dept_Code = result.Dept_Code;
                    dept.Dept_NameEn = result.Dept_NameEn;
                    dept.Dept_NameAr = result.Dept_NameAr;
                    dept.Dept_BusId = result.Dept_BusId;
                  
                }
                else
                {
                    return new JsonResult(null);  // Return null if no record is found
                }
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // Return a JSON response with an error message or status
                return new JsonResult(new { success = false, message = ex.Message });
            }

            // Return the PayType object as JSON
            return new JsonResult(dept);
        }




        [HttpPost]
        [Route("/api/SaveDepartment")]
        public ActionResult<DB_STATUS> SaveDepartment([FromBody] Department model)
        {
            try
            {
                // Check if the model is null or invalid
                if (model == null)
                {
                    return BadRequest(new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid model."
                    });
                }

                // Call the SavePrefix method from the service
                var result = _departmentService.SaveDepartment(model);

                // Check if the save operation was successful
                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                // Return success response
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception (optional)
                //_logger.LogError(ex, "An unexpected error occurred while saving the item prefix.");

                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred."
                });
            }
        }




        [HttpGet]
        [Route("/api/GetBusiness")]
        public IActionResult GetBusiness()
        {
            try
            {
                // Call the service with the correct parameters
                var result = _departmentService.GetBusiness();

                if (result == null || !result.Any())
                {
                    return NotFound("No item units found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here if needed
                // For example: _logger.LogError(ex, "Error occurred while fetching item units.");
                return StatusCode(500, new { Error = ex.Message });
            }
        }



        [HttpGet]
        [Route("/api/GetBusinessAll")]
        public IActionResult GetBusinessAll(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _departmentService.GetBusinessAll(filterField, filterCondition, filterValue);

                if (result == null || !result.Any())
                {
                    return NotFound("No business found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here if needed
                // For example: _logger.LogError(ex, "Error occurred while fetching item units.");
                return StatusCode(500, new { Error = ex.Message });
            }
        }





        [HttpGet]
        [Route("/api/GetNxtBusinessCode")]

        public JsonResult GetNextBusinessCode()
        {

            string code = "";
            try
            {
                code = _departmentService.GetNxtBusinessCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextBusinessCode = code
            });
        }





        [HttpPost]
        [Route("/api/SaveBusiness")]
        public ActionResult<DB_STATUS> SaveBusiness([FromBody] Business model)
        {
            try
            {
                // Check if the model is null or invalid
                if (model == null)
                {
                    return BadRequest(new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid model."
                    });
                }

                // Call the SavePrefix method from the service
                var result = _departmentService.SaveBusiness(model);

                // Check if the save operation was successful
                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                // Return success response
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception (optional)
                //_logger.LogError(ex, "An unexpected error occurred while saving the item prefix.");

                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred."
                });
            }
        }




        [HttpGet]
        [Route("/api/GetBusiness_Id")]
        public JsonResult GetBusiness_id(int Bus_Id)
        {
            Business bus = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _departmentService.GetBusiness_id(Bus_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    bus.Bus_Id = result.Bus_Id;
                    bus.Bus_Code = result.Bus_Code;
                    bus.Bus_NameEn = result.Bus_NameEn;
                    bus.Bus_NameAr = result.Bus_NameAr;
                 

                }
                else
                {
                    return new JsonResult(null);  // Return null if no record is found
                }
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                // Return a JSON response with an error message or status
                return new JsonResult(new { success = false, message = ex.Message });
            }

            // Return the PayType object as JSON
            return new JsonResult(bus);
        }





    }
}
