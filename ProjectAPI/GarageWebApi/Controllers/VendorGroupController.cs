using G.ENTITY;
using G.ENTITY.G.ENTITY;
using G.SERVICE;
using Microsoft.AspNetCore.Cors; 
using Microsoft.AspNetCore.Mvc;
using static G.SERVICE.ICarService;

namespace GarageWebApi.Controllers
{

    [Produces("application/json")]
    [EnableCors("AllowCors")]
    public class VendorGroupController:ControllerBase
    {
        private readonly IVendorGroupService _vendorGroupService;
        public VendorGroupController(IVendorGroupService branchAreaService)
        {
            _vendorGroupService = branchAreaService;
        }
        [HttpGet]
        [Route("/api/GetVendorGroup")]

        public JsonResult GetVendorGroup()
        {
            try
            {
                var result = _vendorGroupService.GetAll();
                List<VendorGroupResponse> list = new();

                if (result != null && result.Any())
                {
                    list = result.Select(b => new VendorGroupResponse
                    {
                        id = b.VendorG_Id,
                        code = b.VendorG_Code,
                        NameEn = b.VendorG_NameEn,
                        NameAr = b.VendorG_NameAr,
                        created_by = b.VendorG_CreatedBy
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
        [Route("/api/GetVendorGroups")]
        public IActionResult GetVendorGroup(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _vendorGroupService.GetVendorGroup(filterField, filterCondition, filterValue);

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
        [Route("/api/GetNextVendorGrpCode")]

        public JsonResult GetNextVendorGroupCode()
        {

            string code = "";
            try
            {
                code = _vendorGroupService.GetNextVendorGroupCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtVendorGrpCode = code
            });
        }




        [HttpPost]
        [Route("/api/SaveVendorGroup")]
        public ActionResult<DB_STATUS> SaveVendorGroup([FromBody] VendorGroup model)
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
                var result = _vendorGroupService.SaveVendorGroup(model);

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
        [Route("/api/GetVendorGroupById")]
        public JsonResult GetVendorGroupById(int VendorG_Id)
        {
            VendorGroup vendorGroup = new();  // Initialize an empty VendorGroup object

            try
            {
                // Call the service layer method to get the VendorGroup by ID
                var result = _vendorGroupService.GetVendorGrp_id(VendorG_Id);
                if (result != null)
                {
                    // Map the result to the VendorGroup entity
                    vendorGroup.VendorG_Id = result.VendorG_Id;
                    vendorGroup.VendorG_Code = result.VendorG_Code;
                    vendorGroup.VendorG_NameEn = result.VendorG_NameEn;
                    vendorGroup.VendorG_NameAr = result.VendorG_NameAr;
                    vendorGroup.VendorG_CreatedBy = result.VendorG_CreatedBy;
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

            // Return the VendorGroup object as JSON
            return new JsonResult(vendorGroup);
        }





        [HttpGet]
        [Route("/api/GetVendorLocation")]
        public IActionResult GetVendorLocation(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _vendorGroupService.GetVendorLocation(filterField, filterCondition, filterValue);

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






    }
}