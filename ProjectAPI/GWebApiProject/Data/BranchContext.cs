using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System;
using System.Threading.Tasks;
using GWebApiProject.Models;

namespace GWebApiProject.Data
{
    public class BranchContext : DbContext
    {
        public BranchContext(DbContextOptions<BranchContext> options)
            : base(options)
        {
        }

        public DbSet<Branch> Branches { get; set; }

        public async Task<int> InsertBranchAsync(
            int? brId, string brCode, string brNameEn, string brNameAr, string brAddress,
            bool brIsActive, bool brIsCurrBranch, bool brAllowWhSales, bool brAllowBulkSales,
            bool brAllowCr, bool brAllowCCr, bool brAllowPurchase, bool brAllowPurchaseRet,
            bool brAllowTrOut, bool brAllowTrIn, bool brAllowSales, bool brTransferBasedOnShEx,
            bool brNeedShExReport, int brTypeId, int brAreaId, DateTime? brClosedOn,
            int brCreatedBy, DateTime brCreatedOn, string oldCode)
        {
            try
            {
                var result = await Database.ExecuteSqlRawAsync(
                    "EXEC [dbo].[G_INSERT_BRANCH_API] @BrId, @BrCode, @BrNameEn, @BrNameAr, @BrAddress, " +
                    "@BrIsActive, @BrIsCurrBranch, @BrAllowWhSales, @BrAllowBulkSales, @BrAllowCr, @BrAllowCCr, " +
                    "@BrAllowPurchase, @BrAllowPurchaseRet, @BrAllowTrOut, @BrAllowTrIn, @BrAllowSales, " +
                    "@BrTransferBasedOnShEx, @BrNeedShExReport, @BrTypeId, @BrAreaId, @BrClosedOn, @BrCreatedBy, " +
                    "@BrCreatedOn, @OldCode",
                    new SqlParameter("@BrId", (object)brId ?? DBNull.Value),
                    new SqlParameter("@BrCode", brCode),
                    new SqlParameter("@BrNameEn", brNameEn),
                    new SqlParameter("@BrNameAr", brNameAr),
                    new SqlParameter("@BrAddress", (object)brAddress ?? DBNull.Value),
                    new SqlParameter("@BrIsActive", brIsActive ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrIsCurrBranch", brIsCurrBranch ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowWhSales", brAllowWhSales ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowBulkSales", brAllowBulkSales ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowCr", brAllowCr ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowCCr", brAllowCCr ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowPurchase", brAllowPurchase ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowPurchaseRet", brAllowPurchaseRet ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowTrOut", brAllowTrOut ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowTrIn", brAllowTrIn ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrAllowSales", brAllowSales ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrTransferBasedOnShEx", brTransferBasedOnShEx ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrNeedShExReport", brNeedShExReport ? 1 : 0), // Convert bool to int
                    new SqlParameter("@BrTypeId", brTypeId),
                    new SqlParameter("@BrAreaId", brAreaId),
                    new SqlParameter("@BrClosedOn", (object)brClosedOn ?? DBNull.Value),
                    new SqlParameter("@BrCreatedBy", brCreatedBy),
                    new SqlParameter("@BrCreatedOn", brCreatedOn),
                    new SqlParameter("@OldCode", (object)oldCode ?? DBNull.Value)
                );

                return result;
            }
            catch (Exception ex)
            {
                // Log or handle exception as needed
                throw new InvalidOperationException("Error executing stored procedure", ex);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Branch>()
                .HasKey(b => b.BrId);
        }
    }
}
