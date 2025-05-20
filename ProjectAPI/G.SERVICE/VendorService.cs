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

      public interface IVendorService
{


    IEnumerable<Vendor_Main> GetAllVendors(long vendorType);

        IEnumerable<Vendor_Main> GetAllVendorsDet();
        DB_STATUS Save(VendorInsertModel vendor);
    string GetNextVendorNumber(long vendorType);
        Vendor_Main Get(long Vendor_Id);


    }


    public class VendorService:IVendorService


    {
     
        private readonly IDapperRepository _dapperRepository;

        public VendorService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }

       public IEnumerable<Vendor_Main> GetAllVendors(long  vendorType)
{
    var parameters = new DynamicParameters();
    parameters.Add("@Vendor_Type", vendorType, DbType.Int32);

    return _dapperRepository.GetAll<Vendor_Main>("G_Get_VendorsDtls_Api", parameters, CommandType.StoredProcedure);
}

        public IEnumerable<Vendor_Main> GetAllVendorsDet()
        {
            var parameters = new DynamicParameters();
            return _dapperRepository.GetAll<Vendor_Main>("G_Get_VendorsDet_Api", parameters, CommandType.StoredProcedure);
        }



        public string GetNextVendorNumber(long vendorType)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@vendor_type", vendorType, DbType.Int32);
            var result = _dapperRepository.Execute("dbo.[G_Fetch_Vendor_NxtNum_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public DB_STATUS Save(VendorInsertModel vendor)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add("@Vendor_Id", vendor.Vendor_Id); // 0 for new records, >0 for updates
                parameters.Add("@Vendor_Type", vendor.Vendor_Type);
                parameters.Add("@Vendor_ShortName", vendor.Vendor_ShortName ?? (object)DBNull.Value);
                parameters.Add("@Vendor_NameEn", vendor.Vendor_NameEn ?? (object)DBNull.Value);
                parameters.Add("@Vendor_NameAr", vendor.Vendor_NameAr ?? (object)DBNull.Value);
                parameters.Add("@Vendor_Category", vendor.Vendor_Category); // Ensure this is CHAR(1)
                parameters.Add("@Vendor_RegDate", vendor.Vendor_RegDate ?? (object)DBNull.Value);
                parameters.Add("@Vendor_Address", vendor.Vendor_Address ?? (object)DBNull.Value);
                parameters.Add("@Vendor_Phone", vendor.Vendor_Phone ?? (object)DBNull.Value);
                parameters.Add("@Vendor_Fax", vendor.Vendor_Fax ?? (object)DBNull.Value);
                parameters.Add("@Vendor_Web", vendor.Vendor_Web ?? (object)DBNull.Value);
                parameters.Add("@Vendor_Email", vendor.Vendor_Email ?? (object)DBNull.Value);
                parameters.Add("@Vendor_IsActive", vendor.Vendor_IsActive);
                parameters.Add("@Vendor_LocId", vendor.Vendor_LocId);
                parameters.Add("@Vendor_GroupId", vendor.Vendor_GroupId);
                parameters.Add("@Vendor_PartOriginId", vendor.Vendor_PartOriginId);
                parameters.Add("@Vendor_CreatedBy", vendor.Vendor_CreatedBy);
                parameters.Add("@Vendor_UpdatedBy", vendor.Vendor_UpdatedBy);
                parameters.Add("@Vendor_Notes", vendor.Vendor_Notes ?? (object)DBNull.Value);

                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = _dapperRepository.InsertUpdate<DB_STATUS>(
                    "[dbo].[G_Insert_vendor_Api]", parameters, CommandType.StoredProcedure);

                var resultCode = parameters.Get<int>("@Result");

                if (resultCode > 0)
                {
                    return new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Vendor record saved successfully.",
                        Id = resultCode
                    };
                }
                else
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Vendor record was not saved successfully."
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
                    StatusMessage = "An unexpected error occurred while saving the vendor record."
                };
            }
        }



        public Vendor_Main Get(long Vendor_Id)
        {
            Vendor_Main? result = null;
            try
            {

                var dbparams = new DynamicParameters();
                dbparams.Add("@Vendor_Id", Vendor_Id, DbType.Int32);

                result = _dapperRepository.Get<Vendor_Main>("[dbo].[G_Get_Vendor_By_Id]"
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
