using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class CarMake
    {
        public int Make_Id { get; set; }            // Car Make ID
        public string Make_Code { get; set; }       // Car Make Code
        public string Make_NameEn { get; set; }     // Car Make Name in English
        public string Make_NameAr { get; set; }     // Car Make Name in Arabic
        public int Make_CreatedBy { get; set; }     // ID of the user who created the record
        public DateTime Make_CreatedOn { get; set; } // Creation date of the record
    }


    public class CarMake_ins
    {
        public int MakeId { get; set; }            // Corresponds to @Make_Id
        public string MakeCode { get; set; }       // Corresponds to @Make_Code
        public string MakeNameEn { get; set; }     // Corresponds to @Make_NameEn
        public string MakeNameAr { get; set; }     // Corresponds to @Make_NameAr
        public int MakeCreatedBy { get; set; }     // Corresponds to @Make_CreatedBy
       
    }

    public class CarModel
    {
        public int Model_Id { get; set; }          // Must match Model_Id in the DB
        public string Model_Code { get; set; }     // Must match Model_Code in the DB
        public string Model_NameEn { get; set; }   // Must match Model_NameEn in the DB
        public string Model_NameAr { get; set; }   // Must match Model_NameAr in the DB
        public int Model_MakeId { get; set; }      // Must match Model_MakeId in the DB
        public int Model_CreatedBy { get; set; }   // Must match Model_CreatedBy in the DB
        public DateTime Model_CreatedOn { get; set; } // Must match Model_CreatedOn in the DB
        public DateTime? Model_UpdatedOn { get; set; } // Must match Model_UpdatedOn in the DB
    }





    public class CarModel_ins
    {
        public int ModelId { get; set; }           // Corresponds to @Model_Id
        public string ModelCode { get; set; }      // Corresponds to @Model_Code
        public string ModelNameEn { get; set; }    // Corresponds to @Model_NameEn
        public string ModelNameAr { get; set; }    // Corresponds to @Model_NameAr
        public int ModelMakeId { get; set; }       // Corresponds to @Model_MakeId
        public int ModelCreatedBy { get; set; }    // Corresponds to @Model_CreatedBy
      
    }



    public class Currency
    {
        public int Curr_Id { get; set; }            // Currency ID
        public string Curr_Code { get; set; }       // Currency Code
        public string Curr_ShortCode { get; set; }  // Currency Short Code
        public string Curr_Desc { get; set; }       // Currency Description
    }

    public class Country_List
    {
        public int Country_Id { get; set; }          // Country ID (0 for insert, existing ID for update)
        public string Country_Code { get; set; }     // Country Code (e.g., "USA", "IND")
        public string Country_NameEn { get; set; }   // Country Name in English (e.g., "United States")
        public string Country_NameAr { get; set; }   // Country Name in Arabic (e.g., "الولايات المتحدة")
    }


}
