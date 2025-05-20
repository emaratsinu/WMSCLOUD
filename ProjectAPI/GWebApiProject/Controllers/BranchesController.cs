using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using GWebApiProject.Data;
using GWebApiProject.Models;

namespace GWebApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly BranchContext _context;

        public BranchesController(BranchContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostBranch([FromBody] Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                int result = await _context.InsertBranchAsync(
                    branch.BrId,
                    branch.BrCode,
                    branch.BrNameEn,
                    branch.BrNameAr,
                    branch.BrAddress,
                    branch.BrIsActive,
                    branch.BrIsCurrBranch,
                    branch.BrAllowWhSales,
                    branch.BrAllowBulkSales,
                    branch.BrAllowCr,
                    branch.BrAllowCCr,
                    branch.BrAllowPurchase,
                    branch.BrAllowPurchaseRet,
                    branch.BrAllowTrOut,
                    branch.BrAllowTrIn,
                    branch.BrAllowSales,
                    branch.BrTransferBasedOnShEx,
                    branch.BrNeedShExReport,
                    branch.BrTypeId,
                    branch.BrAreaId,
                    branch.BrClosedOn,
                    branch.BrCreatedBy,
                    branch.BrCreatedOn,
                    branch.OldCode
                );

                if (result == 0)
                {
                    return Ok("Branch inserted successfully.");
                }
                else
                {
                    return BadRequest($"Error code: {result}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
