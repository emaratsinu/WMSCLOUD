using G.ENTITY; // Ensure the correct namespace for your models
using G.ENTITY.G.ENTITY;
using G.SERVICE; // Ensure the correct namespace for your services
using GarageWebApi.Models;
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

    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }


        [HttpGet]
        [Route("/api/GetVendor")]

        public JsonResult GetVendor(long vendorType)
        {
            try
            {
                var result = _vendorService.GetAllVendors(vendorType);
                List<VendorStatusResponse> list = new();

                if (result != null && result.Any())
                {
                    list = result.Select(v => new VendorStatusResponse
                    {
                        Vendor_Id = v.Vendor_Id,
                        Vendor_Type = v.Vendor_Type,
                        Vendor_Code = v.Vendor_Code,
                        Vendor_ShortName = v.Vendor_ShortName,
                        Vendor_NameEn = v.Vendor_NameEn,
                        Vendor_NameAr = v.Vendor_NameAr,
                        Vendor_Category = v.Vendor_Category,
                        Vendor_RegDate = v.Vendor_RegDate,
                        Vendor_Address = v.Vendor_Address,
                        Vendor_Phone = v.Vendor_Phone,
                        Vendor_Fax = v.Vendor_Fax,
                        Vendor_Web = v.Vendor_Web,
                        Vendor_Email = v.Vendor_Email,
                        Vendor_IsActive = v.Vendor_IsActive,
                        Vendor_LocId = v.Vendor_LocId,
                        Vendor_GroupId = v.Vendor_GroupId,
                        Vendor_PartOriginId = v.Vendor_PartOriginId,
                        Vendor_CreatedBy = v.Vendor_CreatedBy,
                        Vendor_CreatedOn = v.Vendor_CreatedOn,
                        Vendor_UpdatedBy = v.Vendor_UpdatedBy,
                        Vendor_UpdatedOn = v.Vendor_UpdatedOn,
                        Vendor_Notes = v.Vendor_Notes
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
        [Route("/api/GetVendorDet")]

        public JsonResult GetVendorDet()
        {
            try
            {
                var result = _vendorService.GetAllVendorsDet();
                List<VendorStatusResponse> list = new();

                if (result != null && result.Any())
                {
                    list = result.Select(v => new VendorStatusResponse
                    {
                        Vendor_Id = v.Vendor_Id,
                        Vendor_Type = v.Vendor_Type,
                        Vendor_Code = v.Vendor_Code,
                        Vendor_ShortName = v.Vendor_ShortName,
                        Vendor_NameEn = v.Vendor_NameEn,
                        Vendor_NameAr = v.Vendor_NameAr,
                        Vendor_Category = v.Vendor_Category,
                        Vendor_RegDate = v.Vendor_RegDate,
                        Vendor_Address = v.Vendor_Address,
                        Vendor_Phone = v.Vendor_Phone,
                        Vendor_Fax = v.Vendor_Fax,
                        Vendor_Web = v.Vendor_Web,
                        Vendor_Email = v.Vendor_Email,
                        Vendor_IsActive = v.Vendor_IsActive,
                        Vendor_LocId = v.Vendor_LocId,
                        Vendor_GroupId = v.Vendor_GroupId,
                        Vendor_PartOriginId = v.Vendor_PartOriginId,
                        Vendor_CreatedBy = v.Vendor_CreatedBy,
                        Vendor_CreatedOn = v.Vendor_CreatedOn,
                        Vendor_UpdatedBy = v.Vendor_UpdatedBy,
                        Vendor_UpdatedOn = v.Vendor_UpdatedOn,
                        Vendor_Notes = v.Vendor_Notes
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
        [Route("/api/GetNextVendorNumber")]

        public JsonResult GetNextVendorNumber(long vendorType)
        {

            string code = "";
            try
            {
                code = _vendorService.GetNextVendorNumber(vendorType);
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





        [HttpPost]
        [Route("/api/SaveVendor")]
        public ActionResult<DB_STATUS> Save([FromBody] VendorModel model)
        {
            try
            {
                // Map VendorModel to VendorInsertModel
                var vendor = new VendorInsertModel
                {
                    Vendor_Id = model.Vendor_Id,
                    Vendor_Type = model.Vendor_Type,
                    
                    Vendor_ShortName = model.Vendor_ShortName,
                    Vendor_NameEn = model.Vendor_NameEn,
                    Vendor_NameAr = model.Vendor_NameAr,
                    Vendor_Category = model.Vendor_Category,
                    Vendor_RegDate = model.Vendor_RegDate,
                    Vendor_Address = model.Vendor_Address,
                    Vendor_Phone = model.Vendor_Phone,
                    Vendor_Fax = model.Vendor_Fax,
                    Vendor_Web = model.Vendor_Web,
                    Vendor_Email = model.Vendor_Email,
                    Vendor_IsActive = model.Vendor_IsActive,
                    Vendor_LocId = model.Vendor_LocId,
                    Vendor_GroupId = model.Vendor_GroupId,
                    Vendor_PartOriginId = model.Vendor_PartOriginId,
                    Vendor_CreatedBy = model.Vendor_CreatedBy,
                    Vendor_UpdatedBy = model.Vendor_UpdatedBy,
                    Vendor_Notes = model.Vendor_Notes
                };

                // Call the Save method from the service
                var result = _vendorService.Save(vendor);

                if (!result.Success)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new DB_STATUS { Status = "Failure", Success = false, StatusMessage = "An unexpected error occurred." });
            }
        }



        [HttpGet]
        [Route("/api/GetVendor_byid")]
        public JsonResult GetVendor(int vendorId)
        {
            VendorResponse vendorResponse = new();
            try
            {
                var result = _vendorService.Get(vendorId);
                if (result != null)
                {
                    // Map the result to VendorResponse
                    vendorResponse.Vendor_Id = result.Vendor_Id;
                    vendorResponse.Vendor_Type = result.Vendor_Type;
                    vendorResponse.Vendor_Code = result.Vendor_Code;
                    vendorResponse.Vendor_ShortName = result.Vendor_ShortName;
                    vendorResponse.Vendor_NameEn = result.Vendor_NameEn;
                    vendorResponse.Vendor_NameAr = result.Vendor_NameAr;
                    vendorResponse.Vendor_Category = result.Vendor_Category;
                    vendorResponse.Vendor_RegDate = result.Vendor_RegDate;
                    vendorResponse.Vendor_Address = result.Vendor_Address;
                    vendorResponse.Vendor_Phone = result.Vendor_Phone;
                    vendorResponse.Vendor_Fax = result.Vendor_Fax;
                    vendorResponse.Vendor_Web = result.Vendor_Web;
                    vendorResponse.Vendor_Email = result.Vendor_Email;
                    vendorResponse.Vendor_IsActive = result.Vendor_IsActive;
                    vendorResponse.Vendor_LocId = result.Vendor_LocId;
                    vendorResponse.Vendor_GroupId = result.Vendor_GroupId;
                    vendorResponse.Vendor_PartOriginId = result.Vendor_PartOriginId;
                    vendorResponse.Vendor_CreatedBy = result.Vendor_CreatedBy;
                    vendorResponse.Vendor_CreatedOn = result.Vendor_CreatedOn;
                    vendorResponse.Vendor_UpdatedBy = result.Vendor_UpdatedBy;
                    vendorResponse.Vendor_UpdatedOn = result.Vendor_UpdatedOn;
                    vendorResponse.Vendor_Notes = result.Vendor_Notes;
                }
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here if needed
                return new JsonResult(null);
            }

            return new JsonResult(vendorResponse);
        }



    }
}

