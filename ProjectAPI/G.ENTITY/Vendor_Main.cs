using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class Vendor_Main
    {
        public int Vendor_Id { get; set; }
        public byte Vendor_Type { get; set; }
        public string Vendor_Code { get; set; }
        public string Vendor_ShortName { get; set; }
        public string Vendor_NameEn { get; set; }
        public string Vendor_NameAr { get; set; }
        public char Vendor_Category { get; set; }
        public DateTime? Vendor_RegDate { get; set; }
        public string Vendor_Address { get; set; }
        public string Vendor_Phone { get; set; }
        public string Vendor_Fax { get; set; }
        public string Vendor_Web { get; set; }
        public string Vendor_Email { get; set; }
        public bool Vendor_IsActive { get; set; }
        public int Vendor_LocId { get; set; }
        public int Vendor_GroupId { get; set; }
        public int Vendor_PartOriginId { get; set; }
        public int Vendor_CreatedBy { get; set; }
        public DateTime Vendor_CreatedOn { get; set; }
        public int Vendor_UpdatedBy { get; set; }
        public DateTime Vendor_UpdatedOn { get; set; }
        public string Vendor_Notes { get; set; }

    }

    namespace G.ENTITY
    {
        public class VendorStatusResponse
        {
            public int Vendor_Id { get; set; }
            public byte Vendor_Type { get; set; }
            public string Vendor_Code { get; set; }
            public string Vendor_ShortName { get; set; }
            public string Vendor_NameEn { get; set; }
            public string Vendor_NameAr { get; set; }
            public char Vendor_Category { get; set; }
            public DateTime? Vendor_RegDate { get; set; }
            public string Vendor_Address { get; set; }
            public string Vendor_Phone { get; set; }
            public string Vendor_Fax { get; set; }
            public string Vendor_Web { get; set; }
            public string Vendor_Email { get; set; }
            public bool Vendor_IsActive { get; set; }
            public int Vendor_LocId { get; set; }
            public int Vendor_GroupId { get; set; }
            public int Vendor_PartOriginId { get; set; }
            public int Vendor_CreatedBy { get; set; }
            public DateTime Vendor_CreatedOn { get; set; }
            public int Vendor_UpdatedBy { get; set; }
            public DateTime Vendor_UpdatedOn { get; set; }
            public string Vendor_Notes { get; set; }
        }
    }



    namespace G.ENTITY
    {

        public class VendorInsertModel
        {
            public int Vendor_Id { get; set; }
            public byte Vendor_Type { get; set; }
           
            public string Vendor_ShortName { get; set; }
            public string Vendor_NameEn { get; set; }
            public string Vendor_NameAr { get; set; }
            public char Vendor_Category { get; set; }
            public DateTime? Vendor_RegDate { get; set; }
            public string Vendor_Address { get; set; }
            public string Vendor_Phone { get; set; }
            public string Vendor_Fax { get; set; }
            public string Vendor_Web { get; set; }
            public string Vendor_Email { get; set; }
            public bool Vendor_IsActive { get; set; }
            public int Vendor_LocId { get; set; }
            public int Vendor_GroupId { get; set; }
            public int Vendor_PartOriginId { get; set; }
            public int Vendor_CreatedBy { get; set; }
            public DateTime Vendor_CreatedOn { get; set; }
            public int Vendor_UpdatedBy { get; set; }
            public DateTime Vendor_UpdatedOn { get; set; }
            public string Vendor_Notes { get; set; }
        }


    }
}