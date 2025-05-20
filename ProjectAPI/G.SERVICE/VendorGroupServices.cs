using Dapper;
using G.ENTITY;
using G.ENTITY.G.ENTITY;
using G.REPOSITORY;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.SERVICE
{
    public interface IVendorGroupService
    {
        List<VendorGroup> GetAll();


        List<VendorGroup> GetVendorGroup(string filterField = null, string filterCondition = null, string filterValue = null);

        string GetNextVendorGroupCode();

        DB_STATUS SaveVendorGroup(VendorGroup grp);

        VendorGroup GetVendorGrp_id(long VendorG_Id);

        List<VendorLocation>GetVendorLocation(string filterField = null, string filterCondition = null, string filterValue = null);


    }

    public class VendorGroupService : IVendorGroupService
    {
        private readonly IDapperRepository _dapperRepository;

        public VendorGroupService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }

        public List<VendorGroup> GetAll()
        {
            List<VendorGroup> list;
            try
            {
                // No parameters needed for this stored procedure
                list = _dapperRepository.GetAll<VendorGroup>("[dbo].[G_Get_VendorGroups_Api]",
                    null,
                    commandType: CommandType.StoredProcedure);
            }
            catch
            {
                throw;  // Consider logging or handling the exception
            }

            return list;
        }



        public List<VendorGroup> GetVendorGroup(string FilterField = null, string FilterCondition = null, string FilterValue = null)
        {
            List<VendorGroup> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                result = _dapperRepository.GetAll<VendorGroup>("[dbo].[G_Get_VendorGroup_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch
            {
                throw;
            }
            finally
            {
                // Optional: Clean-up code if needed
            }
            return result;
        }



        public string GetNextVendorGroupCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Next_VendorGroupCode_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }

        public DB_STATUS SaveVendorGroup(VendorGroup model)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("@VendorG_Id", model.VendorG_Id);               // Input: VendorG_Id (0 for insert)
                parameters.Add("@VendorG_Code", model.VendorG_Code);           // Input: VendorG_Code (non-null)
                parameters.Add("@VendorG_NameEn", model.VendorG_NameEn);       // Input: VendorG_NameEn (non-null)
                parameters.Add("@VendorG_NameAr", model.VendorG_NameAr);       // Input: VendorG_NameAr (non-null)
                parameters.Add("@VendorG_CreatedBy", model.VendorG_CreatedBy); // Input: VendorG_CreatedBy (non-null)


                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_VendorGroups_Api]", parameters, CommandType.StoredProcedure);

                var resultCode = parameters.Get<int>("@Result");

                if (resultCode > 0)
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Pay Type saved successfully.",
                        Id = resultCode
                    };
                }
                else
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Branch record was not saved successfully."
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
                    StatusMessage = "An unexpected error occurred while saving the branch record."
                };
            }
        }



        public VendorGroup GetVendorGrp_id(long VendorG_Id)
        {
            VendorGroup? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@VendorG_Id ", VendorG_Id, DbType.Int32);

                result = _dapperRepository.Get<VendorGroup>("[dbo].[G_Get_VendorGroupById_Api]"
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



        public List<VendorLocation> GetVendorLocation(string FilterField = null, string FilterCondition = null, string FilterValue = null)
        {
            List<VendorLocation> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                result = _dapperRepository.GetAll<VendorLocation>("[dbo].[G_Get_VendorLocations_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch
            {
                throw;
            }
            finally
            {
                // Optional: Clean-up code if needed
            }
            return result;
        }



    }
}
