using Dapper;
using G.ENTITY; // Ensure the correct namespace for your models
using G.ENTITY.G.ENTITY;
using G.REPOSITORY;
using G.SERVICE; // Ensure the correct namespace for your services
using GarageWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using static G.SERVICE.ICarService;
using static G.SERVICE.ISalesService;



namespace GarageWebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("AllowCors")]
    public class CardController:BaseController
    {

        private readonly IConfiguration _config;
        private readonly ICardService _cardService;
        //private readonly IStringLocalizer<StatusMessages> _statusMessageLocalizer;
        public CardController(IConfiguration config, ICardService cardService, IStringLocalizer<StatusMessages> statusMessageLocalizer) : base(statusMessageLocalizer)
        {
            _config = config;
            _cardService = cardService;
        }




        [HttpGet]
        [Route("/api/GetCardCustomerDtl")]  // ✅ Fixed route syntax
        public IActionResult GetCardCustomerDtl(
   int? COwner_Id = null, string? COwner_Code = null, string? COwner_NameEn = null,
   string? COwner_NameAr = null, string? COwner_OwnerNameEn = null, string? COwner_OwnerNameAr = null,
   string? COwner_ContactNo = null, string? Card_CarPlateEn = null, string? Card_CarPlateAr = null,int ? Make_Id=null,
   string? Make_NameEn = null, string? Make_NameAr = null, int? Model_Id=null,  string? Model_NameEn = null,
   string? Model_NameAr = null)
        {
            try
            {
                // Call service with properly mapped parameters
                var result = _cardService.GetCardCustomers(
                    COwner_Id, COwner_Code, COwner_NameEn, COwner_NameAr,
                    COwner_OwnerNameEn, COwner_OwnerNameAr, COwner_ContactNo,
                    Card_CarPlateEn, Card_CarPlateAr, Make_Id,Make_NameEn, Make_NameAr,Model_Id,
                    Model_NameEn, Model_NameAr);

                if (result == null || !result.Any())
                {
                    return NotFound("No card customers found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception (ex) if needed
                return StatusCode(500, new { Error = ex.Message });
            }
        }


        [HttpGet]
        [Route("/api/GetCardCustomerPagination")]
        public IActionResult GetCardCustomersPaginated([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filterField = null, [FromQuery] string? filterCondition = null, [FromQuery] string? filterValue = null)

        {
            try
            {
                // Validate page size and number
                if (pageNumber < 1 || pageSize < 1)
                {
                    return BadRequest(new { Error = "Page number and page size must be greater than zero." });
                }

                // Call the service method with filtering parameters
                var result = _cardService.GetCardCustomerPaginated(
                    pageNumber, pageSize, filterField, filterCondition, filterValue
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }




        [HttpGet]
        [Route("/api/JobOrdrTypes")]
        public IActionResult GetJobOrdrType()
        {
            try
            {
                // Call the service with the correct parameters
                var result = _cardService.GetJobOrderTypes();

                if (result == null || !result.Any())
                {
                    return NotFound("No job order type  found.");
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
        [Route("/api/GetNxtCardCode")]

        public JsonResult GetNxtCardCode()
        {

            string code = "";
            try
            {
                code = _cardService.GetNxtCardCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtCardCode = code
            });
        }




        [HttpGet]
        [Route("/api/JobOrdrStatus")]
        public IActionResult GetJobOrdrStatus()
        {
            try
            {
                // Call the service with the correct parameters
                var result = _cardService.GetJobOrderStatus();

                if (result == null || !result.Any())
                {
                    return NotFound("No job order type  found.");
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
        [Route("/api/GetCardEmployeePagination")]
        public IActionResult GetCardEMployeePaginated([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filterField = null, [FromQuery] string? filterCondition = null, [FromQuery] string? filterValue = null)

        {
            try
            {
                // Validate page size and number
                if (pageNumber < 1 || pageSize < 1)
                {
                    return BadRequest(new { Error = "Page number and page size must be greater than zero." });
                }

                // Call the service method with filtering parameters
                var result = _cardService.GetCardEmployeesPaginated(
                    pageNumber, pageSize, filterField, filterCondition, filterValue
                );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }




        [HttpGet]
        [Route("/api/GetCardMechGroups")]
        public IActionResult GetCardMechGrp(int BrId, int Criteria, int? MechGrpId = null)
        {
            try
            {
                // Fetch data using service
                var result = _cardService.GetMechGroup(BrId, Criteria, MechGrpId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }





        [HttpGet]
        [Route("/api/GetCardDetailPagination")]
        public IActionResult GetCardDetailPaginated(
            [FromQuery] byte cr,
            [FromQuery] int? brId = null,
            [FromQuery] bool? jOrderStatus = null,
            [FromQuery] long? jobOrderId = null,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? filterField = null,
            [FromQuery] string? filterCondition = null,
            [FromQuery] string? filterValue = null)
        {
            try
            {
                // Validate page size and number
                if (pageNumber < 1 || pageSize < 1)
                {
                    return BadRequest(new { Error = "Page number and page size must be greater than zero." });
                }

                // Call the service method with filtering parameters
                int totalCount;
                var result = _cardService.GetCarddetailsrPaginated(
                    cr, brId, jOrderStatus, jobOrderId, pageNumber, pageSize, out totalCount, filterField, filterCondition, filterValue
                );

                return Ok(new { Items = result, TotalCount = totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }




        //[HttpGet]
        //[Route("/api/FetchNextCGenNumber")]
        //public IActionResult GetCgenNumber( int brId,  string cardStatusCode)
        //{
        //    try
        //    {
              
        //        var result = _cardService.GetNextCGenNumber(brId, cardStatusCode);

              
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception if logging is configured
             

        //        return StatusCode(500, new { Error = "An error occurred while processing your request." });
        //    }
        //}





      



        [HttpGet]
        [Route("/api/FetchNextCGenNumber")]
        public IActionResult GetCgenNumber(int brId, string cardStatusCode)
       
        
        {
            try
            {
                // Fetch data using service with filtering parameters
                var result = _cardService.GetNextCGenNumber(brId, cardStatusCode);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }









        [HttpGet]
        [Route("/api/FetchNextLabourCode")]

        public JsonResult GetNextLabourCode()
        {

            string code = "";
            try
            {
                code = _cardService.GetNextLabourCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtlabourCode = code
            });
        }




        [HttpGet]
        [Route("/api/FetchNextOldPartCode")]

        public JsonResult GetNextOldPartCode()
        {

            string code = "";
            try
            {
                code = _cardService.GetNxtCardCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtoldpartCode = code
            });
        }



        [HttpGet]
        [Route("/api/GetCardlabourDetails")]
        public IActionResult GetLabourDetails(int criteria, long? lbDet_CardId = null, int? lbDet_IsCancelled = null, long? lbDet_Id = null, short? lbDet_MechId = null)
        {
            try
            {
                // Fetch data using service
                var result = _cardService.GetLabourDetails(criteria, lbDet_CardId, lbDet_IsCancelled, lbDet_Id, lbDet_MechId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }






        [HttpGet]
        [Route("/api/GetCardlabourGrpJobs")]
        public IActionResult GetLabourGrpJob(int LGrp_ParentId, int Criteria, string? filterField = null, string? filterCondition = null, string? filterValue = null)
       {
            try
            {
                // Fetch data using service with filtering parameters
                var result = _cardService.GetLabourGrpJobs(LGrp_ParentId, Criteria, filterField, filterCondition, filterValue);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }





        [HttpGet]
        [Route("/api/GetCardlabourGrpJobs2")]
        public IActionResult GetLabourGrpJob2( string? filterField = null, string? filterCondition = null, string? filterValue = null)
        {
            try
            {
                // Fetch data using service with filtering parameters
                var result = _cardService.GetLabourGrpJobs2( filterField, filterCondition, filterValue);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching data.",
                    Details = ex.Message
                });
            }
        }







        [HttpGet]
        [Route("/api/GetMitchelTime")]
        public IActionResult GetMitchelTime(int carModelId, int lGrpId)
        {
            try
            {
                // Fetch data using service with correct parameters
                var result = _cardService.GetMitchelTime(carModelId, lGrpId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching Mitchell time data.",
                    Details = ex.Message
                });
            }
        }






        [HttpPost]
        [Route("/api/SavelabourDetails")]
        public ActionResult<DB_STATUS> SaveLabourDetails([FromBody] LabourDetail model)
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
                var result = _cardService.SaveLabourDetails(model);

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
        [Route("/api/GetLabourStatusHead")]
        public IActionResult GetLabourStatusHead()
        {
            try
            {
                // Fetch data using service with correct parameters
                var result = _cardService.GetLabourStatusHead();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching Mitchell time data.",
                    Details = ex.Message
                });
            }
        }



        [HttpGet]
        [Route("/api/GetLabourStatusDetail")]
        public IActionResult GetLabourStatusDetail([FromQuery] int Criteria, [FromQuery] int? LbStatDet_HeadId)
        {
            try
            {
                // Fetch data using the service and pass parameters
                var result = _cardService.GetLabourStatusDetails(Criteria, LbStatDet_HeadId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching Labour Status Data.",
                    Details = ex.Message
                });
            }
        }



        [HttpPost]
        [Route("/api/SaveCardMain")]
        public ActionResult<DB_STATUS> SaveCardmain([FromBody] JobOrder model)
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
                var result = _cardService.SaveCardMain(model);

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





        [HttpPost]
        [Route("/api/SaveLabourCommission")]
        public ActionResult<DB_STATUS> SaveLabourCommission([FromBody] LabourCommissionRequest model)
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
                var result = _cardService.SaveLabourCommission(model);

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





        [HttpPost]
        [Route("/api/UpdateCardStatus")]
        public ActionResult<DB_STATUS> UpdateCardStatus([FromBody] UpdateCardStatusRequest model)
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
                var result = _cardService.UpdateCardStatus(model);

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
        [Route("/api/JobOrdrStatusById")]
        public IActionResult GetJobOrdrStatusById([FromQuery] int statusid)
        {
            try
            {
                var result = _cardService.GetJobOrderStatus_ById(statusid);

                if (result == null || !result.Any())
                {
                    return NotFound("No job order status found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }




        [HttpPost]
        [Route("/api/SaveCommissionAllLabour")]
        public ActionResult<DB_STATUS> SaveCommissionAllLabour([FromBody] InsertLabourCommission model)
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
                var result = _cardService.SaveCommissionAllLabour(model);

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
        [Route("/api/GetSavedCardId")]

        public JsonResult GetCardId(string CardCode, int BranchId)
        {

            string code = "";
            try
            {
                code = _cardService.GetCardId(CardCode , BranchId );
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                SavedCardId = code
            });
        }





        [HttpGet]
        [Route("/api/GetOldParts")]
        public IActionResult GetOldParts(int Criteria, long? COld_CardId = null, int? COld_IsReturned = null, long? COld_Id = null)
        {
            try
            {
                // Fetch data using service with correct parameters
                var result = _cardService.GetOldParts(Criteria, COld_CardId, COld_IsReturned, COld_Id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching Mitchell time data.",
                    Details = ex.Message
                });
            }
        }








        [HttpGet]
        [Route("/api/GetStoreParts")]
        public IActionResult GetStoreParts(long SaJobcardid, int SaBrId)
        {
            try
            {
                // Fetch data using service with correct parameters
                var result = _cardService.GetStoreParts(SaJobcardid, SaBrId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching Mitchell time data.",
                    Details = ex.Message
                });
            }
        }





        [HttpGet]
        [Route("/api/GetOutsideParts")]
        public IActionResult GetOutsideParts(long Card_Id, int Br_Id, int IsReturned)
        {
            try
            {
                // Fetch data using service with correct parameters
                var result = _cardService.GetOutsideParts(Card_Id, Br_Id, IsReturned);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching Mitchell time data.",
                    Details = ex.Message
                });
            }
        }





        [HttpGet]
        [Route("/api/GetCustParts")]
        public IActionResult GetCustParts(long CPart_CardId, int CPart_IsReturned, int criteria)
        {
            try
            {
                // Fetch data using service with correct parameters
                var result = _cardService.GetCustPartDetails(CPart_CardId, CPart_IsReturned, criteria);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching Mitchell time data.",
                    Details = ex.Message
                });
            }
        }



        [HttpGet]
        [Route("/api/GetJobOrdrNetAmt")]
        public IActionResult GetJobOrdrNetAmt(long Card_Id, int Br_Id)
        {
            try
            {
                // Fetch data using the correct service method
                var result = _cardService.GetJobOrderNetAmts(Card_Id, Br_Id);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Error = "An internal error occurred while fetching job order net amounts.",
                    Details = ex.Message
                });
            }
        }






        [HttpPost]
        [Route("/api/SaveOldParts")]
        public ActionResult<DB_STATUS> SaveOldparts([FromBody] CardOldPartModel model)
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
                var result = _cardService.SaveOldParts(model);

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
        [Route("/api/NextOldPartCode")]

        public JsonResult GetNextOldPrtCode()
        {

            string code = "";
            try
            {
                code = _cardService.GetNextOldPartCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtOldPartCode = code
            });
        }



        [HttpPost]
        [Route("/api/SaveCustParts")]
        public ActionResult<DB_STATUS> SaveCustparts([FromBody] CustomerPartDto model)
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
                var result = _cardService.SaveCustparts(model);

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
        [Route("/api/NextCustCode")]

        public JsonResult GetNextCustCode()
        {

            string code = "";
            try
            {
                code = _cardService.GetNxtCustCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtCustCode = code
            });
        }

    }
}

