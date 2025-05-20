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
    public class BranchTypesController : ControllerBase
    {
        private readonly IBranchTypeService _branchTypeService;

        public BranchTypesController(IBranchTypeService branchTypeService)
        {
            _branchTypeService = branchTypeService;
        }

        [HttpGet]
        [Route("/api/GetBranchType")]
        
        public JsonResult  GetBranchTypes()
        {
            try
            {
                var result = _branchTypeService.GetAll();
                List<BranchTypeResponseModel> list = new();

                if (result != null && result.Any())
                {
                    list = result.Select(b => new BranchTypeResponseModel
                    {
                        Id = b.BrType_Id,
                        Code = b.BrType_Code,
                        Name_En = b.BrType_NameEn,
                        Name_Ar = b.BrType_NameAr
                    }).ToList();
                }

                return new JsonResult(list);
            }
            catch (Exception ex)
            {
              //  ErrorLoggingHelper.LogException(ex);
                return new JsonResult(null);
            }
        }


        [HttpGet]
        [Route("/api/GetBranchTypes")]
        public IActionResult GetBranchType(string filterField = null, string filterCondition = null, string filterValue = null)
      {
            try
            {
                // Call the service with the correct parameters
                var result = _branchTypeService.GetBranchType(filterField, filterCondition, filterValue);

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
        [Route("/api/GetNxtBranchTypeCode")]

        public JsonResult GetNextBranchAreacode()
        {

            string code = "";
            try
            {
                code = _branchTypeService.GetNxtBranchTypeCode();
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
        [Route("/api/GetBranchType_Id")]
        public JsonResult GetBranchArea_id(int BrType_Id)
        {
            BranchType branchType = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _branchTypeService.GetBranchType_id(BrType_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    branchType.BrType_Id = result.BrType_Id;
                    branchType.BrType_Code = result.BrType_Code;
                    branchType.BrType_NameEn = result.BrType_NameEn;
                    branchType.BrType_NameAr = result.BrType_NameAr;
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
            return new JsonResult(branchType);
        }




        [HttpPost]
        [Route("/api/SaveBranchType")]
        public ActionResult<DB_STATUS> SaveBranchType([FromBody] BranchType model)
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
                var result = _branchTypeService.SaveBranchType(model);

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
