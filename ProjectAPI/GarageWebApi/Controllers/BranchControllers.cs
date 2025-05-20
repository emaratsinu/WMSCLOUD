using G.ENTITY;
using G.SERVICE;
using GarageWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace GarageWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("AllowCors")]
    public class BranchController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly IBranchService _branchService;
        //private readonly IStringLocalizer<StatusMessages> _statusMessageLocalizer;
        public BranchController(IConfiguration config, IBranchService branchService, IStringLocalizer<StatusMessages> statusMessageLocalizer) : base(statusMessageLocalizer)
        {
            _config = config;
            _branchService = branchService;

        }
        [HttpPost]
        [Route("SaveBranch")]
        public ActionResult<DB_STATUS> Save([FromBody] BranchModel model)

        {
            try
            {
                // Map BranchModel to Branch_Main
                Branch_Main branch = new()
                {
                    Br_Id = model.Br_Id,
                    Br_Code = model.Br_Code,
                    Br_NameEn = model.Br_NameEn,
                    Br_NameAr = model.Br_NameAr,
                    Br_Address = model.Br_Address,
                    Br_IsActive = model.Br_IsActive,
                    Br_IsCurrBranch = model.Br_IsCurrBranch,
                    Br_AllowWhSales = model.Br_AllowWhSales,
                    Br_AllowBulkSales = model.Br_AllowBulkSales,
                    Br_AllowCr = model.Br_AllowCr,
                    Br_AllowCCr = model.Br_AllowCCr,
                    Br_AllowPurchase = model.Br_AllowPurchase,
                    Br_AllowPurchaseRet = model.Br_AllowPurchaseRet,
                    Br_AllowTrOut = model.Br_AllowTrOut,
                    Br_AllowTrIn = model.Br_AllowTrIn,
                    Br_AllowSales = model.Br_AllowSales,
                    Br_TransferBasedOnShEx = model.Br_TransferBasedOnShEx,
                    Br_NeedShExReport = model.Br_NeedShExReport,
                    Br_TypeId = model.Br_TypeId,
                    Br_AreaId = model.Br_AreaId,
                    Br_ClosedOn = model.Br_ClosedOn,
                    Br_CreatedBy = model.Br_CreatedBy,
                    Br_CreatedOn = model.Br_CreatedOn,
                    OldCode = model.OldCode
                };

                // Call the Save method from the service
                var result = _branchService.Save(branch);

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
public ActionResult<IEnumerable<BranchModel>> GetAllBranches()
{
    try
    {
        var branches = _branchService.GetAllBranches();
        return Ok(branches);
    }
    catch (Exception ex)
    {
        // Log the exception (e.g., using a logging framework)
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving branches.");
    }
}

        [HttpGet]
        [Route("/api/GetNextBranchNumber")]
       
        public JsonResult GetNextBranchNumber()
        {

            string code = "";
            try
            {
                code = _branchService.GetNextBranchNumber();
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
        [Route("/api/GetBranch")]
       
        public JsonResult GetBranch(int branchID)
        {
            BranchModelResponse branch = new();
            try
            {
                var result = _branchService.Get(branchID);
                if (result != null)
                {
                    // Map the result to BranchModelResponse
                    branch.Br_Id = result.Br_Id;
                    branch.Br_Code = result.Br_Code;
                    branch.Br_NameEn = result.Br_NameEn;
                    branch.Br_NameAr = result.Br_NameAr;
                    branch.Br_Address = result.Br_Address;
                    branch.Br_IsActive = result.Br_IsActive;
                    branch.Br_IsCurrBranch = result.Br_IsCurrBranch;
                    branch.Br_AllowWhSales = result.Br_AllowWhSales;
                    branch.Br_AllowBulkSales = result.Br_AllowBulkSales;
                    branch.Br_AllowCr = result.Br_AllowCr;
                    branch.Br_AllowCCr = result.Br_AllowCCr;
                    branch.Br_AllowPurchase = result.Br_AllowPurchase;
                    branch.Br_AllowPurchaseRet = result.Br_AllowPurchaseRet;
                    branch.Br_AllowTrOut = result.Br_AllowTrOut;
                    branch.Br_AllowTrIn = result.Br_AllowTrIn;
                    branch.Br_AllowSales = result.Br_AllowSales;
                    branch.Br_TransferBasedOnShEx = result.Br_TransferBasedOnShEx;
                    branch.Br_NeedShExReport = result.Br_NeedShExReport;
                    branch.Br_TypeId = result.Br_TypeId;
                    branch.Br_AreaId = result.Br_AreaId;
                    branch.Br_ClosedOn = result.Br_ClosedOn;
                    branch.Br_CreatedBy = result.Br_CreatedBy;
                    branch.Br_CreatedOn = result.Br_CreatedOn;
                    branch.OldCode = result.OldCode;
                }
            }
            catch (Exception ex)
            {
               
                return new JsonResult(null);
            }

            return new JsonResult(branch);
        }



    }
}
