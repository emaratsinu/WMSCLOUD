using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class Employee_Main
    {
        public int Emp_Id { get; set; } // Assuming PK_Small is an int
        public string Emp_Code { get; set; }
        public string Emp_MainCode { get; set; }
        public string Emp_NameEn { get; set; }
        public string Emp_NameAr { get; set; }
        public string Emp_Initials { get; set; }
        public int Emp_DesigId { get; set; } // Assuming PK_Small is an int
        public int Emp_DeptId { get; set; } // Assuming PK_Small is an int
        public string Emp_Address { get; set; }
        public string Emp_Phone { get; set; }
        public string Emp_Mobile { get; set; }
        public string Emp_Email { get; set; }
        public DateTime? Emp_Doj { get; set; } // Nullable if the field allows null values
        public DateTime? Emp_Dob { get; set; } // Nullable if the field allows null values
        public decimal Emp_BasicSal { get; set; } // Assuming Amount is a decimal type
        public string Emp_PhotoPath { get; set; }
        public bool Emp_IsActive { get; set; }
        public bool Emp_IsOnVacation { get; set; }
        public string Emp_IqamaNo { get; set; }
        public DateTime Emp_IqamaIssueDate { get; set; }
        public DateTime Emp_IqamaExpDate { get; set; }
        public string Emp_IqamaPlace { get; set; }
        public string Emp_PassportNo { get; set; }
        public int? Emp_CountryId { get; set; } // Nullable if the field allows null values
        public bool Emp_IsActiveUser { get; set; }
        public string Emp_LoginName { get; set; }
        public string Emp_Pwd { get; set; }
        public bool Emp_IsLoggedIn { get; set; }
        public int? Emp_CreatedBy { get; set; } // Nullable if the field allows null values
        public DateTime Emp_CreatedOn { get; set; }
        public int? Emp_UpdatedBy { get; set; } // Nullable if the field allows null values
        public DateTime Emp_UpdatedOn { get; set; }
        public int? Emp_BrId { get; set; } // Nullable if the field allows null values
        public bool? Emp_IsAllowRetailOnly { get; set; } // Nullable if the field allows null values
    }



    public class Employee_Main_Result
    {
        public long Cust_Id { get; set; } // Unique identifier for the customer
        public string Cust_Code { get; set; } // Customer code
        public string Cust_NameEn { get; set; } // Customer name in English
        public string Cust_NameAr { get; set; } // Customer name in Arabic
        public string Cust_AddrEn1 { get; set; } // Address line 1 in English
        public string Cust_AddrAr1 { get; set; } // Address line 1 in Arabic
        public string Cust_Phone { get; set; } // Phone number
        public string Cust_Mobile { get; set; } // Mobile number
        public string Cust_Email { get; set; } // Email address
        public decimal Cust_Disc { get; set; } // Discount amount
        public decimal Cust_CrLimit { get; set; } // Credit limit amount
        public bool Cust_IsActive { get; set; } // Whether the customer is active or not
        public DateTime Cust_CreatedOn { get; set; } // Date and time the record was created
        public DateTime Cust_UpdatedOn { get; set; } // Date and time the record was last updated
    }



 public class Employee_Designation
    {

        public int Desig_Id { get; set; }
        public string Desig_Code { get; set; }
        public string Desig_NameEn { get; set; }
        public string Desig_NameAr { get; set; }

    }


    public class Employee_Department
    {

        public int Dept_Id { get; set; }
        public string Dept_Code { get; set; }
        public string Dept_NameEn { get; set; }
        public string Dept_NameAr { get; set; }
        public string Dept_BusId { get; set; }


    }



    public class GetNextEmployeeCode
    {
        public int NextEmpCode { get; set; }
    }
        public class GetNextEmpMainCode
    {

            public int NextEmpMainCode { get; set; }



    }



    public class Country
    {
        public int Country_Id { get; set; }
        public string Country_Code { get; set; }
        public string Country_NameEn { get; set; }
        public string Country_NameAr { get; set; }
    }
}
