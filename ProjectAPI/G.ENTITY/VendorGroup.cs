using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class VendorGroup
    {

        public int VendorG_Id { get; set; }
        public string VendorG_Code { get; set; }
        public string VendorG_NameEn { get; set; }
        public string VendorG_NameAr { get; set; }
        public int VendorG_CreatedBy { get; set; }
    }

    namespace G.ENTITY
    {
        public class VendorGroupResponse
        {

            public int id { get; set; }
            public string code { get; set; }
            public string NameEn { get; set; }
            public string NameAr { get; set; }
            public int created_by { get; set; }
        }
    }



    namespace G.ENTITY
    {
        public class Vendor
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
        public class VendorResponse
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



        public class VendorLocation
        {
            public int VendorLoc_Id { get; set; }        // Identity column (Primary Key)
            public string VendorLoc_Code { get; set; }   // Vendor Location Code
            public int VendorLoc_CreatedBy { get; set; } // The employee who created this record
        }
    }
}
