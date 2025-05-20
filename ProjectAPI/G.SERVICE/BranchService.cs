using G.ENTITY;
using G.REPOSITORY;

using System;
using System.Collections.Generic;
using System.Data;
using Dapper;

namespace G.SERVICE
{
    public interface IBranchService
    {
        
        IEnumerable<BranchModels> GetAllBranches();
        List<BRANCH_MAINResult> GetAll();
        IEnumerable<BranchModels> GetAllBranchesWithPagination(long? branchId, string? code, string? name, bool? isActive, int pageNumber, int pageSize);
        DB_STATUS Save(Branch_Main branch);
        BRANCH_MAINResult Get(long BRANCH_Id);
        string GetNextBranchNumber();
    }

    public class BranchService : IBranchService
    {
        private readonly IDapperRepository _dapperRepository;

        public BranchService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }


        public IEnumerable<BranchModels> GetAllBranches()
        {
            var parameters = new DynamicParameters();
            return _dapperRepository.GetAll<BranchModels>("G_SELECT_ALL_BRANCHES", parameters, CommandType.StoredProcedure);
        }
        public IEnumerable<BranchModels> GetAllBranchesWithPagination(long? branchId, string? code, string? name, bool? isActive, int pageNumber, int pageSize)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@BranchId", branchId, DbType.Int64);
            parameters.Add("@BranchCode", code, DbType.String);
            parameters.Add("@BranchName", name, DbType.String);
            parameters.Add("@IsActive", isActive, DbType.Boolean);
            parameters.Add("@PageNumber", pageNumber, DbType.Int32);
            parameters.Add("@PageSize", pageSize, DbType.Int32);

            return _dapperRepository.GetAll<BranchModels>("dbo.Api_P_SelectBranchDetailsWithPagination", parameters, CommandType.StoredProcedure);
        }
        public DB_STATUS Save(Branch_Main branch)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Br_Id", branch.Br_Id); // Directly pass the ID (0 for new, >0 for update)
                parameters.Add("@Br_Code", branch.Br_Code); // No null check
                parameters.Add("@Br_NameEn", branch.Br_NameEn); // No null check
                parameters.Add("@Br_NameAr", branch.Br_NameAr); // No null check
                parameters.Add("@Br_Address", branch.Br_Address); // No null check
                parameters.Add("@Br_IsActive", branch.Br_IsActive);
                parameters.Add("@Br_IsCurrBranch", branch.Br_IsCurrBranch);
                parameters.Add("@Br_AllowWhSales", branch.Br_AllowWhSales);
                parameters.Add("@Br_AllowBulkSales", branch.Br_AllowBulkSales);
                parameters.Add("@Br_AllowCr", branch.Br_AllowCr);
                parameters.Add("@Br_AllowCCr", branch.Br_AllowCCr);
                parameters.Add("@Br_AllowPurchase", branch.Br_AllowPurchase);
                parameters.Add("@Br_AllowPurchaseRet", branch.Br_AllowPurchaseRet);
                parameters.Add("@Br_AllowTrOut", branch.Br_AllowTrOut);
                parameters.Add("@Br_AllowTrIn", branch.Br_AllowTrIn);
                parameters.Add("@Br_AllowSales", branch.Br_AllowSales);
                parameters.Add("@Br_TransferBasedOnShEx", branch.Br_TransferBasedOnShEx);
                parameters.Add("@Br_NeedShExReport", branch.Br_NeedShExReport);
                parameters.Add("@Br_TypeId", branch.Br_TypeId);
                parameters.Add("@Br_AreaId", branch.Br_AreaId);
                parameters.Add("@Br_ClosedOn", branch.Br_ClosedOn); // Directly pass DateTime, it will be NULL if not set
                parameters.Add("@Br_CreatedBy", branch.Br_CreatedBy);
                parameters.Add("@Br_CreatedOn", branch.Br_CreatedOn); // Directly pass DateTime, it will be NULL if not set
                parameters.Add("@OldCode", branch.OldCode); // No null check

                // Add output parameter for result status
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_INSERT_BRANCH_API]", parameters, CommandType.StoredProcedure);

                var resultCode = parameters.Get<int>("@Result");

                if (resultCode > 0)
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Branch record saved successfully.",
                        Id = resultCode
                    };
                }
                else
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Employee record was not saved successfully."
                    };
                }
            }
            catch (Exception ex)
            {
                // Log the exception details
                return new DB_STATUS
                {
                    Status = "Failure",
                    Success = false,
                    StatusMessage = "An unexpected error occurred while saving the Employee record."
                };
            }
        }


        public string GetNextBranchNumber()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("dbo.[G_NEXTBRANCHCODE_API]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }

        public List<BRANCH_MAINResult> GetAll()
        {
            throw new NotImplementedException();
        }



        public BRANCH_MAINResult Get(long BRANCH_Id)
        {
            BRANCH_MAINResult? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@Br_Id", BRANCH_Id, DbType.Int32);
              
                result = _dapperRepository.Get<BRANCH_MAINResult>("[dbo].[G_BranchDtls_byId_api]"
                    , dbparams,
                    commandType: CommandType.StoredProcedure);

            }
            catch
            {
                throw;
            }
            finally
            {

            }
            return result;
        }
    }
}
