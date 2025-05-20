using GWebApiProject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class BranchQueriesController : ControllerBase
{
    private readonly BranchQueryContext _context;

    public BranchQueriesController(BranchQueryContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Branch>>> GetAllBranches()
    {
        var branches = await _context.GetAllBranchesAsync();
        return Ok(branches);
    }
}
