using Dapper;
using G.ENTITY;
using G.REPOSITORY;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace G.SERVICE
{
    public interface ISalesService
    {


        object Check_SrlStatus(SerialCheckRequest request);

        List<SerialResult> GetParentChildSerials(string serialNo, int resType = 0, int level = 0);

        DB_STATUS SaveLogPendingSrls(SerialLogRequest log);


        string GetNxtSalesCode();

        List<SalesListDto> GetSalesList();

        List<CustomerList> GetCustomers();


        DB_STATUS SaveSuspectedSrls(SuspectedSerialDto sup);

        VatDetails GetSalesVatDet(long itemcode);

       List<CardInvoiceNo> CardInvoice();



        DB_STATUS InsertSalesInvoiceAsync(SalesInvoiceDto invoiceDto, DataTable TransferDet, DataTable allRowsSl, out string resultStatus, out string resultMessage);


        List<SalesInvoiceSrlDetails> GetInvoiceSrls(long Sa_No);




        public class SalesService : ISalesService
        {
            private readonly IDapperRepository _dapperRepository;

            public SalesService(IDapperRepository dapperRepository)
            {
                _dapperRepository = dapperRepository;
            }

            public object Check_SrlStatus(SerialCheckRequest request)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@SerialNo", request.SerialNo, DbType.String);
                parameters.Add("@FlagToCheck", request.FlagToCheck, DbType.Int16);
                parameters.Add("@PaytypeID", request.PaytypeID, DbType.Int16);
                parameters.Add("@CustID", request.CustID, DbType.Int64);
                parameters.Add("@JobCardID", request.JobCardID, DbType.Int64);
                parameters.Add("@InvID", request.InvID, DbType.Int64);
                parameters.Add("@SalesType", request.SalesType, DbType.String);
                parameters.Add("@ToBrID", request.ToBrID, DbType.Int16);
                parameters.Add("@VndrID", request.VndrID, DbType.Int64);
                parameters.Add("@SalesMechID", request.SalesMechID, DbType.Int16);
                parameters.Add("@SalesMechGrpID", request.SalesMechGrpID, DbType.Int16);

                // Make sure to retrieve all results in a single call
                var result = _dapperRepository.GetAllMultipleResultSet2Lists<SerialStatusResult, TransactionStatusResult>(
     "[dbo].[G_pCheckSerialStatus_Api]",
     parameters,
     commandType: CommandType.StoredProcedure);

                var serialStatus = result.Item1 ?? new List<SerialStatusResult>();
                var transactionStatus = result.Item2 ?? new List<TransactionStatusResult>();

                return new
                {
                    SerialStatus = serialStatus,
                    TransactionStatus = transactionStatus
                };
            }






            public List<SerialResult> GetParentChildSerials(string serialNo, int resType = 0, int level = 0)
            {
                List<SerialResult> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@SerialNo", serialNo, DbType.String);
                    dbparams.Add("@ResType", resType, DbType.Int16);
                    dbparams.Add("@Level", level, DbType.Int16);

                    result = _dapperRepository.GetAll<SerialResult>(
                        "[dbo].[G_pGetParentChildSrls_Api]",
                        dbparams,
                        commandType: CommandType.StoredProcedure
                    );
                }
                catch (Exception ex)
                {
                    // Log exception if needed
                    throw new Exception("Error fetching parent-child serials", ex);
                }
                return result;
            }



            public DB_STATUS SaveLogPendingSrls(SerialLogRequest model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Input Parameters
                    parameters.Add("@SerialNo", model.SerialNo, DbType.String);
                    parameters.Add("@TableFlag", model.TableFlag, DbType.Int32);
                    parameters.Add("@FormUID", model.FormUID, DbType.String);
                    parameters.Add("@SysName", model.SysName, DbType.String);
                    parameters.Add("@ReadBy", model.ReadBy, DbType.String);

                    // Output Parameters
                    parameters.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    parameters.Add("@ResultMsg", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);

                    _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_INSERT_LOG_PENDINGSERIALS_API]", parameters, CommandType.StoredProcedure);

                    // Fetch output values
                    int resultStatus = parameters.Get<int>("@ResultStatus");
                    string resultMsg = parameters.Get<string>("@ResultMsg");

                    return new DB_STATUS
                    {
                        Status = resultStatus == 1 ? "Success" : "Failure",
                        Success = resultStatus == 1,
                        StatusMessage = resultMsg
                    };
                }
                catch (Exception ex)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = $"An unexpected error occurred: {ex.Message}"
                    };
                }
            }


            public string GetNxtSalesCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_NextSales_Code_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }



            public List<SalesListDto> GetSalesList()
            {
                List<SalesListDto> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                   
                    result = _dapperRepository.GetAll<SalesListDto>("[dbo].[G_Get_SalesList_Api]",
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



            public List<CustomerList> GetCustomers()
            {
                List<CustomerList> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                 

                    result = _dapperRepository.GetAll<CustomerList>("[dbo].[G_Get_CustomersList_Api]",
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




            public DB_STATUS SaveSuspectedSrls(SuspectedSerialDto model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Input Parameters
                    parameters.Add("@id", model.Susp_ID, DbType.Int32);
                    parameters.Add("@serial", model.Susp_SerialNo, DbType.String);
                    parameters.Add("@txnDet", model.Susp_TxnDet, DbType.String);
                    parameters.Add("@invNo", model.Susp_InvNo, DbType.Int64);
                    parameters.Add("@errMsg", model.Susp_ErrMsg, DbType.String);
                    parameters.Add("@sysName", model.Susp_SysName, DbType.String);
                    parameters.Add("@brID", model.Susp_BrID, DbType.Int32);
                    parameters.Add("@enteredBy", model.Susp_EnteredBy, DbType.Int32);

                    // Output Parameters
                    parameters.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    parameters.Add("@ResultMsg", dbType: DbType.String, size: 255, direction: ParameterDirection.Output);

                    _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_SuspectedSrls_Api]", parameters, CommandType.StoredProcedure);

                    // Fetch output values
                    int resultStatus = parameters.Get<int>("@ResultStatus");
                    string resultMsg = parameters.Get<string>("@ResultMsg");

                    return new DB_STATUS
                    {
                        Status = resultStatus == 1 ? "Success" : "Failure",
                        Success = resultStatus == 1,
                        StatusMessage = resultMsg
                    };
                }
                catch (Exception ex)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = $"An unexpected error occurred: {ex.Message}"
                    };
                }
            }




            public VatDetails GetSalesVatDet(long itemcode)
            {
                VatDetails? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@itemcode", itemcode, DbType.Int32);

                    result = _dapperRepository.Get<VatDetails>("[dbo].[G_FetchSalesVatDet_Api]"
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



            public DB_STATUS InsertSalesInvoiceAsync(SalesInvoiceDto invoiceDto, DataTable TransferDet, DataTable allRowsSl, out string resultStatus, out string resultMessage)
            {
                var parameters = new DynamicParameters();

                try
                {
                    // Add all required input parameters
                    parameters.Add("@Sa_Id", invoiceDto.Sa_Id);
                    parameters.Add("@Sa_No", invoiceDto.Sa_No);
                    parameters.Add("@Sa_Date", invoiceDto.Sa_Date);
                    parameters.Add("@Sa_DueDate", invoiceDto.Sa_DueDate);
                    parameters.Add("@Sa_CustID", invoiceDto.Sa_CustID);
                    parameters.Add("@Sa_InvType", invoiceDto.Sa_InvType);
                    parameters.Add("@Sa_SalesType", invoiceDto.Sa_SalesType);
                    parameters.Add("@Sa_PaytypeID", invoiceDto.Sa_PaytypeID);
                    parameters.Add("@Sa_CardNo", invoiceDto.Sa_CardNo);
                    parameters.Add("@Sa_CardAmt", invoiceDto.Sa_CardAmt);
                    parameters.Add("@Sa_CardType", invoiceDto.Sa_CardType);
                    parameters.Add("@Sa_AuthCode", invoiceDto.Sa_AuthCode);
                    parameters.Add("@Sa_TotQty", invoiceDto.Sa_TotQty);
                    parameters.Add("@Sa_TotAmt", invoiceDto.Sa_TotAmt);
                    parameters.Add("@Sa_DiscAmt", invoiceDto.Sa_DiscAmt);
                    parameters.Add("@Sa_VATAmt", invoiceDto.Sa_VATAmt);
                    parameters.Add("@Sa_TotCost", invoiceDto.Sa_TotCost);
                    parameters.Add("@Sa_OrderID", invoiceDto.Sa_OrderID);
                    parameters.Add("@Sa_PickingID", invoiceDto.Sa_PickingID);
                    parameters.Add("@Sa_SalesmanID", invoiceDto.Sa_SalesmanID);
                    parameters.Add("@Sa_DeliveryNotes", invoiceDto.Sa_DeliveryNotes);
                    parameters.Add("@Sa_Notes", invoiceDto.Sa_Notes);
                    parameters.Add("@Sa_PayDate", invoiceDto.Sa_PayDate);
                    parameters.Add("@Sa_CreatedBy", invoiceDto.Sa_CreatedBy);
                    parameters.Add("@Sa_JobCardId", invoiceDto.Sa_JobCardId);
                    parameters.Add("@Sa_BrId", invoiceDto.Sa_BrId);
                    parameters.Add("@Sa_RetAmt", invoiceDto.Sa_RetAmt);
                    parameters.Add("@Sa_DepositAmt", invoiceDto.Sa_DepositAmt);
                    parameters.Add("@UpdateMainOnly", invoiceDto.UpdateMainOnly);

                    // Ensure correct table-valued parameters
                    parameters.Add("@SalesDetail", TransferDet.AsTableValuedParameter("dbo.SalesDtlsType"));
                    parameters.Add("@SerialDetail", allRowsSl.AsTableValuedParameter("dbo.SerialTransType"));

                    // **FIX: Add the required output parameters**
                    parameters.Add("@Status", dbType: DbType.String, direction: ParameterDirection.Output, size: 50);
                    parameters.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 255);

                    // Execute stored procedure
                    var status = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_SalesInvoice_Api]", parameters, CommandType.StoredProcedure);

                    // Retrieve the output values
                    resultStatus = parameters.Get<string>("@Status") ?? "Failure";
                    resultMessage = parameters.Get<string>("@Message") ?? "No status message returned.";

                    // Return response
                    return new DB_STATUS
                    {
                        Status = resultStatus,
                        Success = resultStatus.Equals("Success", StringComparison.OrdinalIgnoreCase),
                        StatusMessage = resultMessage
                    };
                }
                catch (Exception ex)
                {
                    resultStatus = "Error";
                    resultMessage = $"Exception: {ex.Message}";

                    return new DB_STATUS
                    {
                        Status = "Error",
                        Success = false,
                        StatusMessage = resultMessage
                    };
                }
            }





            public List <SalesInvoiceSrlDetails> GetInvoiceSrls(long Sa_No)
            {

                List<SalesInvoiceSrlDetails> result = null;
               
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@sa_no", Sa_No, DbType.Int32);

                    result = _dapperRepository.GetAll<SalesInvoiceSrlDetails>("[dbo].[G_Get_SalesInvoiceSrlDtls_ByID_Api]"
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




            public List<CardInvoiceNo> CardInvoice()
            {
                List<CardInvoiceNo> result = null; // Initialize the list

                try
                {
                    var dbparams = new DynamicParameters();

                    result = _dapperRepository.GetAll<CardInvoiceNo>(
                        "[dbo].[G_Get_CardInvNo_Api]", // Fix: Add comma before commandType
                        dbparams,
                        commandType: CommandType.StoredProcedure
                    );
                }
                catch (Exception ex)
                {
                    // Log the exception (Assuming you have a logger)
                    Console.WriteLine($"Error fetching card invoices: {ex.Message}");
                    throw;
                }

                return result;
            }




        }

    }

}


    











  