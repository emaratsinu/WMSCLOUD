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

namespace GarageWebApi.Controllers
{
    [Produces("application/json")]
    [EnableCors("AllowCors")]

    [Route("api/[controller]")]

    [ApiController]
   
    public class SalesController : BaseController
    {

        private readonly IConfiguration _config;
        private readonly ISalesService _salesService;



        public SalesController(IConfiguration config, ISalesService salesService, IStringLocalizer<StatusMessages> statusMessageLocalizer)
     : base(statusMessageLocalizer)
        {
            _config = config;
            _salesService = salesService ?? throw new ArgumentNullException(nameof(salesService));
        }






        [HttpPost] // Changed to POST since we're sending a request body
        [Route("Check_SrlStatuss")]
        public IActionResult CheckSrlsts([FromBody] SerialCheckRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Invalid request data.");
                }

                // Call the service with the request data
                var result = _salesService.Check_SrlStatus(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception if needed
                return StatusCode(500, new { Error = ex.Message });
            }
        }



        [HttpGet]
        [Route("GetParentChildSerials")]
        public IActionResult GetChildsrls(string serialNo, int resType = 0, int level = 0)
        
            {
            try
            {
                // Call the service with the correct parameters
                var result = _salesService.GetParentChildSerials(serialNo, resType, level);

                if (result == null || !result.Any())
                {
                    return NotFound("No Srls found.");
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



        [HttpPost]
        [Route("/api/SaveLogPendingSrl")]
        public ActionResult<DB_STATUS> SaveLogPendingSrls([FromBody] SerialLogRequest model)
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
                var result = _salesService.SaveLogPendingSrls(model);

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
        [Route("/api/GetNxtSaleCode")]

        public JsonResult GetNxtSaleCode()
        {

            string code = "";
            try
            {
                code = _salesService.GetNxtSalesCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtSalesCode = code
            });
        }






        [HttpGet]
        [Route("/api/GetSalesList")]
        public IActionResult GetSaleslist()
        {
            try
            {
                // Call the service with the correct parameters
                var result = _salesService.GetSalesList();

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
        [Route("/api/GetCustomerList")]
        public IActionResult GetCustomerlist()
        {
            try
            {
                // Call the service with the correct parameters
                var result = _salesService.GetCustomers();

                if (result == null || !result.Any())
                {
                    return NotFound("No Customers found.");
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




        [HttpPost]
        [Route("/api/SaveSuspectedSrl")]
        public ActionResult<DB_STATUS> SaveSuspectedSrls([FromBody] SuspectedSerialDto model)
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
                var result = _salesService.SaveSuspectedSrls(model);

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
        [Route("/api/GetSalesVatDetails")]
        public JsonResult GetSalesVatdet(int itemcode)
        {
            VatDetails vat = new();  // Initialize an empty CarMake object

            try
            {
                // Call the service layer method to get the car make by ID
                var result = _salesService.GetSalesVatDet(itemcode);
                if (result != null)
                {
                    // Map the result to the CarMake entity
                   vat.Id = result.Id;
                    vat.Code = result.Code;
                    vat.NameEn = result.NameEn;
                    vat.NameAr = result.NameAr;
                    vat.TaxPerc = result.TaxPerc;
                    
                }
                else
                {
                    return new JsonResult(null);  // Return null if no record is found
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions and return null
                return new JsonResult(null);
            }

            return new JsonResult(vat);  // Return the CarMake object as JSON
        }






[HttpPost]
[Route("api/SaveSalesinvoice")]
public ActionResult<DB_STATUS> SaveSalesinvoice([FromBody] SalesInvoiceDto model)
{
    try
    {
        // Validate the model
        if (model == null)
        {
            return BadRequest(new DB_STATUS
            {
                Status = "Failure",
                Success = false,
                StatusMessage = "Invalid model."
            });
        }

        // Convert SalesDetail and SerialDetail lists into DataTable
        DataTable transferDet = ConvertToDataTable(model.SalesDetail);
        DataTable allRowsSl = ConvertToDataTable(model.SerialDetail);

        // Declare output parameters
        string resultStatus;
        string resultMessage;

        // Call the service method to insert the sales invoice
        var result = _salesService.InsertSalesInvoiceAsync(model, transferDet, allRowsSl, out resultStatus, out resultMessage);

        // Handle response
        if (result == null || result.Status == "Failure")
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
            {
                Status = "Failure",
                Success = false,
                StatusMessage = resultMessage
            });
        }

        // Return success response
        return Ok(new DB_STATUS
        {
            Status = "Success",
            Success = true,
            StatusMessage = resultMessage
        });
    }
    catch (Exception ex)
    {
        // Log exception (optional)
        //_logger.LogError(ex, "An unexpected error occurred while saving the sales invoice.");

        return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
        {
            Status = "Failure",
            Success = false,
            StatusMessage = "An unexpected error occurred."
        });
    }
}

/// <summary>
/// Converts a list of objects into a DataTable.
/// </summary>
private DataTable ConvertToDataTable<T>(List<T> data)
{
    DataTable table = new DataTable(typeof(T).Name);

    if (data == null || !data.Any())
        return table;

    // Get all properties of the type
    var properties = typeof(T).GetProperties();

    // Create table columns
    foreach (var prop in properties)
    {
        table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
    }

    // Populate rows
    foreach (var item in data)
    {
        var values = properties.Select(p => p.GetValue(item) ?? DBNull.Value).ToArray();
        table.Rows.Add(values);
    }

    return table;
}



        



        [HttpGet]
        [Route("/api/GetSalesinvoiceSrlDtls")]
        public IActionResult GetSalesInvoiceSrlDtls(int Sa_No)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _salesService.GetInvoiceSrls(Sa_No);

                if (result == null || !result.Any())
                {
                    return NotFound("No srls found.");
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
        [Route("/api/GetCardInvNo")]
        public IActionResult GetCardInv()
        {
            try
            {
                // Call the service layer method to get the card invoice
                var result = _salesService.CardInvoice();

                if (result == null || !result.Any())
                {
                    return NotFound("No card invoices found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"Error fetching card invoices: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching data.");
            }
        }






    }





}
