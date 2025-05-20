using Dapper;
using G.ENTITY;
using G.REPOSITORY;
using System;
using System.Collections.Generic;
using System.Data;

namespace G.SERVICE
{
    public interface ICardService
    {
        List<CardCustomer> GetCardCustomers(int? COwner_Id = null, string? COwner_Code = null, string? COwner_NameEn = null, string? COwner_NameAr = null, string? COwner_OwnerNameEn = null, string? COwner_OwnerNameAr = null, string? COwner_ContactNo = null, string? Card_CarPlateEn = null, string? Card_CarPlateAr = null, int? Make_Id = null, string? Make_NameEn = null, string? Make_NameAr = null, int? Model_id = null, string? Model_NameEn = null, string? Model_NameAr = null);



        object GetCardCustomerPaginated(int pageNumber, int pageSize, string filterField, string filterCondition, string filterValue);


        List<JOrderTypeModel> GetJobOrderTypes();


        string GetNxtCardCode();


        List<JOrderStatus> GetJobOrderStatus();

        object GetCardEmployeesPaginated(int pageNumber, int pageSize, string filterField, string filterCondition, string filterValue);

        List<MechanicGroup> GetMechGroup(int BrId, int Criteria, int? MechGrpId = null);



        object GetCarddetailsrPaginated(byte cr, int? brId, bool? jOrderStatus, long? jobOrderId, int pageNumber, int pageSize, out int totalCount, string? filterField = null, string? filterCondition = null, string? filterValue = null);

        //  CGenNumberResponse GetNextCGenNumber(int brId, string cardStatusCode);


        // string GetNextCGenNumber(int brId, string cardStatusCode);


        CGenNumberResponse GetNextCGenNumber(int brId, string cardStatusCode);

        string GetNextLabourCode();


        string GetNextOldPartCode();

        List<LabourDetailsModel> GetLabourDetails(int criteria, long? lbDet_CardId = null, int? lbDet_IsCancelled = null, long? lbDet_Id = null, short? lbDet_MechId = null);

        List<LabourGroup> GetLabourGrpJobs(int LGrp_ParentId, int Criteria , string? filterField = null, string? filterCondition = null, string? filterValue = null);


        List<LabourGroup> GetLabourGrpJobs2( string? filterField = null, string? filterCondition = null, string? filterValue = null);



        List<MitchelTimeDto> GetMitchelTime(int CarModelId, int LGrpId);


        DB_STATUS SaveLabourDetails(LabourDetail part);


        List<LabourStatus> GetLabourStatusHead();


        List<LabourStatusDetail> GetLabourStatusDetails(int Criteria, int? LbStatDet_HeadId);

        DB_STATUS SaveCardMain(JobOrder card);


        DB_STATUS SaveLabourCommission (LabourCommissionRequest card);


        DB_STATUS UpdateCardStatus(UpdateCardStatusRequest status);


        List<JOrderStatus> GetJobOrderStatus_ById(int statusid);


        DB_STATUS SaveCommissionAllLabour (InsertLabourCommission  labour );


        string GetCardId(string CardCode , int BranchId);



        List<OldPartDetails> GetOldParts(int Criteria, long? COld_CardId = null, int? COld_IsReturned = null, long? COld_Id = null);



        List<CardStorePartDto> GetStoreParts(long  SaJobcardid, int SaBrId);


        List<CardOutSidePartDto> GetOutsideParts(long Card_Id, int Br_Id, int IsReturned);

        List<CustomerPartDetails> GetCustPartDetails(long CPart_CardId, int CPart_IsReturned, int criteria);



        List<JobOrderNetAmounts> GetJobOrderNetAmts(long Card_Id, int Br_Id);


        DB_STATUS SaveOldParts(CardOldPartModel oldpart);


        string GetNxtOldPartCode();



        DB_STATUS SaveCustparts(CustomerPartDto custpart);


        string GetNxtCustCode ();


    }

    public class CardService : ICardService
    {
        private readonly IDapperRepository _dapperRepository;

        public CardService(IDapperRepository dapperRepository)
        {
            _dapperRepository = dapperRepository;
        }

        public List<CardCustomer> GetCardCustomers(int? COwner_Id = null, string? COwner_Code = null, string? COwner_NameEn = null, string? COwner_NameAr = null, string? COwner_OwnerNameEn = null, string? COwner_OwnerNameAr = null, string? COwner_ContactNo = null, string? Card_CarPlateEn = null, string? Card_CarPlateAr = null, int? Make_Id = null, string? Make_NameEn = null, string? Make_NameAr = null, int? Model_Id = null, string? Model_NameEn = null, string? Model_NameAr = null)

        {
            List<CardCustomer> result = new List<CardCustomer>();

            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@COwner_Id", COwner_Id, DbType.Int32);
                dbparams.Add("@COwner_Code", COwner_Code, DbType.String);
                dbparams.Add("@COwner_NameEn", COwner_NameEn, DbType.String);
                dbparams.Add("@COwner_NameAr", COwner_NameAr, DbType.String);
                dbparams.Add("@COwner_OwnerNameEn", COwner_OwnerNameEn, DbType.String);
                dbparams.Add("@COwner_OwnerNameAr", COwner_OwnerNameAr, DbType.String);
                dbparams.Add("@COwner_ContactNo", COwner_ContactNo, DbType.String);
                dbparams.Add("@Card_CarPlateEn", Card_CarPlateEn, DbType.String);
                dbparams.Add("@Card_CarPlateAr", Card_CarPlateAr, DbType.String);
                dbparams.Add("@Make_Id", Make_Id, DbType.String);
                dbparams.Add("@Make_NameEn", Make_NameEn, DbType.String);
                dbparams.Add("@Make_NameAr", Make_NameAr, DbType.String);
                dbparams.Add("@Model_Id", Model_Id, DbType.String);
                dbparams.Add("@Model_NameEn", Model_NameEn, DbType.String);
                dbparams.Add("@Model_NameAr", Model_NameAr, DbType.String);

                result = _dapperRepository.GetAll<CardCustomer>(
                    "[dbo].[G_Get_Card_Customers_Dtls]", // ✅ Stored Procedure Call
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching card customers", ex);
            }

            return result;
        }


        public object GetCardCustomerPaginated(int pageNumber, int pageSize, string? filterField = null, string? filterCondition = null, string? filterValue = null)

        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageNumber", pageNumber, DbType.Int32);
            parameters.Add("@PageSize", pageSize, DbType.Int32);
            parameters.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

            // Add filtering parameters dynamically
            parameters.Add("@FilterField", string.IsNullOrEmpty(filterField) ? DBNull.Value : filterField, DbType.String);
            parameters.Add("@FilterCondition", string.IsNullOrEmpty(filterCondition) ? DBNull.Value : filterCondition, DbType.String);
            parameters.Add("@FilterValue", string.IsNullOrEmpty(filterValue) ? DBNull.Value : filterValue, DbType.String);

            // Execute the stored procedure and get the list of items
            var items = _dapperRepository.GetAll<CardCustomer>(
                "G_Get_Card_Customers_Dtls_Paginated_Api",
                parameters,
                CommandType.StoredProcedure
            ) ?? new List<CardCustomer>(); // Ensures items is never null

            // Retrieve total count after execution
            int totalCount = parameters.Get<int>("@TotalCount");

            // Return both items and total count
            return new
            {
                Items = items,
                TotalCount = totalCount
            };
        }



        public List<JOrderTypeModel> GetJobOrderTypes()
        {
            List<JOrderTypeModel> result = null;
            try
            {
                var dbparams = new DynamicParameters();
                
                result = _dapperRepository.GetAll<JOrderTypeModel>("[dbo].[G_Get_JOrderTypes_Api]",
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




        public string GetNxtCardCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Get_Next_CardCode_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public List<JOrderStatus> GetJobOrderStatus()
        {
            List<JOrderStatus> result = null;
            try
            {
                var dbparams = new DynamicParameters();

                result = _dapperRepository.GetAll<JOrderStatus>("[dbo].[G_GetJOrderStatHead_Api]",
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

        public object GetCardEmployeesPaginated(int pageNumber, int pageSize, string? filterField = null, string? filterCondition = null, string? filterValue = null)

        {
            var parameters = new DynamicParameters();
            parameters.Add("@PageNumber", pageNumber, DbType.Int32);
            parameters.Add("@PageSize", pageSize, DbType.Int32);
            parameters.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

            // Add filtering parameters dynamically
            parameters.Add("@FilterField", string.IsNullOrEmpty(filterField) ? DBNull.Value : filterField, DbType.String);
            parameters.Add("@FilterCondition", string.IsNullOrEmpty(filterCondition) ? DBNull.Value : filterCondition, DbType.String);
            parameters.Add("@FilterValue", string.IsNullOrEmpty(filterValue) ? DBNull.Value : filterValue, DbType.String);

            // Execute the stored procedure and get the list of items
            var items = _dapperRepository.GetAll<CardEmployee>(
                "G_Get_CardEmployees_Api",
                parameters,
                CommandType.StoredProcedure
            ) ?? new List<CardEmployee>(); // Ensures items is never null

            // Retrieve total count after execution
            int totalCount = parameters.Get<int>("@TotalCount");

            // Return both items and total count
            return new
            {
                Items = items,
                TotalCount = totalCount
            };
        }


        public List<MechanicGroup> GetMechGroup(int BrId, int Criteria, int? MechGrpId = null)
        {
            List<MechanicGroup> result = null;
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BrId", BrId, DbType.Int16);
                parameters.Add("@Criteria", Criteria, DbType.Int16);
                parameters.Add("@MechGrp_Id", MechGrpId, DbType.Int16);

                result = _dapperRepository.GetAll<MechanicGroup>(
                    "[dbo].[G_GetMechGroups_Api]", // ✅ Correct schema
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching mechanic groups", ex); // ✅ Improved error handling
            }

            return result;
        }


        public object GetCarddetailsrPaginated(byte cr, int? brId, bool? jOrderStatus, long? jobOrderId, int pageNumber, int pageSize, out int totalCount, string? filterField = null, string? filterCondition = null, string? filterValue = null)


        
        {

            var parameters = new DynamicParameters();
            parameters.Add("@Cr", cr, DbType.Byte);
            parameters.Add("@BrId", brId ?? (object)DBNull.Value, DbType.Int32);
            parameters.Add("@JOrderStatus", jOrderStatus ?? (object)DBNull.Value, DbType.Boolean);
            parameters.Add("@JobOrderId", jobOrderId ?? (object)DBNull.Value, DbType.Int64);
            parameters.Add("@PageNumber", pageNumber, DbType.Int32);
            parameters.Add("@PageSize", pageSize, DbType.Int32);
            parameters.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

            // Add filtering parameters dynamically
            parameters.Add("@FilterField", string.IsNullOrEmpty(filterField) ? DBNull.Value : filterField, DbType.String);
            parameters.Add("@FilterCondition", string.IsNullOrEmpty(filterCondition) ? DBNull.Value : filterCondition, DbType.String);
            parameters.Add("@FilterValue", string.IsNullOrEmpty(filterValue) ? DBNull.Value : filterValue, DbType.String);

            // Execute stored procedure and get the list of items
            var items = _dapperRepository.GetAll<JobCard>(
                "G_GetJobOrder_Api",
                parameters,
                CommandType.StoredProcedure
            ) ?? new List<JobCard>(); // Ensures items is never null

            // Retrieve total count after execution
            totalCount = parameters.Get<int>("@TotalCount");

            return new { Items = items, TotalCount = totalCount };
        }





        public CGenNumberResponse GetNextCGenNumber(int brId, string cardStatusCode)
        {
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@BrId", brId, DbType.Int32);
                dbparams.Add("@CardStatusCode", cardStatusCode, DbType.String);

                var result = _dapperRepository.Get<CGenNumberResponse>(
                    "[dbo].[G_Get_FetchCGenNumber_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure
                );

                return result ?? new CGenNumberResponse(); // Ensure a non-null return
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching NextCGenNumber: {ex.Message}");
                throw;
            }
        }




        //public string GetNextCGenNumber(int brId, string cardStatusCode)
        //{

        //    var parameters = new DynamicParameters();
        //    parameters.Add("@BrId", brId, DbType.Int32);
        //    parameters.Add("@CardStatusCode", cardStatusCode, DbType.String);

        //    var result = _dapperRepository.Execute("dbo.[G_Get_FetchCGenNumber_Api]", parameters, CommandType.StoredProcedure);
        //    return result?.ToString() ?? string.Empty;
        //}

        public string GetNextLabourCode()
        {
            var parameters = new DynamicParameters();
         
            var result = _dapperRepository.Execute("dbo.[G_Get_NextLabourCode_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public string GetNextOldPartCode()
        {
            var parameters = new DynamicParameters();

            var result = _dapperRepository.Execute("dbo.[G_Get_NextOldPartsCode_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }




        public List<LabourDetailsModel> GetLabourDetails(int criteria, long? lbDet_CardId = null, int? lbDet_IsCancelled = null, long? lbDet_Id = null, short? lbDet_MechId = null)
        {
            List<LabourDetailsModel> result = new List<LabourDetailsModel>();
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Criteria", criteria, DbType.Int32);
                dbparams.Add("@LbDet_CardId", lbDet_CardId, DbType.Int64);
                dbparams.Add("@LbDet_IsCancelled", lbDet_IsCancelled, DbType.Int32);
                dbparams.Add("@LbDet_Id", lbDet_Id, DbType.Int64);
                dbparams.Add("@LbDet_MechId", lbDet_MechId, DbType.Int16);

                result = _dapperRepository.GetAll<LabourDetailsModel>(
                    "[dbo].[G_FindLabourDetails_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching labour details", ex);
            }
            return result;
        }



        public List<LabourGroup> GetLabourGrpJobs(int LGrp_ParentId, int Criteria, string? filterField = null, string? filterCondition = null, string? filterValue = null)
        {
            List<LabourGroup> result = new List<LabourGroup>();
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@LGrp_ParentId", LGrp_ParentId, DbType.Int32);
                dbparams.Add("@Criteria", Criteria, DbType.Int32);
                dbparams.Add("@FilterField", filterField, DbType.String);
                dbparams.Add("@FilterCondition", filterCondition, DbType.String);
                dbparams.Add("@FilterValue", filterValue, DbType.String);

                result = _dapperRepository.GetAll<LabourGroup>(
                    "[dbo].[G_Wsp_LbGrpSrch_Api]",  // Correct Stored Procedure
                    dbparams,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching labour group jobs", ex);
            }
            return result;
        }




        public List<LabourGroup> GetLabourGrpJobs2 (string? filterField = null, string? filterCondition = null, string? filterValue = null)
        {
            List<LabourGroup> result = new List<LabourGroup>();
            try
            {
                var dbparams = new DynamicParameters();
              
                dbparams.Add("@FilterField", filterField, DbType.String);
                dbparams.Add("@FilterCondition", filterCondition, DbType.String);
                dbparams.Add("@FilterValue", filterValue, DbType.String);

                result = _dapperRepository.GetAll<LabourGroup>(
                    "[dbo].[G_Wsp_LbGrpSrch_Api2]",  // Correct Stored Procedure
                    dbparams,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching labour group jobs", ex);
            }
            return result;
        }



        public List<MitchelTimeDto> GetMitchelTime(int carModelId, int lGrpId)
        {
            List<MitchelTimeDto> result = new List<MitchelTimeDto>();

            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@CarModelId", carModelId, DbType.Int32);
                dbparams.Add("@LGrpId", lGrpId, DbType.Int32);

                result = _dapperRepository.GetAll<MitchelTimeDto>(
                    "[dbo].[G_FindMitchelTime_Api]",  // Correct Stored Procedure Name
                    dbparams,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching Mitchell time data", ex);
            }

            return result;
        }





        public DB_STATUS SaveLabourDetails(LabourDetail labourDetail)
        {
            try
            {
                if (labourDetail == null)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid labour detail data."
                    };
                }

                var parameters = new DynamicParameters();

                // Add parameters for Labour Details
                parameters.Add("@LbDet_Id", labourDetail.LbDet_Id);
                parameters.Add("@LbDet_Code", labourDetail.LbDet_Code);
                parameters.Add("@LbDet_Date", labourDetail.LbDet_Date);
                parameters.Add("@LbDet_CardId", labourDetail.LbDet_CardId);
                parameters.Add("@LbDet_LGrpId", labourDetail.LbDet_LGrpId);
                parameters.Add("@LbDet_MechGrpId", labourDetail.LbDet_MechGrpId);
                parameters.Add("@LbDet_MechId", labourDetail.LbDet_MechId);
                parameters.Add("@LbDet_Qty", labourDetail.LbDet_Qty);
                parameters.Add("@LbDet_VATPerc", labourDetail.LbDet_VATPerc);
                parameters.Add("@LbDet_VATAmt", labourDetail.LbDet_VATAmt);
                parameters.Add("@LbDet_Rate", labourDetail.LbDet_Rate);
                parameters.Add("@LbDet_LabStatId", labourDetail.LbDet_LabStatId);
                parameters.Add("@LbDet_LabStatDetId", labourDetail.LbDet_LabStatDetId);
                parameters.Add("@LbDet_EndDate", labourDetail.LbDet_EndDate);
                parameters.Add("@LbDet_WDays", labourDetail.LbDet_WDays);
                parameters.Add("@LbDet_WHrs", labourDetail.LbDet_WHrs);
                parameters.Add("@LbDet_WMins", labourDetail.LbDet_WMins);
                parameters.Add("@LbDet_WSecs", labourDetail.LbDet_WSecs);
                parameters.Add("@LbDet_Comm", labourDetail.LbDet_Comm);
                parameters.Add("@LbDet_MitchelTime", labourDetail.LbDet_MitchelTime);
                parameters.Add("@LbDet_SkillLevel", labourDetail.LbDet_SkillLevel);
                parameters.Add("@LbDet_NormalTime", labourDetail.LbDet_NormalTime);
                parameters.Add("@LbDet_UserId", labourDetail.LbDet_UserId);
                parameters.Add("@LbDet_BranchId", labourDetail.LbDet_BranchId);
                parameters.Add("@LbDet_IsActive", labourDetail.LbDet_IsActive);
                parameters.Add("@LbDet_IsCancelled", labourDetail.LbDet_IsCancelled);

                // Output parameter for stored procedure result
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Execute stored procedure
                _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_LabourDetails_Api]", parameters, CommandType.StoredProcedure);

                // Retrieve the output result
                var resultCode = parameters.Get<int>("@Result");

                return resultCode == 1
                    ? new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Labour details inserted successfully."
                    }
                    : new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Failed to insert labour details."
                    };
            }
            catch (Exception ex)
            {
                // Log the error if logging is set up
                //_logger.LogError(ex, "Error saving LabourDetails");

                return new DB_STATUS
                {
                    Status = "Error",
                    Success = false,
                    StatusMessage = $"An unexpected error occurred: {ex.Message}"
                };
            }
        }



        public List<LabourStatus> GetLabourStatusHead()
        {
            List<LabourStatus> result = new List<LabourStatus>();
            try
            {
                var dbparams = new DynamicParameters();

                result = _dapperRepository.GetAll<LabourStatus>("[dbo].[G_Get_LabourStatusHead_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching Labour Status Head", ex);
            }
            return result;
        }




        public List<LabourStatusDetail> GetLabourStatusDetails(int Criteria, int? LbStatDet_HeadId)
        {
            List<LabourStatusDetail> result = new List<LabourStatusDetail>();
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Criteria", Criteria, DbType.Int32);
                    dbparams.Add("@LbStatDet_HeadId", LbStatDet_HeadId, DbType.Int32);
                

                result = _dapperRepository.GetAll<LabourStatusDetail>(
                    "[dbo].[G_Get_LabourStatusDetails_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure
                );
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching Labour Status Details", ex);
            }
            return result;
        }



        public DB_STATUS SaveCardMain(JobOrder job)
        {
            try
            {
                if (job == null)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid job order data."
                    };
                }

                var parameters = new DynamicParameters();

                // Add parameters based on the JobOrder properties
                parameters.Add("@Card_Id", job.Card_Id, DbType.Int64);
                parameters.Add("@Card_Code", job.Card_Code, DbType.Int64);
                parameters.Add("@Card_CGenId", job.Card_CGenId, DbType.Int64);
                parameters.Add("@Card_CrdTypeId", job.Card_CrdTypeId, DbType.Int16);
                parameters.Add("@Card_OpenDate", job.Card_OpenDate, DbType.DateTime);
                parameters.Add("@Card_CloseDate", job.Card_CloseDate, DbType.DateTime);
                parameters.Add("@Card_RecpId", job.Card_RecpId, DbType.Int16);
                parameters.Add("@Card_COwnerId", job.Card_COwnerId, DbType.Int64);
                parameters.Add("@Card_MakeId", job.Card_MakeId, DbType.Int16);
                parameters.Add("@Card_ModelId", job.Card_ModelId, DbType.Int64);
                parameters.Add("@Card_CarYear", job.Card_CarYear, DbType.String);
                parameters.Add("@Card_CarPlateAr", job.Card_CarPlateAr, DbType.String);
                parameters.Add("@Card_CarPlateEn", job.Card_CarPlateEn, DbType.String);
                parameters.Add("@Card_VinCode", job.Card_VinCode, DbType.String);
                parameters.Add("@Card_Kilometer", job.Card_Kilometer, DbType.String);
                parameters.Add("@Card_Engine", job.Card_Engine, DbType.String);
                parameters.Add("@Card_Gear", job.Card_Gear, DbType.String);
                parameters.Add("@Card_deposit", job.Card_deposit, DbType.Decimal);
                parameters.Add("@Card_description", job.Card_description, DbType.String);
                parameters.Add("@Card_StatId", job.Card_StatId, DbType.Int16);
                parameters.Add("@Card_UserId", job.Card_UserId, DbType.Int16);
                parameters.Add("@Card_BranchId", job.Card_BranchId, DbType.Int16);
                parameters.Add("@Card_DemurrageAmt", job.Card_DemurrageAmt, DbType.Decimal);
                parameters.Add("@Card_LabourDiscAmt", job.Card_LabourDiscAmt, DbType.Decimal);
                parameters.Add("@Card_LabourVatAmt", job.Card_LabourVatAmt, DbType.Decimal);
                parameters.Add("@Card_LabourNet", job.Card_LabourNet, DbType.Decimal);
                parameters.Add("@Card_OldPartNet", job.Card_OldPartNet, DbType.Decimal);
                parameters.Add("@Card_CustPartNet", job.Card_CustPartNet, DbType.Decimal);
                parameters.Add("@Card_StorePartNet", job.Card_StorePartNet, DbType.Decimal);
                parameters.Add("@Card_OutSidePartNet", job.Card_OutSidePartNet, DbType.Decimal);
                parameters.Add("@Card_DosNet", job.Card_DosNet, DbType.Decimal);
                parameters.Add("@Card_PaymentMode", job.Card_PaymentMode, DbType.Byte);
                parameters.Add("@Card_SpanAmt", job.Card_SpanAmt, DbType.Decimal);
                parameters.Add("@Card_CashAmt", job.Card_CashAmt, DbType.Decimal);
                parameters.Add("@Card_AuthentCode", job.Card_AuthentCode, DbType.String);
                parameters.Add("@Card_SpanNumber", job.Card_SpanNumber, DbType.String);
                parameters.Add("@Card_NewModelName", job.Card_NewModelName, DbType.String);
                parameters.Add("@Card_NewMakeName", job.Card_NewMakeName, DbType.String);
                parameters.Add("@Card_QtNo", job.Card_QtNo, DbType.Int64);
                parameters.Add("@Card_SpanType", job.Card_SpanType, DbType.String);
                parameters.Add("@Card_SpanCommPerc", job.Card_SpanCommPerc, DbType.Decimal);
                parameters.Add("@Card_SpanCommAmt", job.Card_SpanCommAmt, DbType.Decimal);
                parameters.Add("@Card_SpanName", job.Card_SpanName, DbType.String);
                parameters.Add("@Card_PayType", job.Card_PayType, DbType.String);
                parameters.Add("@Card_WarrantyPeriod", job.Card_WarrantyPeriod, DbType.String);
                parameters.Add("@Card_InsuranceType", job.Card_InsuranceType, DbType.String);
                parameters.Add("@Card_InsuranceExpDate", job.Card_InsuranceExpDate, DbType.String);
                parameters.Add("@Card_PrintCount", job.Card_PrintCount, DbType.Int32);
                parameters.Add("@Card_CarColour", job.Card_CarColour, DbType.String);
                parameters.Add("@Card_CustRefNo", job.Card_CustRefNo, DbType.String);

                // Output parameter for stored procedure result
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Execute the stored procedure
                _dapperRepository.Execute("[dbo].[G_Insert_JobOrder_Api]", parameters, commandType: CommandType.StoredProcedure);

                // Retrieve the output result
                var resultCode = parameters.Get<int>("@Result");

                return resultCode == 1
                    ? new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Job order inserted successfully."
                    }
                    : new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Failed to insert job order."
                    };
            }
            catch (Exception ex)
            {
                return new DB_STATUS
                {
                    Status = "Error",
                    Success = false,
                    StatusMessage = $"An unexpected error occurred: {ex.Message}"
                };
            }
        }





        public DB_STATUS SaveLabourCommission(LabourCommissionRequest job)
        {
            try
            {
                if (job == null)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid job order data or commission percentage."
                    };
                }

                var parameters = new DynamicParameters();

                // Only include relevant parameters for commission update
                parameters.Add("@JobOrderId", job.JobOrderId, DbType.Int64);
                parameters.Add("@CommissionPerc", job.CommissionPerc, DbType.Decimal);

                // Output parameter to capture stored procedure result
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Execute the stored procedure
                _dapperRepository.Execute("[dbo].[G_UpdateCardLabourCommission_Api]", parameters, commandType: CommandType.StoredProcedure);

                // Retrieve output result
                var resultCode = parameters.Get<int>("@Result");

                return resultCode == 1
                    ? new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Labour commission updated successfully."
                    }
                    : new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Failed to update labour commission."
                    };
            }
            catch (Exception ex)
            {
                return new DB_STATUS
                {
                    Status = "Error",
                    Success = false,
                    StatusMessage = $"An unexpected error occurred: {ex.Message}"
                };
            }
        }



        public DB_STATUS UpdateCardStatus(UpdateCardStatusRequest status)
        {
            try
            {
                // Validate request
                if (status == null )
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid input data."
                    };
                }

                var parameters = new DynamicParameters();
                parameters.Add("@CGen_Id", status.CGen_Id, DbType.Int64);
                parameters.Add("@CStatus_Code", status.CStatus_Code, DbType.String, size: 3);
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output); // Output result

                // Execute stored procedure
                _dapperRepository.Execute("[dbo].[G_UpdateCardCgenStatus_Api]", parameters, commandType: CommandType.StoredProcedure);

                // Get output result
                int resultCode = parameters.Get<int>("@Result");

                return resultCode == 1
                    ? new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Card status updated successfully."
                    }
                    : new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Failed to update card status."
                    };
            }
            catch (Exception ex)
            {
               
                return new DB_STATUS
                {
                    Status = "Error",
                    Success = false,
                    StatusMessage = $"An unexpected error occurred: {ex.Message}"
                };
            }
        }



        public List<JOrderStatus> GetJobOrderStatus_ById(int statusid)
        {
            List<JOrderStatus> result = new List<JOrderStatus>(); // Initialize list to avoid null issues
            try
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Statusid", statusid, DbType.Int32); // Pass the parameter correctly

                result = _dapperRepository.GetAll<JOrderStatus>("[dbo].[G_Get_JobStatusById_Api]",
                    dbparams,
                    commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex) // Catch the exception and log it
            {
                // Log the error for debugging (Assuming you have a logger)
                Console.WriteLine($"Error in GetJobOrderStatus_Byid: {ex.Message}");
                throw;
            }

            return result;
        }



        public DB_STATUS SaveCommissionAllLabour(InsertLabourCommission labour)
        {
            try
            {
                // Validate request
                if (labour == null)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid input data."
                    };
                }

                var parameters = new DynamicParameters();
                parameters.Add("@LbDet_CardId", labour.LbDet_CardId, DbType.Int64);
                parameters.Add("@LbDet_Date", labour.LbDet_Date, DbType.DateTime);
                parameters.Add("@Lbdet_BranchId", labour.Lbdet_BranchId, DbType.Int16);
                parameters.Add("@WLComm_JobType", labour.WLComm_JobType, DbType.String, size: 3);
                parameters.Add("@WLComm_IsOk", labour.WLComm_IsOk, DbType.Boolean);
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output); // Output parameter

                // Execute stored procedure
                _dapperRepository.Execute("[dbo].[P_wlabourcommission]", parameters, commandType: CommandType.StoredProcedure);

                // Get output result
                int resultCode = parameters.Get<int>("@Result");

                return resultCode == 1
                    ? new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Labour commission saved successfully."
                    }
                    : new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Failed to save labour commission."
                    };
            }
            catch (Exception ex)
            {
                return new DB_STATUS
                {
                    Status = "Error",
                    Success = false,
                    StatusMessage = $"An unexpected error occurred: {ex.Message}"
                };
            }
        }




        public string GetCardId(string CardCode, int BranchId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@CardCode", CardCode, DbType.String);
            parameters.Add("@BranchId", BranchId, DbType.Int32);

            

            var result = _dapperRepository.Execute("dbo.[G_GetCardIdById_Api]", parameters, CommandType.StoredProcedure);

            return result?.ToString() ?? string.Empty;
        }




        public List<OldPartDetails> GetOldParts(int Criteria, long? COld_CardId = null, int? COld_IsReturned = null, long? COld_Id = null)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Criteria", Criteria, DbType.Int32);
                parameters.Add("@COld_CardId", COld_CardId, DbType.Int64);
                parameters.Add("@COld_IsReturned", COld_IsReturned, DbType.Int32);
                parameters.Add("@COld_Id", COld_Id, DbType.Int64);

                return _dapperRepository.GetAll<OldPartDetails>(
                    "[dbo].[G_FindOldPartDetails_Api]",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ) ?? new List<OldPartDetails>();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching old part details", ex);
            }
        }





        public List<CardStorePartDto> GetStoreParts(long SaJobcardid, int SaBrId)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@SaJobcardid", SaJobcardid, DbType.Int64);
                parameters.Add("@SaBrId", SaBrId, DbType.Int32);

                return _dapperRepository.GetAll<CardStorePartDto>(
                    "[dbo].[G_GetCardStoreParts_Api]",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ) ?? new List<CardStorePartDto>();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching store parts", ex);
            }
        }



        public List<CardOutSidePartDto> GetOutsideParts(long Card_Id, int Br_Id, int IsReturned)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Card_Id", Card_Id, DbType.Int64);
                parameters.Add("@Br_Id", Br_Id, DbType.Int32);
                parameters.Add("@IsReturned", IsReturned, DbType.Int32);

                return _dapperRepository.GetAll<CardOutSidePartDto>(
                    "[dbo].[G_GetCardOutSideParts_Api]",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ) ?? new List<CardOutSidePartDto>();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching outside parts", ex);
            }
        }





        public List<CustomerPartDetails> GetCustPartDetails(long CPart_CardId, int CPart_IsReturned, int criteria)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Criteria", criteria, DbType.Int32);
                parameters.Add("@CPart_CardId", CPart_CardId, DbType.Int64);
                parameters.Add("@CPart_IsReturned", CPart_IsReturned == -1 ? (object)DBNull.Value : CPart_IsReturned, DbType.Int32); // Handle nullable IsReturned
                parameters.Add("@CPart_Id", DBNull.Value, DbType.Int64); // Default to null unless needed

                return _dapperRepository.GetAll<CustomerPartDetails>(
                    "[dbo].[G_FindCustPartDetails_Api]",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ) ?? new List<CustomerPartDetails>();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching customer part details", ex);
            }
        }





        public List<JobOrderNetAmounts> GetJobOrderNetAmts(long Card_Id, int Br_Id)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Card_Id", Card_Id, DbType.Int64);
                parameters.Add("@Br_Id", Br_Id, DbType.Int32);

                return _dapperRepository.GetAll<JobOrderNetAmounts>(
                    "[dbo].[G_JobOrderNetAmts_Api]",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ) ?? new List<JobOrderNetAmounts>();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching job order net amounts", ex);
            }
        }







        public DB_STATUS SaveOldParts(CardOldPartModel oldpart)
        {
            try
            {
                // Validate request
                if (oldpart == null)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid input data."
                    };
                }

                var parameters = new DynamicParameters();
                parameters.Add("@COld_Id", oldpart.COld_Id, DbType.Int64);
                parameters.Add("@COld_Code", oldpart.COld_Code, DbType.Int64);
                parameters.Add("@COld_Type", oldpart.COld_Type, DbType.Int32);
                parameters.Add("@COld_CardId", oldpart.COld_CardId, DbType.Int64);
                parameters.Add("@COld_PartNo", oldpart.COld_PartNo, DbType.String);
                parameters.Add("@COld_PartNameAr", oldpart.COld_PartNameAr, DbType.String);
                parameters.Add("@COld_PartNameEn", oldpart.COld_PartNameEn, DbType.String);
                parameters.Add("@COld_Qty", oldpart.COld_Qty, DbType.Decimal);
                parameters.Add("@COld_Rate", oldpart.COld_Rate, DbType.Decimal);
                parameters.Add("@COld_Date", oldpart.COld_Date, DbType.DateTime);
                parameters.Add("@COld_IsReturned", oldpart.COld_IsReturned, DbType.Boolean);
                parameters.Add("@COld_ReturnDate", oldpart.COld_ReturnDate, DbType.DateTime);
                parameters.Add("@COld_UserId", oldpart.COld_UserId, DbType.Int32);
                parameters.Add("@COld_BranchId", oldpart.COld_BranchId, DbType.Int32);
                parameters.Add("@COld_OEM", oldpart.COld_OEM, DbType.String);
                parameters.Add("@COld_VatPer", oldpart.COld_VatPer, DbType.Decimal);
                parameters.Add("@COld_VatAmt", oldpart.COld_VatAmt, DbType.Decimal);
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Execute stored procedure
                _dapperRepository.Execute("[dbo].[G_InsertCardOldParts_Api]", parameters, commandType: CommandType.StoredProcedure);

                // Get output result
                int resultCode = parameters.Get<int>("@Result");

                return resultCode == 1
                    ? new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Old parts saved successfully."
                    }
                    : new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Failed to save old parts."
                    };
            }
            catch (Exception ex)
            {
                return new DB_STATUS
                {
                    Status = "Error",
                    Success = false,
                    StatusMessage = $"An unexpected error occurred: {ex.Message}"
                };
            }
        }





        public string GetNxtOldPartCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_Get_NextOldPartCode_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }



        public DB_STATUS SaveCustparts(CustomerPartDto custpart)
        {
            try
            {
                // Validate request
                if (custpart == null)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Invalid input data."
                    };
                }

                var parameters = new DynamicParameters();
                parameters.Add("@CPart_Id", custpart.CPart_Id, DbType.Int64);
                parameters.Add("@CPart_Code", custpart.CPart_Code, DbType.Int64);
                parameters.Add("@CPart_Type", custpart.CPart_Type, DbType.Int32);
                parameters.Add("@CPart_CardId", custpart.CPart_CardId, DbType.Int64);
                parameters.Add("@CPart_PartNo", custpart.CPart_PartNo, DbType.String);
                parameters.Add("@CPart_PartNameAr", custpart.CPart_PartNameAr, DbType.String);
                parameters.Add("@CPart_PartNameEn", custpart.CPart_PartNameEn, DbType.String);
                parameters.Add("@CPart_Qty", custpart.CPart_Qty, DbType.Int32);
                parameters.Add("@CPart_Rate", custpart.CPart_Rate, DbType.Decimal);
                parameters.Add("@CPart_Date", custpart.CPart_Date, DbType.DateTime);
                parameters.Add("@CPart_IsReturned", custpart.CPart_IsReturned, DbType.Boolean);
                parameters.Add("@CPart_ReturnDate", custpart.CPart_ReturnDate, DbType.DateTime);
                parameters.Add("@CPart_UserId", custpart.CPart_UserId, DbType.Int32);
                parameters.Add("@CPart_BranchId", custpart.CPart_BranchId, DbType.Int32);
                parameters.Add("@CPart_OEM", custpart.CPart_OEM, DbType.String);
                parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Execute stored procedure
                _dapperRepository.Execute("[dbo].[G_InsertCustomerParts_Api]", parameters, commandType: CommandType.StoredProcedure);

                // Get output result
                int resultCode = parameters.Get<int>("@Result");

                return resultCode == 1
                    ? new DB_STATUS
                    {
                        Status = "Success",
                        Success = true,
                        StatusMessage = "Customer parts saved successfully."
                    }
                    : new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "Failed to save customer parts."
                    };
            }
            catch (Exception ex)
            {
                return new DB_STATUS
                {
                    Status = "Error",
                    Success = false,
                    StatusMessage = $"An unexpected error occurred: {ex.Message}"
                };
            }
        }




        public string GetNxtCustCode()
        {
            var parameters = new DynamicParameters();
            var result = _dapperRepository.Execute("[dbo].[G_GetNxtCustPartCode_Api]", parameters, CommandType.StoredProcedure);
            return result?.ToString() ?? string.Empty;
        }





    }


}



