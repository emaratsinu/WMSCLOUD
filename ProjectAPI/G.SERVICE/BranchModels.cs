using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.SERVICE
{
    public class BranchModels
    {
        public int Br_Id { get; set; }
        public string Br_Code { get; set; }
        public string Br_NameEn { get; set; }
        public string Br_NameAr { get; set; }
        public string Br_Address { get; set; }
        public bool Br_IsActive { get; set; }
        public bool Br_IsCurrBranch { get; set; }
        public bool Br_AllowWhSales { get; set; }
        public bool Br_AllowBulkSales { get; set; }
        public bool Br_AllowCr { get; set; }
        public bool Br_AllowCCr { get; set; }
        public bool Br_AllowPurchase { get; set; }
        public bool Br_AllowPurchaseRet { get; set; }
        public bool Br_AllowTrOut { get; set; }
        public bool Br_AllowTrIn { get; set; }
        public bool Br_AllowSales { get; set; }
        public bool Br_TransferBasedOnShEx { get; set; }
        public bool Br_NeedShExReport { get; set; }
        public int Br_TypeId { get; set; }
        public int Br_AreaId { get; set; }
        public DateTime? Br_ClosedOn { get; set; }
        public int Br_CreatedBy { get; set; }
        public DateTime Br_CreatedOn { get; set; }
        public string OldCode { get; set; }
    }
}
