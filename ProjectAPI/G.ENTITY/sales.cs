using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public  class sales
    {



    }



    
            
        // Define models for both result sets
        public class SerialStatusResult
        {
            public string Serial_Parent { get; set; }
            public string Serial_No { get; set; }
            public string ItemNo { get; set; }
            public string StockCode { get; set; }
            public decimal CurrSp { get; set; }
            public decimal ActualSp { get; set; }
            public decimal RetLaCa { get; set; }
            public decimal RetCa { get; set; }
            public decimal RetLaCr { get; set; }
            public decimal RetCr { get; set; }
            public decimal WhCa { get; set; }
            public decimal WhCr { get; set; }
            public decimal BulkCa { get; set; }
            public decimal BulkCr { get; set; }
            public decimal AvgCost { get; set; }
            public decimal Cp { get; set; }
            public string ExpDate { get; set; }
            public decimal DiscAmt { get; set; }
            public string NameFull { get; set; }
            public string PartNo { get; set; }
            public string Unit { get; set; }
            public int CurrStock { get; set; }
            public int ReOrderQty { get; set; }
            public string Loc { get; set; }
            public int Factor { get; set; }
            public int FF { get; set; }
            public int SerialId { get; set; }
            public int PriceId { get; set; }
            public int UnitDetId { get; set; }
            public int ItemId { get; set; }
            public int UnitId { get; set; }
        }

        public class TransactionStatusResult
        {
            public int FinalStatus { get; set; }
            public int LastTrans { get; set; }
            public string MsgUI { get; set; }
            public int TrnID { get; set; }
            public int TrnNumber { get; set; }
            public string TrnDate { get; set; }
            public string VendorNo { get; set; }
            public string VendorName { get; set; }
            public int TrnBranchID { get; set; }
            public string TrnBranch { get; set; }
            public int TrnToBranchID { get; set; }
            public string TrnToBranch { get; set; }
        }

        public class SerialCheckRequest
        {
            public string SerialNo { get; set; }
            public short FlagToCheck { get; set; }
            public short? PaytypeID { get; set; }
            public long? CustID { get; set; }
            public long? JobCardID { get; set; }
            public long? InvID { get; set; }
            public string SalesType { get; set; }
            public short? ToBrID { get; set; }
            public long? VndrID { get; set; }
            public short? SalesMechID { get; set; }
            public short? SalesMechGrpID { get; set; }
        }




    public class SerialResult
    {
        public long Serial_Id { get; set; }
        public string Serial_Parent { get; set; }
        public string Serial_No { get; set; }
        public long Serial_UnitDetId { get; set; }
        public short Serial_LastTrans { get; set; }
        public decimal Serial_SalesPrice { get; set; }
        public decimal Serial_AgentPrice { get; set; }
        public decimal Serial_CostPrice { get; set; }
        public DateTime? Serial_ExpDate { get; set; }
        public short Serial_Level { get; set; }
    }



    public class SerialLogRequest
    {
        public string SerialNo { get; set; }
        public int TableFlag { get; set; }
        public string FormUID { get; set; }
        public string SysName { get; set; }
        public string ReadBy { get; set; }
    }



    public class SalesListDto
    {
        public string Sa_No { get; set; } = string.Empty;
        public DateTime? Sa_Date { get; set; }
        public string PayType_NameEn { get; set; } = string.Empty;
        public int Sa_TotQty { get; set; } = 0;
        public decimal Sa_TotAmt { get; set; } = 0;
        public string CustomerName { get; set; } = string.Empty;
        public string SalesmanName { get; set; } = string.Empty;
        public string CreatedByName { get; set; } = string.Empty;
    }

    public class CustomerList
    {
        public string Cust_Code { get; set; }
        public string Cust_BrRelCode { get; set; }
        public string Cust_NameEn { get; set; }
        public string Cust_NameAr { get; set; }
        public string Cust_AddrEn1 { get; set; }
        public string Cust_Phone { get; set; }
        public string Cust_Fax { get; set; }
        public string Cust_Mobile { get; set; }
        public string Cust_Email { get; set; }
        public bool Cust_IsActive { get; set; }
        public decimal Cust_CrLimit { get; set; }
        public string Br_NameEn { get; set; }
    }



    public class SuspectedSerialDto
    {
        public int Susp_ID { get; set; }
        public string Susp_SerialNo { get; set; }
        public string Susp_TxnDet { get; set; }
        public long Susp_InvNo { get; set; }
        public string Susp_ErrMsg { get; set; }
        public string Susp_SysName { get; set; }
        public int Susp_BrID { get; set; }
        public int Susp_EnteredBy { get; set; }
    }


    public class VatDetails
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        public decimal TaxPerc { get; set; }
    }



    public class SalesInvoiceDto
    {
        public long? Sa_Id { get; set; }
        public string Sa_No { get; set; }
        public DateTime Sa_Date { get; set; }
        public DateTime Sa_DueDate { get; set; }
        public int Sa_CustID { get; set; }

        public char? @Sa_InvType { get; set; }
        public char Sa_SalesType { get; set; }
        public int Sa_PaytypeID { get; set; }
        public string ? Sa_CardNo { get; set; }
        public decimal? Sa_CardAmt { get; set; }
        public char? Sa_CardType { get; set; }
        public string? Sa_AuthCode { get; set; }
        public int Sa_TotQty { get; set; }
        public decimal Sa_TotAmt { get; set; }
        public decimal? Sa_DiscAmt { get; set; }
        public decimal? Sa_VATAmt { get; set; }
        public decimal Sa_TotCost { get; set; }
        public long? Sa_OrderID { get; set; }
        public long? Sa_PickingID { get; set; }
        public int? Sa_SalesmanID { get; set; }
        public string? Sa_DeliveryNotes { get; set; }
        public string? Sa_Notes { get; set; }
        public DateTime? Sa_PayDate { get; set; }
        public int Sa_CreatedBy { get; set; }
        public long? Sa_JobCardId { get; set; }
        public int Sa_BrId { get; set; }
        public decimal? Sa_RetAmt { get; set; }
        public decimal? Sa_DepositAmt { get; set; }
        public bool UpdateMainOnly { get; set; }
        public List<SalesDetailModel> SalesDetail { get; set; }
        public List<SerialDetailModel> SerialDetail { get; set; }
    }

    public class SalesDetailModel
    {
        public int SaDet_Id { get; set; }
        public short SaDet_RowNo { get; set; }

        public int SaDet_MainId { get; set; }
        public long SaDet_UnitDetID { get; set; }

        public char? SaDet_Type { get; set; }
        public decimal SaDet_Qty { get; set; }
        public decimal SaDet_Price { get; set; }
        public decimal SaDet_ActualPrice { get; set; }
        public decimal SaDet_DiscPerc { get; set; }
        public decimal SaDet_TotCost { get; set; }
        public decimal SaDet_VATPerc { get; set; }
        public int SaDet_ItemTaxCode { get; set; }
    }

    public class SerialDetailModel
    {

        public long Trans_Id { get; set; }
        public long Trans_TableId { get; set; }

        public int Trans_Flag { get; set; } 
        public long Trans_PriceId { get; set; }
        public long Trans_SerialId { get; set; }

        public long Trans_UnitDetId { get; set; }


        public string @Trans_SrlNo {  get; set; }
    }




    public class SalesInvoiceSrlDetails
    {
        public int Serial_Id { get; set; }
        public string Serial_Parent { get; set; }
        public string Serial_No { get; set; }
        public int Serial_UnitDetId { get; set; }
        public string Serial_LastTrans { get; set; }
        public decimal Serial_AgentPrice { get; set; }
        public decimal Serial_CostPrice { get; set; }
        public bool Serial_IsBonus { get; set; }
        public DateTime? Serial_ExpDate { get; set; }
        public bool Serial_AllowWh { get; set; }
        public bool Serial_AllowBulk { get; set; }
        public bool Serial_AllowCr { get; set; }
        public bool Serial_AllowCCr { get; set; }
        public decimal Serial_DiscAmt { get; set; }
        public int LocId { get; set; }


        public string Sa_Notes { get; set; }
        public string Sa_DeliveryNotes { get; set; }
        public DateTime? Sa_DueDate { get; set; }
        public DateTime? Sa_Date { get; set; }
        public string SaDet_Type { get; set; }




    }

    public class CardInvoiceNo


    {

        public int Card_Id { get; set; }
        public int Card_Code { get; set; }
        public string CGen_Number { get; set; }
    }




}


