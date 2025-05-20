using GWebapi.Models; // Adjust if the namespace of your Branch model is different
using Microsoft.EntityFrameworkCore;

namespace GWebapi.Data
{
    public class BranchContext : DbContext
    {
        public BranchContext(DbContextOptions<BranchContext> options)
            : base(options)
        {
        }

        public DbSet<Branch> Branches { get; set; }
    }
}
