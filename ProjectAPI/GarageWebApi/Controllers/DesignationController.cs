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
    public class DesignationController: ControllerBase


    {


        private readonly IDesignationService _designationService;

        public DesignationController(IDesignationService designationService)
        {
            _designationService = designationService;
        }

        [HttpGet]
        [Route("/api/GetDesignation")]
        public IActionResult GetDesignation(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _designationService.GetDesignation(filterField, filterCondition, filterValue);

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
        [Route("/api/GetDesignationNextCode")]

        public JsonResult GetDesignationNextCode()
        {

            string code = "";
            try
            {
                code = _designationService.GetNxtDesignationCode();
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
        [Route("/api/Designation_id")]
        public JsonResult GetDesignation_id(int Desig_Id)
        {
            Designation Designation = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _designationService.GetDesignation_id(Desig_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    Designation.Desig_Id = result.Desig_Id;
                    Designation.Desig_Code = result.Desig_Code;
                    Designation.Desig_NameEn = result.Desig_NameEn;
                    Designation.Desig_NameAr = result.Desig_NameAr;
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
            return new JsonResult(Designation);
        }




        [HttpPost]
        [Route("/api/SaveDesignation")]
        public ActionResult<DB_STATUS> SaveDesignation([FromBody] Designation model)
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
                var result = _designationService.SaveDesignation(model);

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










       
    }
}
