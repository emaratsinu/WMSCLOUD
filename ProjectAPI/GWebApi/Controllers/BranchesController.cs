using GWebapi.Data;
using GWebapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GWebapi.Controllers
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
        public async Task<IActionResult> UpsertBranch(Branch branch)
        {
            if (branch.Br_Id == 0)
            {
                // Insert new branch
                _context.Branches.Add(branch);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetBranch), new { id = branch.Br_Id }, branch);
            }
            else
            {
                // Update existing branch
                var existingBranch = await _context.Branches.FindAsync(branch.Br_Id);
                if (existingBranch == null)
                {
                    return NotFound();
                }

                _context.Entry(existingBranch).CurrentValues.SetValues(branch);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranch(int id)
        {
            var branch = await _context.Branches.FindAsync(id);

            if (branch == null)
            {
                return NotFound();
            }

            return branch;
        }
    }
}