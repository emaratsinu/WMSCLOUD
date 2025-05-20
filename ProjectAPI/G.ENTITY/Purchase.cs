using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public  class Purchase
    {
    }



    public class PurchaseDetails
    {
        public int WPurchase_Id { get; set; }
        public string? WPurchase_Code { get; set; }
        public string? WPurchase_Ref { get; set; }
        public DateTime WPurchase_Date { get; set; }
        public DateTime? WPurchase_DueDate { get; set; }
        public int WPurchase_VendorId { get; set; }
        public int WPurchase_ToBranch { get; set; }
        public string? WPurchase_JobOrderNo { get; set; }
        public DateTime? WPurchase_ArrivalDate { get; set; }
        public int WPurchase_PayTypeId { get; set; }
        public string? WPurchase_Notes { get; set; }
        public decimal WPurchase_QtyTotal { get; set; }
        public decimal WPurchase_bonusTotal { get; set; }
        public decimal WPurchase_ItemDiscTotal { get; set; }
        public decimal WPurchase_GenDiscTotal { get; set; }
        public decimal WPurchase_TotalAmount { get; set; }
        public decimal WPurchase_InvDiscPerc { get; set; }
        public decimal WPurchase_InvDiscAmt { get; set; }
        public decimal WPurchase_Expenses { get; set; }
        public decimal WPurchase_NetAmount { get; set; }
        public int WPurchase_UserId { get; set; }
        public int WPurchase_BranchId { get; set; }
        public string? Br_Code { get; set; }
        public string? Br_NameEn { get; set; }
        public string? Br_NameAr { get; set; }
    }

}
