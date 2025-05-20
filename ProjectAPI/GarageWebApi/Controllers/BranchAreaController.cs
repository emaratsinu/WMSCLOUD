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
using static G.SERVICE.ICarService;





namespace GarageWebApi.Controllers
{
    [Produces("application/json")]
    [EnableCors("AllowCors")]
    public class BranchAreaController : ControllerBase
    {
        private readonly IBranchAreaService _branchAreaService;

        public BranchAreaController(IBranchAreaService branchAreaService)
        {
            _branchAreaService = branchAreaService;
        }



        [HttpGet]
        [Route("/api/GetBranchArea")]
        public IActionResult GetCurrency(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _branchAreaService.GetBranchArea(filterField, filterCondition, filterValue);

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
        [Route("/api/GetNxtBranchAreaCode")]

        public JsonResult GetNextBranchAreacode()
        {

            string code = "";
            try
            {
                code = _branchAreaService.GetNxtBranchAreaCode();
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
        [Route("/api/GetBranchArea_Id")]
        public JsonResult GetBranchArea_id(int Area_Id)
        {
            BranchArea branchArea = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _branchAreaService.GetBranchArea_id(Area_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    branchArea.Area_Id = result.Area_Id;
                    branchArea.Area_Code = result.Area_Code;
                    branchArea.Area_NameEn= result.Area_NameEn;
                    branchArea.Area_NameAr= result.Area_NameAr;
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
            return new JsonResult(branchArea);
        }




        [HttpPost]
        [Route("/api/SaveBranchArea")]
        public ActionResult<DB_STATUS> SaveBranchArea([FromBody] BranchArea model)
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
                var result = _branchAreaService.SaveBranchArea(model);

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










        //[HttpGet]
        //[Route("/api/GetBranchArea")]

        //public JsonResult GetBranchArea()
        //{
        //    try
        //    {
        //        var result = _branchAreaService.GetAll();
        //        List<BranchAreaResponseModel> list = new();

        //        if (result != null && result.Any())
        //        {
        //            list = result.Select(b => new BranchAreaResponseModel
        //            {
        //                Id = b.Area_Id,
        //                Code = b.Area_Code,
        //                Name_En = b.Area_NameEn,
        //                Name_Ar = b.Area_NameAr
        //            }).ToList();
        //        }

        //        return new JsonResult(list);
        //    }
        //    catch (Exception ex)
        //    {
        //        //  ErrorLoggingHelper.LogException(ex);
        //        return new JsonResult(null);
        //    }
        //}
    }
}
