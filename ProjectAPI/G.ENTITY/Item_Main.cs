using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class Item_Main
    {
        public int Item_Id { get; set; }
        public string Item_Code { get; set; }
        public long Item_OemId1 { get; set; }
        public long? Item_OemId2 { get; set; }
        public long? Item_OemId3 { get; set; }
        public long? Item_OemId4 { get; set; }
        public long? Item_OemId5 { get; set; }
        public long? Item_OemId6 { get; set; }
        public int Item_PrefixId { get; set; }
        public string Item_PrefixCode { get; set; }
        public long Item_NameId { get; set; }

        public string ItemN_NameEn { get; set; }

        public string ItemN_NameAr { get; set; }

        public string Item_DescEn { get; set; }
        public string Item_DescAr { get; set; }
        public decimal Item_AgentPrice { get; set; }
        public int Item_EcoOrderQty { get; set; }
        public long Item_MfrId { get; set; }
        public string Vendor_NameEn { get; set; }
        public int Item_GroupId { get; set; }

        public string ItemG_NameEn { get; set; }
        public int Item_CountryId { get; set; }
        public string Item_MfrPartNo { get; set; }
        public int Item_PartCodeId { get; set; }
        public bool Item_IsActive { get; set; }
        public bool Item_NeedExpDate { get; set; }
        public string Item_PhotoPath { get; set; }
        public int? Item_MinPackingQty { get; set; }
        public int? Item_MaxPackingQty { get; set; }
        public string Item_Barcode1 { get; set; }
        public string Item_Barcode2 { get; set; }
        public string Item_Notes { get; set; }
        public int Item_CreatedBy { get; set; }
        public DateTime Item_CreatedOn { get; set; }
        public int Item_UpdatedBy { get; set; }
        public DateTime Item_UpdatedOn { get; set; }
        public string Item_Quality { get; set; }
        public string Item_TimeFix { get; set; }
        public bool? Item_isOriginal { get; set; }


      

    }


    public class ItemPrefix
    {
        public int Prefix_Id { get; set; }
        public string Prefix_Code { get; set; }
    }


    public class ItemOEM
    {
        public int OEM_Id { get; set; }
        public string OEM_Code { get; set; }
        public string OEM_Number { get; set; }
        public int OEM_CreatedBy { get; set; }
        public DateTime OEM_CreatedOn { get; set; }
        public DateTime? OEM_UpdatedOn { get; set; } // Nullable DateTime
    }



    public class ItemTax
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public decimal TaxPerc { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; } // Nullable DateTime
        public int? UpdatedBy { get; set; }      // Nullable int
    }


    public class ItemGroup
    {
        public int ItemG_Id { get; set; }
        public string ItemG_Code { get; set; }
        public string ItemG_NameEn { get; set; }
        public string ItemG_NameAr { get; set; }
        public int ItemG_CreatedBy { get; set; }
        public DateTime ItemG_CreatedOn { get; set; }
    }



    public class PartCodeins
    {
        public int PartC_Id { get; set; }        // Primary Key
        public string PartC_Code { get; set; }   // Part Code
        public string PartC_Partcode { get; set; } // Part Partcode
        public byte PartC_Type { get; set; }     // Part Type
    }




    public class ItemName
    {
        public int ItemN_Id { get; set; }
        public string ItemN_Code { get; set; }
        public string ItemN_NameEn { get; set; }
        public string ItemN_NameAr { get; set; }
        public int ItemN_CreatedBy { get; set; }
        public DateTime ItemN_CreatedOn { get; set; }
        public DateTime? ItemN_UpdatedOn { get; set; } // Nullable if it can be null
    }
    public class ItemName_Dlt
    {
        public int ItemN_Id { get; set; }
      
    }



    public class PartCodes
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string PartCode { get; set; }
        public string Type { get; set; }
    }


    public class ItemDto
    {
        public int Item_Id { get; set; }
        public string Item_Code { get; set; }
        public int? Item_OemId1 { get; set; }
        public int? Item_OemId2 { get; set; }
        public int? Item_OemId3 { get; set; }
        public int? Item_OemId4 { get; set; }
        public int? Item_OemId5 { get; set; }
        public int? Item_OemId6 { get; set; }
        public int? Item_PrefixId { get; set; }
        public string Item_PrefixCode { get; set; }
        public int? Item_NameId { get; set; }
        public string Item_DescEn { get; set; }
        public string Item_DescAr { get; set; }
        public decimal? Item_AgentPrice { get; set; }
        public decimal? Item_EcoOrderQty { get; set; }
        public int? Item_MfrId { get; set; }
        public int? Item_GroupId { get; set; }
        public int? Item_CountryId { get; set; }
        public string Item_MfrPartNo { get; set; }
        public int? Item_PartCodeId { get; set; }
        public bool? Item_IsActive { get; set; }
        public bool? Item_NeedExpDate { get; set; }
        public string Item_PhotoPath { get; set; }
        public decimal? Item_MinPackingQty { get; set; }
        public decimal? Item_MaxPackingQty { get; set; }
        public string Item_Barcode1 { get; set; }
        public string Item_Barcode2 { get; set; }
        public string Item_Notes { get; set; }
        public int? Item_CreatedBy { get; set; }
        public int? Item_UpdatedBy { get; set; }
        public string Item_Quality { get; set; }
        public string Item_TimeFix { get; set; }
        public bool? Item_isOriginal { get; set; }
    }



    public class ItemTaxinsert
    {
        public decimal? Code { get; set; }       // Corresponds to [Code] numeric(18, 0)
        public string ItemCode { get; set; }     // Corresponds to [ItemCode] varchar(10)
        public int? TaxMastCode { get; set; }    // Corresponds to [TaxMastCode] int
        public decimal? TaxPerc { get; set; }    // Corresponds to [TaxPerc] decimal(10, 2)
        public byte? IsActive { get; set; }      // Corresponds to [IsActive] tinyint
        public int? CreatedBy { get; set; }      // Corresponds to [CreatedBy] int
        public int? UpdatedBy { get; set; }
    }


    public class ItemOEMIns

    {

        public int OEM_Id { get; set; }
        public string OEM_Code { get; set; }       // Code of the OEM item
        public string OEM_Number { get; set; }     // OEM Number, unique for each item
        public int OEM_CreatedBy { get; set; }     // ID of the user who created the item
    }


    public class ItemNameIns

    { 
        public int @ItemN_Id { get; set; }
    
        public string ItemN_Code { get; set; }
        public string ItemN_NameEn { get; set; }
        public string ItemN_NameAr { get; set; }
        public int? ItemN_CreatedBy { get; set; }
    }



    public class ItemGroupfetch
    {
        public int ItemG_Id { get; set; } // Primary Key
        public string ItemG_Code { get; set; } // Code
        public string ItemG_NameEn { get; set; } // Name in English
        public string ItemG_NameAr { get; set; } // Name in Arabic
        public int ItemG_CreatedBy { get; set; } // Created By (User ID)
        public DateTime ItemG_CreatedOn { get; set; } // Created On
      
       
    }




    public class ItemGroupIns


    {
        public int ItemG_Id { get; set; } // Primary Key
        public string ItemG_Code { get; set; }     // Code, non-nullable
        public string ItemG_NameEn { get; set; }   // Name in English, non-nullable
        public string ItemG_NameAr { get; set; }   // Name in Arabic, non-nullable
        public int ItemG_CreatedBy { get; set; }   // Created By, non-nullable
    }


    public class PaginatedResponse<T>
    {
        public List<T> Items { get; set; } = new List<T>();  // Holds paginated data
        public int TotalCount { get; set; }  // Total number of records in the database
        public int PageNumber { get; set; }  // Current page number
        public int PageSize { get; set; }  // Number of items per page

        // Calculate total pages based on total count and page size
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);

        public bool HasPreviousPage => PageNumber > 1;
        public bool HasNextPage => PageNumber < TotalPages;
    }


    public class ItemUnitFil

    {
        public int Unit_Id { get; set; }
        public string Unit_Code { get; set; }
        public string Unit_NameEn { get; set; }
        public string Unit_NameAr { get; set; }
    }



    public class ItemUnit_ins
    {
        public int Unit_Id { get; set; }
        public string Unit_Code { get; set; }    // Code03 equivalent, e.g., "001"
        public string Unit_NameEn { get; set; }  // Name in English
        public string Unit_NameAr { get; set; }  // Name in Arabic
    }


    public class ItemPrefix_fil
    {
        public int Prefix_Id { get; set; }
        public string Prefix_Code { get; set; }
    }



    public class ItemPrefixInsert
    {
        public string Prefix_Code { get; set; }
      
    }



    public class PartOrigin
    {
        public int PartOrg_Id { get; set; } // Primary Key (auto-incremented)
        public string PartOrg_Code { get; set; } // Code (length: 3)
        public string PartOrg_NameEn { get; set; } // English Name
        public string PartOrg_NameAr { get; set; } // Arabic Name
        public byte PartOrg_Type { get; set; } // Part Type (tinyint)
        public int PartOrg_CreatedBy { get; set; } // Created By (foreign key to Employees table)
        public DateTime PartOrg_CreatedOn { get; set; } // Created On (timestamp)
    }




    public class PartOrigin_ins
    {
        public int PartOrg_Id { get; set; }               // The ID of the PartOrigin
        public string PartOrg_Code { get; set; }          // The code of the PartOrigin (max length: 3)
        public string PartOrg_NameEn { get; set; }        // The English name of the PartOrigin (max length: 100)
        public string PartOrg_NameAr { get; set; }        // The Arabic name of the PartOrigin (max length: 100)
        public byte PartOrg_Type { get; set; }            // The type of the PartOrigin (TINYINT in SQL, so byte in C#)
        public int PartOrg_CreatedBy { get; set; }        // The ID of the user who created the PartOrigin
        public DateTime PartOrg_CreatedOn { get; set; }   // The date and time when the PartOrigin was created
    }



    public class ItemLocation
    {
        public long ItemLoc_Id { get; set; }    // Corresponds to the ItemLoc_Id column
        public string ItemLoc_Code { get; set; } // Corresponds to the ItemLoc_Code column
    }



    public class ItemLocationInsert
    {
        public string ItemLoc_Code { get; set; }  // The code for the item location to be inserted
       
    }



    public class PayType
    {
        public int PayType_Id { get; set; }
        public string PayType_Code { get; set; }
        public string PayType_NameEn { get; set; }
        public string PayType_NameAr { get; set; }
    }


    public class ItemModel
    {


      
        public string Item_Code { get; set; }
        public int? Item_OemId1 { get; set; }
        public int? Item_OemId2 { get; set; }
        public int? Item_OemId3 { get; set; }
        public int? Item_OemId4 { get; set; }
        public int? Item_OemId5 { get; set; }
        public int? Item_OemId6 { get; set; }
        public int? Item_PrefixId { get; set; }
        public string Item_PrefixCode { get; set; }
        public int? Item_NameId { get; set; }
        public string Item_DescEn { get; set; }
        public string Item_DescAr { get; set; }
        public decimal? Item_AgentPrice { get; set; }
        public decimal? Item_EcoOrderQty { get; set; }
        public int? Item_MfrId { get; set; }
        public int? Item_GroupId { get; set; }
        public int? Item_CountryId { get; set; }
        public string Item_MfrPartNo { get; set; }
        public int? Item_PartCodeId { get; set; }
        public bool? Item_IsActive { get; set; }
        public bool? Item_NeedExpDate { get; set; }
        public string Item_PhotoPath { get; set; }
        public decimal? Item_MinPackingQty { get; set; }
        public decimal? Item_MaxPackingQty { get; set; }
        public string Item_Barcode1 { get; set; }
        public string Item_Barcode2 { get; set; }
        public string Item_Notes { get; set; }
        public int? Item_CreatedBy { get; set; }

        public DateTime Item_CreatedOn { get; set; }
        public int? Item_UpdatedBy { get; set; }

        public DateTime Item_UpdatedOn { get; set; }
        public string Item_Quality { get; set; }
        public string Item_TimeFix { get; set; }
        public bool? Item_isOriginal { get; set; }
    }



    public class ItemUnitDetModel
    {
        public long UnitDet_RowNo { get; set; }         // Corresponds to the row number in the table (Primary Key)
        public long UnitDet_ItemId { get; set; }        // Corresponds to the ItemId (Foreign Key)
        public int UnitDet_UnitId { get; set; }         // Corresponds to the UnitId (Foreign Key)
        public long UnitDet_ParentRowNo { get; set; }   // Corresponds to the ParentRowNo (Nullable, if applicable)
        public short UnitDet_Factor { get; set; }       // Corresponds to the Factor value
        public bool UnitDet_IsActive { get; set; }      // Corresponds to the IsActive flag
        public int? UnitDet_FinalFactor { get; set; }   // Corresponds to the FinalFactor (Nullable)
        public DateTime UnitDet_UpdatedOn { get; set; } // Corresponds to the UpdatedOn timestamp
    }



    public class ItemVendorsModel
    {
        public int ItemVendor_RowNo { get; set; }

        public int ItemVendor_ItemId { get; set; }
        public int ItemVendor_VendorId { get; set; }

       
        public int ItemVendor_CreatedBy { get; set; }
        public DateTime ItemVendor_UpdatedOn { get; set; }
    }


    public class CarDetail
    {
        public int Model_Id { get; set; }
        public string Model_Code { get; set; }
        public string Model_NameEn { get; set; }
        public string Model_NameAr { get; set; }
        public int Model_MakeId { get; set; }
        public string Make_NameAr { get; set; }
        public string Make_NameEn { get; set; }
        public int Model_CreatedBy { get; set; }
        public DateTime Model_CreatedOn { get; set; }
        public DateTime Model_UpdatedOn { get; set; }
    }




    public class ItemCarDetModel
    {
        public int ItemCar_RowNo { get; set; }

        public int ItemCar_ItemId { get; set; }
        public int ItemCar_ModelId { get; set; }
        
        public int ItemCar_YearFrom { get; set; }
        public int ItemCar_YearTo { get; set; }
        public bool ItemCar_IsActive { get; set; }
        public int ItemCar_CreatedBy { get; set; }
        public DateTime ItemCar_CreatedOn { get; set; }
        public DateTime ItemCar_UpdatedOn { get; set; }
    }


    public class ItemLocDetModel
    {
        public int LocDet_RowNo { get; set; }

        public int LocDet_ItemId { get; set; }
        public int LocDet_LocId { get; set; }
        public int LocDet_BrId { get; set; }
        public int LocDet_CreatedBy { get; set; }
        public DateTime LocDet_CreatedOn { get; set; }
    }


    public class ItemRequestModel
    {


        public ItemModel Item { get; set; }
        public List<ItemUnitDetModel> UnitDetails { get; set; }
        public List<ItemVendorsModel> VendorDetails { get; set; }
        public List<ItemCarDetModel> CarDetails { get; set; }
        public List<ItemLocDetModel> LocationDetails { get; set; }

        public List<ItemVatDetailsDto>VatDetails { get; set; }
    }




    public class ItemVatDetailsDto
    {
        public string ItemCode { get; set; }  // VARCHAR(10) -> string
        public int? TaxMastCode { get; set; }  // INT -> int?
        public decimal? TaxPerc { get; set; }  
    }


    public class ItemDetailsDto
    {
        public int Item_Id { get; set; }
        public string Item_Code { get; set; }
        public int? Item_OemId1 { get; set; }
        public int? Item_OemId2 { get; set; }
        public int? Item_OemId3 { get; set; }
        public int? Item_OemId4 { get; set; }
        public int? Item_OemId5 { get; set; }
        public int? Item_OemId6 { get; set; }

        public int? Item_PrefixId { get; set; }
        public string Item_PrefixCode { get; set; }
        public int? Item_NameId { get; set; }
        public string ItemN_NameEn { get; set; }
        public string ItemN_NameAr { get; set; }

        public int? Item_MfrId { get; set; }
        public int? Item_GroupId { get; set; }
        public string Item_DescEn { get; set; }
        public string Item_DescAr { get; set; }
        public decimal? Item_AgentPrice { get; set; }
        public int? Item_EcoOrderQty { get; set; }
        public string Item_MfrPartNo { get; set; }
        public bool? Item_IsActive { get; set; }
        public bool? Item_NeedExpDate { get; set; }
        public string Item_PhotoPath { get; set; }
        public int? Item_MinPackingQty { get; set; }
        public int? Item_MaxPackingQty { get; set; }
        public string Item_Barcode1 { get; set; }
        public string Item_Barcode2 { get; set; }
        public string Item_Notes { get; set; }
        public int? Item_CreatedBy { get; set; }
        public DateTime? Item_CreatedOn { get; set; }
        public int? Item_UpdatedBy { get; set; }
        public DateTime? Item_UpdatedOn { get; set; }
        public string Item_Quality { get; set; }
        public string Item_TimeFix { get; set; }
        public bool? Item_isOriginal { get; set; }
        public int? Item_CountryId { get; set; }
        public string Item_Country { get; set; }
        public string Item_ManufacturerEn { get; set; }
        public string Item_ManufacturerAr { get; set; }
        public string Item_GroupEn { get; set; }
        public string Item_GroupAr { get; set; }


        public string item_PartCodeId { get; set; }
        public string PartC_Partcode { get; set; }
            public int ItemCar_Id { get; set; }
            public string Model_IDs { get; set; }  // Store multiple Model IDs as comma-separated values
            public string Model_Years { get; set; } // Stores "YearFrom-YearTo" format
            public string Model_Names_En { get; set; } // Stores multiple Model Names (English)
            public string Model_Names_Ar { get; set; } // Stores multiple Model Names (Arabic)
            public string Make_Names_En { get; set; } // Stores multiple Make Names (English)
            public string Make_Names_Ar { get; set; } // Stores multiple Make Names (Arabic)
            public string Make_Ids { get; set; } // Store multiple Make IDs as comma-separated values

        public string TaxMastCode { get; set; }
        public string TaxNameEn { get; set; }
        public string TaxNameAr { get; set; }
        public decimal TaxPerc { get; set; }



    }








}
