
namespace GarageWebApi.Models
{
    public class VendorModel
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
        public int Vendor_UpdatedBy { get; set; }
        public string Vendor_Notes { get; set; }

    }
}
