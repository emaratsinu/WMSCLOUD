using G.ENTITY;
using G.ENTITY.G.ENTITY;
using G.SERVICE;
using GarageWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using static G.SERVICE.ICarService;
using static G.SERVICE.IEmployeeService;
using static G.SERVICE.IItemService;
namespace GarageWebApi.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("AllowCors")]

    public class CarController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly ICarService _carService;
        //private readonly IStringLocalizer<StatusMessages> _statusMessageLocalizer;
        public CarController(IConfiguration config, ICarService CarService, IStringLocalizer<StatusMessages> statusMessageLocalizer) : base(statusMessageLocalizer)
        {
            _config = config;
            _carService = CarService;

        }


        [HttpGet]
        [Route("/api/GetCarMake")]
        public IActionResult GetCarMake(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _carService.GetCarMake(filterField, filterCondition, filterValue);

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
        [Route("/api/GetCarMakeById")]
        public JsonResult GetCarMakeById(int Make_Id)
        {
            CarMake carMake = new();  // Initialize an empty CarMake object

            try
            {
                // Call the service layer method to get the car make by ID
                var result = _carService.GetCar_id(Make_Id);
                if (result != null)
                {
                    // Map the result to the CarMake entity
                    carMake.Make_Id = result.Make_Id;
                    carMake.Make_Code = result.Make_Code;
                    carMake.Make_NameEn = result.Make_NameEn;
                    carMake.Make_NameAr = result.Make_NameAr;
                    carMake.Make_CreatedBy = result.Make_CreatedBy;
                    carMake.Make_CreatedOn = result.Make_CreatedOn;
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

            return new JsonResult(carMake);  // Return the CarMake object as JSON
        }


        [HttpGet]
        [Route("/api/GetNxtCarMakeCode")]

        public JsonResult GetNxtCarMakeCode()
        {

            string code = "";
            try
            {
                code = _carService.GetNextCarMakeCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtCarmakeCode = code
            });
        }





        [HttpPost]
        [Route("/api/SaveCarmake")]
        public ActionResult<DB_STATUS> SaveCarMake([FromBody] CarMake_ins model)
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
                var result = _carService.Savecar(model);

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
        [Route("/api/GetCarModel")]
        public IActionResult GetCarModel(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _carService.GetCarModel(filterField, filterCondition, filterValue);

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
        [Route("/api/GetCarModelById")]
        public JsonResult GetCarModelById(int Model_Id)
        {
            CarModel carModel = new();  // Initialize an empty CarMake object

            try
            {
                // Call the service layer method to get the car make by ID
                var result = _carService.GetCarModel_id(Model_Id);
                if (result != null)
                {
                    // Map the result to the CarMake entity
                    carModel.Model_Id = result.Model_Id;
                    carModel.Model_Code = result.Model_Code;
                    carModel.Model_NameEn = result.Model_NameEn;
                    carModel.Model_NameAr = result.Model_NameAr;
                    carModel.Model_MakeId = result.Model_MakeId;
                    carModel.Model_CreatedBy = result.Model_CreatedBy;
                    carModel.Model_CreatedOn = result.Model_CreatedOn;
                    carModel.Model_UpdatedOn = result.Model_UpdatedOn;

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

            return new JsonResult(carModel);  // Return the CarMake object as JSON
        }




        [HttpGet]
        [Route("/api/GetNxtCarModelCode")]

        public JsonResult GetNxtCarModelCode()
        {

            string code = "";
            try
            {
                code = _carService.GetNextCarModelCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtCarmodelCode = code
            });
        }


         [HttpPost]
        [Route("/api/SavecarModel")]
        public ActionResult<DB_STATUS> SavecarModel([FromBody] CarModel_ins model)
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
                var result = _carService.SavecarModel(model);

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
        [Route("/api/GetPayType")]
        public IActionResult GetPayType(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _carService.GetPayType(filterField, filterCondition, filterValue);

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
        [Route("/api/GetPayTypeById")]
        public JsonResult GetPayTypeById(int PayType_Id)
        {
            PayType payType = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _carService.GetPayType_id(PayType_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    payType.PayType_Id = result.PayType_Id;
                    payType.PayType_Code = result.PayType_Code;
                    payType.PayType_NameEn = result.PayType_NameEn;
                    payType.PayType_NameAr = result.PayType_NameAr;
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
            return new JsonResult(payType);
        }

        [HttpPost]
        [Route("/api/SavePayType")]
        public ActionResult<DB_STATUS> SavePayType([FromBody] PayType model)
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
                var result = _carService.SavePayType(model);

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
        [Route("/api/GetNxtCarPayCode")]

        public JsonResult GetNxtCarPayCode()
        {

            string code = "";
            try
            {
                code = _carService.GetNextPayCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtCarPayCode = code
            });
        }



        [HttpGet]
        [Route("/api/GetCurrency")]
        public IActionResult GetCurrency(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _carService.GetCurrency(filterField, filterCondition, filterValue);

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
        [Route("/api/GetNxtCurrencyCode")]

        public JsonResult GetNextCurrencycode()
        {

            string code = "";
            try
            {
                code = _carService.GetNxtCurrencyCode();
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
        [Route("/api/GetCurrency_id")]
        public JsonResult GetCurrency_id(int Curr_Id)
        {
            Currency currency = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _carService.GetCurrency_id(Curr_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    currency.Curr_Id = result.Curr_Id;
                    currency.Curr_Code = result.Curr_Code;
                    currency.Curr_ShortCode = result.Curr_ShortCode;
                    currency.Curr_Desc = result.Curr_Desc;
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
            return new JsonResult(currency);
        }




        [HttpPost]
        [Route("/api/SaveCurrency")]
        public ActionResult<DB_STATUS> SaveCurrency([FromBody] Currency model)
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
                var result = _carService.SaveCurrency(model);

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
        [Route("/api/GetCountryList")]
        public IActionResult GetCountries(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _carService.GetCountries(filterField, filterCondition, filterValue);

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
        [Route("/api/GetCountry_id")]
        public JsonResult GetCountries_id(int Country_Id)
        {
            Country_List currency = new();  // Initialize an empty PayType object

            try
            {
                // Call the service layer method to get the PayType by ID
                var result = _carService.GetCountries_id(Country_Id);
                if (result != null)
                {
                    // Map the result to the PayType entity
                    currency.Country_Id = result.Country_Id;
                    currency.Country_Code = result.Country_Code;
                    currency.Country_NameEn = result.Country_NameEn;
                    currency.Country_NameAr = result.Country_NameAr;
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
            return new JsonResult(currency);
        }




        [HttpGet]
        [Route("/api/GetNxtCountryCode")]

        public JsonResult GetNextCountrycode()
        {

            string code = "";
            try
            {
                code = _carService.GetNxtCountryCode();
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



        [HttpPost]
        [Route("/api/SaveCountry")]
        public ActionResult<DB_STATUS> SaveCountry([FromBody] Country_List model)
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
                var result = _carService.SaveCountry(model);

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
