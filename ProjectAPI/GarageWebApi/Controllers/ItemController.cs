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
namespace GarageWebApi.Controllers
{


    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("AllowCors")]
    public class ItemController : BaseController
    {

        private readonly IConfiguration _config;
        private readonly IItemService _itemService;
        //private readonly IStringLocalizer<StatusMessages> _statusMessageLocalizer;
        public ItemController(IConfiguration config, IItemService itemService, IStringLocalizer<StatusMessages> statusMessageLocalizer) : base(statusMessageLocalizer)
        {
            _config = config;
            _itemService = itemService;

        }

        [HttpGet]

        [Route("/api/GetAllitem")]
        public ActionResult<IEnumerable<Item_Main>> GetAllItem()
        {
            try
            {
                var Item = _itemService.GetAllItem();
                return Ok(Item);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving .");
            }
        }


        [HttpGet]
        [Route("/api/GetAllItemList")]  // Removed leading slash (optional but recommended)
        public ActionResult<object> GetAllItemList([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                // Call the service to get paginated item list with total count
                var result = _itemService.GetAllItemList(pageNumber, pageSize);

                // Return result as a JSON object
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework like Serilog or NLog)
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while retrieving the item list.", error = ex.Message });
            }
        }



        [HttpGet]
        [Route("/api/GetNextItemCode")]

        public JsonResult GetNextItemCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextNumber = code
            });
        }

        [HttpGet]
        [Route("/api/GetNextItemPrfxCode")]

        public JsonResult GetNextItemPrfxCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemPrfxCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextNumberprfx = code
            });
        }

        [HttpGet]
        [Route("/api/GetItemPrefix")]
        public ActionResult<IEnumerable<ItemPrefix>> GetItemPrefix()
        {
            try
            {
                var Item = _itemService.GetItemPrefix();
                return Ok(Item);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
            }
        }


        [HttpGet]
        [Route("/api/GetItemOEM")]
        public ActionResult<IEnumerable<ItemOEM>> GetItemOEM()
        {
            try
            {
                var Item = _itemService.GetItemOEM();
                return Ok(Item);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
            }
        }




        [HttpGet]
        [Route("/api/GetItemTax")]
        public ActionResult<IEnumerable<ItemTax>> GetItemTax()
        {
            try
            {
                var Item = _itemService.GetItemTax();
                return Ok(Item);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving taxes.");
            }
        }



        [HttpGet]
        [Route("/api/GetItemGroup")]
        public ActionResult<IEnumerable<ItemGroup>> GetItemGroup()
        {
            try
            {
                var Item = _itemService.GetItemGroup();
                return Ok(Item);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
            }
        }








        [HttpGet]
        [Route("/api/GetItemNames")]
        public IActionResult GetCarModel(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _itemService.GetItemName(filterField, filterCondition, filterValue);

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
        [Route("/api/GetItemPartCode")]
        public ActionResult<IEnumerable<PartCodes>> GetItemPartCode()
        {
            try
            {
                var Item = _itemService.GetItemPartCode();
                return Ok(Item);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
            }
        }




        [HttpPost]
        [Route("/api/SaveItem")]
        public ActionResult<DB_STATUS> Save([FromBody] ItemDto model)
        {
            try
            {
                // Check if model is null or has required properties
                if (model == null)
                {
                    return BadRequest("Invalid model");
                }

                // Create a new Employee object from the model
                ItemDto item = new ItemDto
                {
                    Item_Id = model.Item_Id, // Make sure Item_Id exists in ItemDto class
                    Item_Code = model.Item_Code,
                    Item_OemId1 = model.Item_OemId1,
                    Item_OemId2 = model.Item_OemId2,
                    Item_OemId3 = model.Item_OemId3,
                    Item_OemId4 = model.Item_OemId4,
                    Item_OemId5 = model.Item_OemId5,
                    Item_OemId6 = model.Item_OemId6,
                    Item_PrefixId = model.Item_PrefixId,
                    Item_PrefixCode = model.Item_PrefixCode,
                    Item_NameId = model.Item_NameId,
                    Item_DescEn = model.Item_DescEn,
                    Item_DescAr = model.Item_DescAr,
                    Item_AgentPrice = model.Item_AgentPrice,
                    Item_EcoOrderQty = model.Item_EcoOrderQty,
                    Item_MfrId = model.Item_MfrId,
                    Item_GroupId = model.Item_GroupId,
                    Item_CountryId = model.Item_CountryId,
                    Item_MfrPartNo = model.Item_MfrPartNo,
                    Item_PartCodeId = model.Item_PartCodeId,
                    Item_IsActive = model.Item_IsActive,
                    Item_NeedExpDate = model.Item_NeedExpDate,
                    Item_PhotoPath = model.Item_PhotoPath,
                    Item_MinPackingQty = model.Item_MinPackingQty,
                    Item_MaxPackingQty = model.Item_MaxPackingQty,
                    Item_Barcode1 = model.Item_Barcode1,
                    Item_Barcode2 = model.Item_Barcode2,
                    Item_Notes = model.Item_Notes,
                    Item_CreatedBy = model.Item_CreatedBy,
                    Item_UpdatedBy = model.Item_UpdatedBy,
                    Item_Quality = model.Item_Quality,
                    Item_TimeFix = model.Item_TimeFix,
                    Item_isOriginal = model.Item_isOriginal
                };

                // Call the Save method from the service
                var result = _itemService.Save(item);

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


        [HttpPost]
        [Route("SaveItemTax")]
        public ActionResult<DB_STATUS> SaveTax([FromBody] ItemTaxinsert model)
        {
            try
            {
                // Check if the model is null or invalid
                if (model == null)
                {
                    return BadRequest("Invalid model");
                }

              
                ItemTaxinsert tax = new ItemTaxinsert
                {
                    Code = model.Code,
                    ItemCode = model.ItemCode,
                    TaxMastCode = model.TaxMastCode,
                    TaxPerc = model.TaxPerc ?? 0,  // Use 0 if TaxPerc is null
                    IsActive = model.IsActive,
                    CreatedBy = model.CreatedBy,
                    UpdatedBy = model.UpdatedBy
                };

                // Call the SaveTax method from the service
                var result = _itemService.SaveTax(tax);

                // Check if the save operation was successful
                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception (you may want to log the details for further analysis)
                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred."
                });
            }
        }



        [HttpGet]
        [Route("/api/GetNextItemOemCode")]

        public JsonResult GetNextItemOemCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemOemCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextNumberOem = code
            });
        }

        [HttpPost]
        [Route("/api/SaveItemOem")]
        public ActionResult<DB_STATUS> SaveOem([FromBody] ItemOEMIns model)
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

                // Prepare the data to be passed to the service
              

                // Call the SaveOem method from the service
                var result = _itemService.SaveOem(model);

                // Check if the save operation was successful
                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception (you may want to log the details for further analysis)
                //_logger.LogError(ex, "An unexpected error occurred while saving the OEM item.");

                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred."
                });
            }
        }







        [HttpPost]
        [Route("/api/SaveItemPartCode")]
        public ActionResult<DB_STATUS> SavePartCode([FromBody] PartCodeins model)
        {
            try
            {
                // Validate the model
                if (model == null || string.IsNullOrWhiteSpace(model.PartC_Code) || string.IsNullOrWhiteSpace(model.PartC_Partcode))
                {
                    return BadRequest(new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid input. PartC_Code and PartC_Partcode are required."
                    });
                }

                // Map the model to a service-specific object (if required)
                var partCode = new PartCodeins
                {
                    PartC_Code = model.PartC_Code,
                    PartC_Partcode = model.PartC_Partcode,
                    PartC_Type = model.PartC_Type,
                  
                };

                // Call the service method to save the part code
                var result = _itemService.SavePartCode(partCode);

                // Return an appropriate HTTP response based on the service result
                if (result.Success)
                {
                    return Ok(result); // HTTP 200 with success response
                }
                else if (result.StatusMessage.Contains("Duplicate"))
                {
                    return Conflict(result); // HTTP 409 Conflict for duplicate entry
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result); // HTTP 500 for other failures
                }
            }
            catch (Exception ex)
            {
                // Log the exception (use a logger if available)
                //_logger.LogError(ex, "An unexpected error occurred while saving the part code.");

                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred. Please try again later."
                });
            }
        }


        [HttpGet]
        [Route("/api/GetNextItemNameCode")]

        public JsonResult GetNextItemNameCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemNameCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtItemNameCode = code
            });
        }

        [HttpPost]
        [Route("/api/SaveItemName")]
        public ActionResult<DB_STATUS> SavePart([FromBody] ItemNameIns model)
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

                // Prepare the data to be passed to the service
               

                // Call the SavePart method from the service
                var result = _itemService.SaveItemName(model);

                // Check if the save operation was successful
                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception (you may want to log the details for further analysis)
                //_logger.LogError(ex, "An unexpected error occurred while saving the item name.");

                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred."
                });
            }
        }

        [HttpGet]
        [Route("/api/GetItemGroupfil")]
        public JsonResult GetItemGroup(string filterField, string filterCondition, string filterValue)
      {
            var itemGroupResponse = new ItemGroupfetch(); // Assuming this is your response object
            try
            {
                // Call the service with the correct parameters
                var result = _itemService.Get(filterField, filterCondition, filterValue);

                if (result != null)
                {
                    // Map the result to the response object
                    itemGroupResponse = new ItemGroupfetch
                    {
                        ItemG_Id = result.ItemG_Id,
                        ItemG_Code = result.ItemG_Code,
                        ItemG_NameEn = result.ItemG_NameEn,
                        ItemG_NameAr = result.ItemG_NameAr,
                        ItemG_CreatedBy = result.ItemG_CreatedBy,
                        ItemG_CreatedOn = result.ItemG_CreatedOn,
                       
                    };
                }
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here if needed
                // For example: _logger.LogError(ex, "Error occurred while fetching item group.");
                return new JsonResult(new { Error = ex.Message });
            }

            return new JsonResult(itemGroupResponse);
        }


        [HttpGet]
        [Route("/api/GetNextItemGroupCode")]

        public JsonResult GetNextGroupCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextGroupCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextNumberGrp = code
            });
        }





        [HttpGet]
        [Route("/api/GetNextItemPrfxCode_Byid")]

        public JsonResult GetNextItemPrfxCode(int id)
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemPrfxCodeByid( id );
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextItemPrfxCode = code
            });
        }

        





        [HttpPost]
        [Route("/api/SaveItemGroup")]
        public ActionResult<DB_STATUS> SaveGroup([FromBody] ItemGroupIns model)
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
                var result = _itemService.SaveGroup(model);

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
        [Route("/api/GetItemUnitfil")]
        public IActionResult GetItemUnit(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _itemService.GetItemUnit(filterField, filterCondition, filterValue);

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
        [Route("/api/GetNextItemUnitCode")]

        public JsonResult GetNextItemUnitCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemUnitCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextUnitCode = code
            });
        }




        [HttpGet]
        [Route("/api/GetNextItemLocationDetRowNo")]

        public JsonResult GetNextItemLocationDetRow()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemLocationDetRowNo();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextLocationRowNo = code
            });
        }








        [HttpGet]
        [Route("/api/GetNextItemPartCode")]

        public JsonResult GetNextPartCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextPartCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NextPartCode = code
            });
        }


        [HttpPost]
        [Route("/api/SaveItemUnit")]
        public ActionResult<DB_STATUS> SaveUnit([FromBody] ItemUnit_ins model)
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

                // Prepare the data to be passed to the service
              

                // Call the SaveUnit method from the service
                var result = _itemService.SaveUnit(model);

                // Check if the save operation was successful
                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log exception (you may want to log the details for further analysis)
                //_logger.LogError(ex, "An unexpected error occurred while saving the item unit.");

                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred."
                });
            }
        }




        [HttpGet]
        [Route("/api/GetItemPrefix_Fil")]
        public IActionResult GetItemPrefix(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _itemService.GetItemPrefix(filterField, filterCondition, filterValue);

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


        [HttpPost]
        [Route("/api/SaveItemPrfx")]
        public ActionResult<DB_STATUS> SavePrefix([FromBody] ItemPrefixInsert model)
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
                var result = _itemService.SavePrefix(model);

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
        [Route("/api/GetNxtItmPrtOrgnCode")]

        public JsonResult GetNextItemOrgnCode()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemOrgnCode();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtItemPrtOrgnCode = code
            });
        }



        [HttpGet]
        [Route("/api/GetNxtItemUnitRowno")]

        public JsonResult GetNextItemUnitRowNo()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemUnitRowNo();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtItemUnitRowNo = code
            });
        }

        [HttpGet]
        [Route("/api/GetNxtItemVendorRowno")]
        public JsonResult GetNextItemVendorRowNo()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemVendorRowNo();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtItemVendorRowNo = code
            });
        }


        [HttpGet]
        [Route("/api/GetNxtItemCarDetRowno")]
        public JsonResult GetNextItemcarDetRowNo()
        {

            string code = "";
            try
            {
                code = _itemService.GetNextItemCarDetRowNo();
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(new
            {
                NxtItemCarDetRowNo = code
            });
        }



        [HttpGet]
        [Route("/api/GetItemPrtOrgn")]
        public IActionResult GetItemPartOrgn(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _itemService.GetItemPartOrgn(filterField, filterCondition, filterValue);

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



        [HttpPost]
        [Route("/api/SaveItemPrtOrgn")]
        public ActionResult<DB_STATUS> SavePrtOrigin([FromBody] PartOrigin_ins model)
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
                var result = _itemService.SavePrtOrigin(model);

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
        [Route("/api/GetPartOrgnById")]

        public JsonResult GetPartOrigin_byId(int PartOrg_Id)
        {
            PartOrigin origin = new();
            try
            {
                var result = _itemService.Get(PartOrg_Id);
                if (result != null)
                {
                    // Map the result to BranchModelResponse
                    origin.PartOrg_Id = result.PartOrg_Id;
                    origin.PartOrg_Code = result.PartOrg_Code;
                    origin.PartOrg_NameEn = result.PartOrg_NameEn;
                    origin.PartOrg_NameAr = result.PartOrg_NameAr;
                    origin.PartOrg_Type = result.PartOrg_Type;
                    origin.PartOrg_CreatedBy = result.PartOrg_CreatedBy;
                    origin.PartOrg_CreatedOn = result.PartOrg_CreatedOn;
                }
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(origin);
        }



        [HttpGet]
        [Route("/api/GetItemLocation")]
        public IActionResult GetItemLocation(string filterField = null, string filterCondition = null, string filterValue = null)
        {
            try
            {
                // Call the service with the correct parameters
                var result = _itemService.GetItemLocation(filterField, filterCondition, filterValue);

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


        [HttpPost]
        [Route("/api/SaveItemLocation")]
        public ActionResult<DB_STATUS> SaveItemLocation([FromBody] ItemLocationInsert model)
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
                var result = _itemService.SaveItemLocation(model);

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
        [Route("/api/GetUnitById")]

        public JsonResult GetUnit_Byid(int Unit_Id)
        {
            ItemUnitFil unit = new();
            try
            {
                var result = _itemService.GetUnit_Byid(Unit_Id);
                if (result != null)
                {
                    unit.Unit_Id = result.Unit_Id;
                    unit.Unit_Code = result.Unit_Code;
                    unit.Unit_NameEn = result.Unit_NameEn;
                    unit.Unit_NameAr = result.Unit_NameAr;
                }
            }
            catch (Exception ex)
            {

                return new JsonResult(null);
            }

            return new JsonResult(unit);
        }


        [HttpGet]
        [Route("/api/GetItemName_id")]
       public JsonResult GetItemName_id(int ItemN_Id)
        {
            ItemName itemModel = new();  // Initialize an empty ItemName object

            try
            {
                // Call the service layer method to get the item name by ID
                var result = _itemService.GetItemName_id(ItemN_Id);
                if (result != null)
                {
                    // Map the result to the ItemName entity
                    itemModel.ItemN_Id = result.ItemN_Id;
                    itemModel.ItemN_Code = result.ItemN_Code;
                    itemModel.ItemN_NameEn = result.ItemN_NameEn;
                    itemModel.ItemN_NameAr = result.ItemN_NameAr;
                    itemModel.ItemN_CreatedBy = result.ItemN_CreatedBy;
                    itemModel.ItemN_CreatedOn = result.ItemN_CreatedOn;
                    itemModel.ItemN_UpdatedOn = result.ItemN_UpdatedOn;
                }
                else
                {
                    // Return a 404 not found result if no record is found
                    return new JsonResult(new { Message = "Item not found" }) { StatusCode = 404 };
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions and return a 500 status code with error message
                return new JsonResult(new { Message = "An error occurred", Error = ex.Message }) { StatusCode = 500 };
            }

            return new JsonResult(itemModel);  // Return the ItemName object as JSON
        }




        [HttpGet]
        [Route("/api/GetItemOem_id")]
        public JsonResult GetItemoem_id(int ItemOEM)
        {
            ItemOEM itemModel = new();  // Initialize an empty ItemName object

            try
            {
                // Call the service layer method to get the item name by ID
                var result = _itemService.GetItemOem_id(ItemOEM);
                if (result != null)
                {
                    // Map the result to the ItemName entity
                    itemModel.OEM_Id = result.OEM_Id;
                    itemModel.OEM_Code = result.OEM_Code;
                    itemModel.OEM_Number = result.OEM_Number;
                    itemModel.OEM_CreatedBy = result.OEM_CreatedBy;
                    itemModel.OEM_CreatedOn = result.OEM_CreatedOn;
                    itemModel.OEM_UpdatedOn = result.OEM_UpdatedOn;
                }
                else
                {
                    // Return a 404 not found result if no record is found
                    return new JsonResult(new { Message = "Item  oem not found" }) { StatusCode = 404 };
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions and return a 500 status code with error message
                return new JsonResult(new { Message = "An error occurred", Error = ex.Message }) { StatusCode = 500 };
            }

            return new JsonResult(itemModel);  // Return the ItemName object as JSON
        }




        [HttpGet]
        [Route("/api/GetItemGroup_Byid")]
        public JsonResult GetItemGroup_id(int ItemG_Id)
        {
            ItemGroup itemModel = new();  // Initialize an empty ItemName object

            try
            {
                // Call the service layer method to get the item name by ID
                var result = _itemService.GetItemGroup_id(ItemG_Id);
                if (result != null)
                {
                    // Map the result to the ItemName entity
                    itemModel.ItemG_Id = result.ItemG_Id;
                    itemModel.ItemG_Code = result.ItemG_Code;
                    itemModel.ItemG_NameEn = result.ItemG_NameEn;
                    itemModel.ItemG_NameAr = result.ItemG_NameAr;
                    itemModel.ItemG_CreatedBy = result.ItemG_CreatedBy;
                    itemModel.ItemG_CreatedOn = result.ItemG_CreatedOn;
                 
                }
                else
                {
                    // Return a 404 not found result if no record is found
                    return new JsonResult(new { Message = "Item  Group not found" }) { StatusCode = 404 };
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions and return a 500 status code with error message
                return new JsonResult(new { Message = "An error occurred", Error = ex.Message }) { StatusCode = 500 };
            }

            return new JsonResult(itemModel);  // Return the ItemName object as JSON
        }

        [HttpGet]
        [Route("/api/GetItemDtls_ById")]
        public JsonResult GetItemDtls_id(int Item_Id)
        {
            try
            {
                // Call the service layer method to get the item details by ID
                var result = _itemService.GetItemDtls_Id(Item_Id);

                if (result != null)
                {
                    return new JsonResult(result) { StatusCode = 200 };
                }
                else
                {
                    return new JsonResult(new { Message = "Item not found" }) { StatusCode = 404 };
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(new { Message = "An error occurred", Error = ex.Message }) { StatusCode = 500 };
            }
        }



        [HttpPost]
        [Route("/api/DeleteItemName")]
        public ActionResult<DB_STATUS> DeleteItemName([FromBody] ItemName_Dlt model)
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
                var result = _itemService.DeleteItemName(model);

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
        [Route("/api/SaveMainItem")]
        public async Task<IActionResult> SaveMainItem([FromQuery] int ItemId, [FromBody] ItemRequestModel request)
        {
            try
            {
                if (request == null || request.Item == null)
                {
                    return BadRequest(new { Success = false, Message = "Invalid request data." });
                }

                var result = _itemService.SaveMainItem(
                    ItemId,  // Pass item_id separately
                    request.Item,
                    request.UnitDetails,
                    request.VendorDetails,
                    request.CarDetails,
                    request.LocationDetails,
                    request.VatDetails
                );

                if (result.Success)
                {
                    return Ok(new
                    {
                        Success = true,
                       
                    });
                }
                else
                {
                    return BadRequest(new { Success = false, Message = result.StatusMessage });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Success = false,
                    Message = "An error occurred while processing the request.",
                    Error = ex.Message
                });
            }
        }


        [HttpGet]

        [Route("/api/GetCarDetails")]
        public ActionResult<IEnumerable<CarDetail>> GetCarDetails()
        {
            try
            {
                var Item = _itemService.GetItemCarDetails();
                return Ok(Item);
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving .");
            }
        }
    }



    [Route("api/upload")]
    [ApiController]
    public class UploadController : ControllerBase
    {
         private readonly string _uploadPath = @"D:\project\WMSCLOUDV1\src\Images\";

         //private readonly string _uploadPath = @"../src/Images";
       // private readonly string _uploadPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "src", "Images");

        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, [FromForm] string itemCode)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (string.IsNullOrEmpty(itemCode))
            {
                return BadRequest("Item code is required.");
            }

            try
            {
                // Ensure the directory exists
                if (!Directory.Exists(_uploadPath))
                {
                    Directory.CreateDirectory(_uploadPath);
                }

                // Get file extension (e.g., .jpg, .png)
                string fileExtension = Path.GetExtension(file.FileName);

                // Rename the file as "ItemCode_Img.Extension"
                string newFileName = $"{itemCode}_Img{fileExtension}";
                string filePath = Path.Combine(_uploadPath, newFileName);

                // Save file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { message = "File uploaded successfully", fileName = newFileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }







}
