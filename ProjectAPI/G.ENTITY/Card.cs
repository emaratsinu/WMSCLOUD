using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public  class Card
    {
    }




    public class CardCustomer
    {

       
        public int? COwner_Id { get; set; }
        public string? COwner_Code { get; set; }
        public string? COwner_NameEn { get; set; }
        public string? COwner_NameAr { get; set; }
        public string? COwner_OwnerNameEn { get; set; }
        public string? COwner_OwnerNameAr { get; set; }
        public string? COwner_ContactNo { get; set; }
        public string? Card_CarPlateEn { get; set; }
        public string? Card_CarPlateAr { get; set; }
        public int ? Make_Id { get; set; }
        public string? Make_NameEn { get; set; }
        public string? Make_NameAr { get; set; }

        public int? Model_Id { get; set; } 
        public string? Model_NameEn { get; set; }
        public string? Model_NameAr { get; set; }

         public string? Card_CarYear { get; set; }

        public string? Card_VinCode { get; set; }

        public string? Card_Engine { get; set; }


        public string? Card_Gear { get; set; }




    }




    public class JOrderTypeModel
    {
        public int JOrderType_Id { get; set; }
        public string JOrderType_code { get; set; }
        public string JOrderType_DescEn { get; set; }
        public string JOrderType_DescAr { get; set; }
        public string JOrderType_Flag { get; set; }
        public string dispName { get; set; }
    }


    public class JOrderStatus
    {
        public int JOrder_StatId { get; set; }
        public string JOrder_StatCode { get; set; }
        public string JOrder_StatNameAr { get; set; }
        public string JOrder_StatNameEn { get; set; }
        public string dispName { get; set; }
    }



    public class CardEmployee
    {
        public int Emp_Id { get; set; }
        public string Emp_Code { get; set; }
        public string Emp_MainCode { get; set; }
        public string Emp_NameEn { get; set; }
        public string Emp_NameAr { get; set; }
        public string DispNam { get; set; }
        public string Desig_NameEn { get; set; }
        public string Desig_NameAr { get; set; }
        public bool Emp_IsActive { get; set; }
        public bool Emp_IsActiveUser { get; set; }
    }


    public class MechanicGroup
    {
        public int MechGrp_Id { get; set; }
        public string MechGrp_Code { get; set; }
        public string MechGrp_NameAr { get; set; }
        public string MechGrp_NameEn { get; set; }
        public int MechGrp_UserId { get; set; }
        public int MechGrp_BranchId { get; set; }
        public string DispName { get; set; }
        public decimal MechGrp_CommTarget { get; set; }
    }




    public class JobCard
    {
        public int Card_Id { get; set; }
        public int Card_Code { get; set; }
        public int Cgen_Number { get; set; }
        public int Jordertype_Id { get; set; }
        public string Jordertype_Code { get; set; }
        public string Jordertype_DescEn { get; set; }
        public string Jordertype_DescAr { get; set; }
        public int Jorder_StatId { get; set; }
        public string Jorder_StatCode { get; set; }
        public string Jorder_StatNameAr { get; set; }
        public string Jorder_StatNameEn { get; set; }
        public int Emp_Id { get; set; }
        public string Emp_Code { get; set; }
        public string Emp_NameEn { get; set; }
        public string Emp_NameAr { get; set; }
        public int RecpId { get; set; }
        public string RecpCode { get; set; }
        public string RecpNameEn { get; set; }
        public string RecpNameAr { get; set; }
        public int Br_Id { get; set; }
        public string Br_Code { get; set; }
        public string Br_NameAr { get; set; }
        public string Br_NameEn { get; set; }
        public string Br_Address { get; set; }
        public string JobOrderStatDisp { get; set; }
        public DateTime? Card_OpenDate { get; set; }
        public DateTime? Card_CloseDate { get; set; }
        public decimal Card_NetAmt { get; set; }
        public string Card_CarPlateEn { get; set; }
        public string Card_CarPlateAr { get; set; }
        public decimal Card_StorePartNet { get; set; }
        public decimal Card_OldPartNet { get; set; }
        public decimal Card_LabourNet { get; set; }
        public decimal Card_LabourDiscAmt { get; set; }
        public decimal Card_OutsidePartNet { get; set; }
        public decimal Card_DemurrageAmt { get; set; }
        public decimal Card_Deposit { get; set; }
        public int Cowner_Id { get; set; }
        public string Cowner_Code { get; set; }
        public string Cowner_NameEn { get; set; }
        public string Cowner_NameAr { get; set; }
        public string Cowner_ContactNo { get; set; }
        public string Cowner_OwnerNameAr { get; set; }
        public string Cowner_OwnerNameEn { get; set; }
        public int Make_Id { get; set; }
        public string Make_Code { get; set; }
        public string Make_NameEn { get; set; }
        public string Make_NameAr { get; set; }
        public int Model_Id { get; set; }
        public string Model_Code { get; set; }
        public string Model_NameEn { get; set; }
        public string Model_NameAr { get; set; }
        public int Card_CarYear { get; set; }
        public string Card_Kilometer { get; set; }
        public string Card_VinCode { get; set; }
        public string Card_InsuranceType { get; set; }
        public string? Card_InsuranceExpDate { get; set; }
        public string Card_CarColour { get; set; }
        public string Card_WarrantyPeriod { get; set; }
        public string? Card_CloseTime { get; set; }
        public DateTime? Card_CloseTimeDate { get; set; }
        public string MakeDisplayName { get; set; }
        public string ModelDisplayName { get; set; }
        public decimal TotalVatAmt { get; set; }

        // Parts Details
        public int? CardId { get; set; }
        public string ItemCode { get; set; }
        public string ItemNameEn { get; set; }
        public string ItemNameAr { get; set; }
        public string OemNumber { get; set; }
        public decimal Qty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal NetAmount { get; set; }
        public int BrId { get; set; }
        public int TrId { get; set; }
        public string ItemDispName { get; set; }
        public string SrlNoParts { get; set; }
        public string SrlNoLbr { get; set; }

        // Labour Details
        public int Lbdet_Id { get; set; }
        public int Lbdet_CardId { get; set; }
        public string Lgrp_DescAr { get; set; }
        public string Lgrp_DescEn { get; set; }
        public string MechGrp_NameAr { get; set; }
        public string MechGrp_NameEn { get; set; }
        public decimal Lbdet_Qty { get; set; }
        public decimal Lbdet_Rate { get; set; }
        public decimal Lbdet_VATAmt { get; set; }
        public decimal LbdetNetAmt { get; set; }
        public int Lbdet_BranchId { get; set; }
        public decimal LbrDiscAmt { get; set; }
    }



    public class CGenNumberResponse
    {
        public int CGen_Id { get; set; }  // Ensure this matches DB column name
        public int CGEN_NUMBER { get; set; }
    }



    public class LabourDetailsModel
    {
        public long LbDet_Id { get; set; }
        public string LbDet_Code { get; set; }
        public DateTime LbDet_Date { get; set; }
        public long LbDet_CardId { get; set; }
        public string Card_Code { get; set; }
        public long CGen_Id { get; set; }
        public string CGen_Number { get; set; }
        public long LbDet_LGrpId { get; set; }
        public string LGrp_Code { get; set; }
        public string LGrp_DescAr { get; set; }
        public string LGrp_DescEn { get; set; }
        public long LbDet_MechGrpId { get; set; }
        public string MechGrp_Code { get; set; }
        public string MechGrp_NameAr { get; set; }
        public string MechGrp_NameEn { get; set; }
        public long LbDet_MechId { get; set; }
        public string Emp_Code { get; set; }
        public string Emp_NameAr { get; set; }
        public string Emp_NameEn { get; set; }
        public decimal LbDet_Qty { get; set; }
        public decimal LbDet_Rate { get; set; }
        public decimal LbDet_VATPerc { get; set; }
        public decimal LbDet_VATAmt { get; set; }
        public decimal LbDetNetAmt { get; set; }
        public decimal LbDetDiscTotAmt { get; set; }
        public decimal LbDetNetTotal { get; set; }
        public int LbDet_LabStatId { get; set; }
        public string LabStat_Code { get; set; }
        public string LabStat_DescAr { get; set; }
        public string LabStat_DescEn { get; set; }
        public int LbDet_LabStatDetId { get; set; }
        public string LbStatDet_Code { get; set; }
        public string LbStatDet_DescAr { get; set; }
        public string LbStatDet_DescEn { get; set; }
        public DateTime? LbDet_EndDate { get; set; }
        public int LbDet_WDays { get; set; }
        public int LbDet_WHrs { get; set; }
        public int LbDet_WMins { get; set; }
        public int LbDet_WSecs { get; set; }
        public string LbDet_Comm { get; set; }
        public decimal LbDet_MitchelTime { get; set; }
        public string LbDet_SkillLevel { get; set; }
        public decimal LbDet_NormalTime { get; set; }
        public bool LbDet_IsActive { get; set; }
        public bool LbDet_IsCancelled { get; set; }
        public int LbDet_UserId { get; set; }
        public string UserCode { get; set; }
        public string UserNameAr { get; set; }
        public string UserNameEn { get; set; }
        public int LbDet_BranchId { get; set; }
        public string Br_Code { get; set; }
        public string Br_NameEn { get; set; }
        public string Br_NameAr { get; set; }
        public decimal Card_LabourDiscAmt { get; set; }
    }


    public class LabourGroup
    {
        public int LGrp_Id { get; set; }
        public string LGrp_Code { get; set; }
        public string LGrp_DescAr { get; set; }
        public string LGrp_DescEn { get; set; }
        public int LGrp_ParentId { get; set; }
        public int LGrp_Level { get; set; }
    }


    public class MitchelTimeDto
    {
        public decimal LbDet_MitchelTime { get; set; }
        public string LbDet_SkillLevel { get; set; }
        public decimal LbDet_NormalTime { get; set; }
    }


    public class LabourDetail
    {
        public long LbDet_Id { get; set; }
        public string LbDet_Code { get; set; }
        public DateTime LbDet_Date { get; set; }
        public long LbDet_CardId { get; set; }
        public short LbDet_LGrpId { get; set; }
        public short LbDet_MechGrpId { get; set; }
        public short LbDet_MechId { get; set; }
        public decimal LbDet_Qty { get; set; }
        public decimal LbDet_VATPerc { get; set; }
        public decimal LbDet_VATAmt { get; set; }
        public decimal LbDet_Rate { get; set; }
        public short LbDet_LabStatId { get; set; }
        public short LbDet_LabStatDetId { get; set; }
        public DateTime LbDet_EndDate { get; set; }
        public int LbDet_WDays { get; set; }
        public int LbDet_WHrs { get; set; }
        public int LbDet_WMins { get; set; }
        public int LbDet_WSecs { get; set; }
        public decimal LbDet_Comm { get; set; }
        public decimal LbDet_MitchelTime { get; set; }
        public string LbDet_SkillLevel { get; set; }
        public decimal LbDet_NormalTime { get; set; }
        public short LbDet_UserId { get; set; }
        public short LbDet_BranchId { get; set; }
        public bool LbDet_IsActive { get; set; }
        public bool LbDet_IsCancelled { get; set; }
    }



    public class LabourStatus
    {
        public int LabStat_Id { get; set; }
        public string LabStat_Code { get; set; }
        public string LabStat_DescAr { get; set; }
        public string LabStat_DescEn { get; set; }
        public string dispName { get; set; }
    }


    public class LabourStatusDetail
    {
        public int LbStatDet_Id { get; set; }
        public string LbStatDet_Code { get; set; }
        public int LbStatDet_HeadId { get; set; }
        public string LbStatDet_DescAr { get; set; }
        public string LbStatDet_DescEn { get; set; }
        public string DispName { get; set; }
    }



    public class JobOrder
    {
        public long Card_Id { get; set; }
        public long Card_Code { get; set; }
        public long Card_CGenId { get; set; }
        public short Card_CrdTypeId { get; set; }
        public DateTime Card_OpenDate { get; set; }
        public DateTime Card_CloseDate { get; set; }
        public short Card_RecpId { get; set; }
        public long Card_COwnerId { get; set; }
        public short Card_MakeId { get; set; }
        public long Card_ModelId { get; set; }
        public string Card_CarYear { get; set; }
        public string Card_CarPlateAr { get; set; }
        public string Card_CarPlateEn { get; set; }
        public string Card_VinCode { get; set; }
        public string Card_Kilometer { get; set; }
        public string Card_Engine { get; set; }
        public string Card_Gear { get; set; }
        public decimal Card_deposit { get; set; }
        public string Card_description { get; set; }
        public short Card_StatId { get; set; }
        public short Card_UserId { get; set; }
        public short Card_BranchId { get; set; }
        public decimal Card_DemurrageAmt { get; set; }
        public decimal Card_LabourDiscAmt { get; set; }
        public decimal Card_LabourVatAmt { get; set; }
        public decimal Card_LabourNet { get; set; }
        public decimal Card_OldPartNet { get; set; }
        public decimal Card_CustPartNet { get; set; }
        public decimal Card_StorePartNet { get; set; }
        public decimal Card_OutSidePartNet { get; set; }
        public decimal Card_DosNet { get; set; }
        public byte Card_PaymentMode { get; set; }
        public decimal Card_SpanAmt { get; set; }
        public decimal Card_CashAmt { get; set; }
        public string Card_AuthentCode { get; set; }
        public string Card_SpanNumber { get; set; }
        public string Card_NewModelName { get; set; }
        public string Card_NewMakeName { get; set; }
        public long Card_QtNo { get; set; }
        public string Card_SpanType { get; set; }
        public decimal Card_SpanCommPerc { get; set; }
        public decimal Card_SpanCommAmt { get; set; }
        public string Card_SpanName { get; set; }
        public string Card_PayType { get; set; }
        public string Card_WarrantyPeriod { get; set; }
        public string Card_InsuranceType { get; set; }
        public string Card_InsuranceExpDate { get; set; }
        public int Card_PrintCount { get; set; }
        public string Card_CarColour { get; set; }
        public string Card_CustRefNo { get; set; }
    }


    public class LabourCommissionRequest
    {
        public long JobOrderId { get; set; }
        public decimal CommissionPerc { get; set; }
    }



    public class UpdateCardStatusRequest
    {
        public long CGen_Id { get; set; }  // Adjust based on PK_Large type
        public string CStatus_Code { get; set; } // Code03 (3-character code)
    }



    public class InsertLabourCommission
    {
        public long LbDet_CardId { get; set; }
        public DateTime LbDet_Date { get; set; }
        public short Lbdet_BranchId { get; set; }
        public string WLComm_JobType { get; set; }
        public bool WLComm_IsOk { get; set; }
    }


    public class OldPartDetails
    {
        public long COld_Id { get; set; }
        public string COld_Code { get; set; }  // Code field added
        public int COld_Type { get; set; }  // Type field added
        public long COld_CardId { get; set; }
        public string COld_PartNo { get; set; } // Part Number field
        public string COld_PartNameAr { get; set; } // Part Name Arabic
        public string COld_PartNameEn { get; set; } // Part Name English
        public decimal COld_Qty { get; set; }
        public decimal COld_Rate { get; set; }
        public DateTime COld_Date { get; set; } // Date field added
        public int COld_IsReturned { get; set; } // Return status
        public DateTime? COld_ReturnDate { get; set; } // Return Date
        public int COld_UserId { get; set; } // User ID field
        public int COld_BranchId { get; set; } // Branch ID field
        public string COld_OEM { get; set; } // OEM field added
        public decimal COld_VatPer { get; set; } // VAT Percentage field
        public decimal? COld_VatAmt { get; set; } // VAT Amount field
        public decimal COldNetAmt { get; set; } // Net Amount (calculated column)
    }





    public class CardStorePartDto
    {
        public int Sa_JobcardId { get; set; }
        public int ItemN_Id { get; set; }
        public string Item_Code { get; set; }
        public string ItemN_NameEn { get; set; }
        public string ItemN_NameAr { get; set; }
        public string Oem_Number { get; set; }
        public decimal NetSales { get; set; }
        public decimal Sadet_Price { get; set; }
        public decimal Sadet_VATAMT { get; set; }
        public decimal NetSalesPrice { get; set; }
    }




    public class CardOutSidePartDto
    {
        public long WSDet_Id { get; set; }
        public long WSDet_WSalesId { get; set; }
        public string WSDet_ItemCode { get; set; }
        public string WSDet_PartCode { get; set; }
        public string WSDet_PartNameAr { get; set; }
        public string WSDet_PartNameEn { get; set; }
        public decimal WSDet_Qty { get; set; }
        public decimal WSDet_Price { get; set; }
        public decimal WSDet_DiscPerc { get; set; }
        public decimal WSDet_DiscAmt { get; set; }
        public decimal WSDet_BonusQty { get; set; }
        public bool WSDet_AllowDisc { get; set; }
        public bool WSDet_IsReturned { get; set; }
        public decimal WSDet_CostPrice { get; set; }
        public int WSDet_MechId { get; set; }
        public int WSDet_MechGrpId { get; set; }
        public decimal WSDet_VATPerc { get; set; }
        public decimal WSDet_VATAmt { get; set; }
        public decimal OSPartTotal { get; set; }  // Computed as (Qty * Price)
        public string WSales_Code { get; set; }
    }



    public class CustomerPartDetails
    {
        public long CPart_Id { get; set; } // Unique ID for the customer part
        public string CPart_Code { get; set; } // Part Code
        public int CPart_Type { get; set; } // Type of part
        public DateTime CPart_Date { get; set; } // Date of transaction
        public long CPart_CardId { get; set; } // Associated Job Card ID
        public string CPart_PartNo { get; set; } // Part Number (if available)
        public string CPart_PartNameEn { get; set; } // Part Name in English
        public string CPart_PartNameAr { get; set; } // Part Name in Arabic
        public decimal CPart_Qty { get; set; } // Quantity of the part
        public decimal CPart_Rate { get; set; } // Rate per unit
        public int CPart_IsReturned { get; set; } // Return Status (1 = Yes, 0 = No)
        public DateTime? CPart_ReturnDate { get; set; } // Date of return (nullable)
        public int CPart_UserId { get; set; } // User ID who handled the transaction
        public int CPart_BranchId { get; set; } // Branch ID
        public string CPart_OEM { get; set; } // OEM info (if available)
        public decimal CCustPartNetAmt { get; set; } // Total Net Amount (including VAT)
    }



    public class JobOrderNetAmounts
    {
        public decimal Card_LabourNet { get; set; }
        public decimal Card_LabourVATAmtNet { get; set; }
        public decimal Card_OldPartNet { get; set; }
        public decimal Card_CustPartNet { get; set; }
        public decimal Card_StorePartNet { get; set; }
        public decimal Card_OutSidePartNet { get; set; }
        public decimal Card_DepositNet { get; set; }
        public decimal Card_DosNet { get; set; }
        public decimal Card_OldPartVatAmt { get; set; }
    }




    public class CardOldPartModel
    {
        public long COld_Id { get; set; }
        public long COld_Code { get; set; }
        public int COld_Type { get; set; }
        public long COld_CardId { get; set; }
        public string COld_PartNo { get; set; }
        public string COld_PartNameAr { get; set; }
        public string COld_PartNameEn { get; set; }
        public decimal COld_Qty { get; set; }
        public decimal COld_Rate { get; set; }
        public DateTime COld_Date { get; set; }
        public bool COld_IsReturned { get; set; }
        public DateTime? COld_ReturnDate { get; set; }
        public int COld_UserId { get; set; }
        public int COld_BranchId { get; set; }
        public string COld_OEM { get; set; }
        public decimal COld_VatPer { get; set; }
        public decimal COld_VatAmt { get; set; }
    }





    public class CustomerPartDto
    {
        public long CPart_Id { get; set; }
        public long CPart_Code { get; set; }
        public int CPart_Type { get; set; }
        public long CPart_CardId { get; set; }
        public string CPart_PartNo { get; set; }
        public string CPart_PartNameAr { get; set; }
        public string CPart_PartNameEn { get; set; }
        public int CPart_Qty { get; set; }
        public decimal CPart_Rate { get; set; }
        public DateTime CPart_Date { get; set; }
        public bool CPart_IsReturned { get; set; }
        public DateTime? CPart_ReturnDate { get; set; }
        public int CPart_UserId { get; set; }
        public int CPart_BranchId { get; set; }
        public string CPart_OEM { get; set; }
    }



}
