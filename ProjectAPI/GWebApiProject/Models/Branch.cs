using System;

namespace GWebApiProject.Models
{
    public class Branch
    {
        public int BrId { get; set; } // Identity column
        public string BrCode { get; set; }
        public string BrNameEn { get; set; }
        public string BrNameAr { get; set; }
        public string BrAddress { get; set; }
        public bool? BrIsActive { get; set; } // Nullable int for 0/1 values
        public bool? BrIsCurrBranch { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowWhSales { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowBulkSales { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowCr { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowCCr { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowPurchase { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowPurchaseRet { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowTrOut { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowTrIn { get; set; } // Nullable int for 0/1 values
        public bool? BrAllowSales { get; set; } // Nullable int for 0/1 values
        public bool? BrTransferBasedOnShEx { get; set; } // Nullable int for 0/1 values
        public bool? BrNeedShExReport { get; set; } // Nullable int for 0/1 values
        public int BrTypeId { get; set; }
        public int BrAreaId { get; set; }
        public DateTime? BrClosedOn { get; set; }
        public int BrCreatedBy { get; set; }
        public DateTime BrCreatedOn { get; set; }
        public string OldCode { get; set; }
    }

}
