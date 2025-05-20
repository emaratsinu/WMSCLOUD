using GWebApiProject.Models;
using Microsoft.EntityFrameworkCore;

public class BranchQueryContext : DbContext
{
    public BranchQueryContext(DbContextOptions<BranchQueryContext> options) : base(options) { }

    public DbSet<Branch> Branches { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Branch>()
            .HasKey(b => b.BrId);
    }

    public async Task<IEnumerable<Branch>> GetAllBranchesAsync()
    {
        try
        {
            var branches = await Branches
                .FromSqlRaw("EXEC dbo.G_SELECT_ALL_BRANCHES")
                .ToListAsync();

            // Log or debug the output to check for nulls or unexpected results
            foreach (var branch in branches)
            {
               // Console.WriteLine($"Branch ID: {branch.BrId}, Name: {branch.BrNameEn}, Address: {branch.BrAddress}");
            }

            return branches;
        }
        catch (Exception ex)
        {
            // Log the error details
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }
}
