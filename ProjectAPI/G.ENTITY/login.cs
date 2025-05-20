using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public  class LoginRequestModel
    {

        public string username { get; set; }
        public string password { get; set; }
    }
    public class UserDto
    {
        public int UserID { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeNameEn { get; set; }
        public string EmployeeNameAr { get; set; }
        public bool IsAdmin { get; set; }
    }

    public class BranchDto
    {
        public string BranchCode { get; set; }
        public string BranchNameEn { get; set; }
        public string BranchNameAr { get; set; }
        public bool IsMainStore { get; set; }
        public bool IsReportDb { get; set; }
    }

    public class BusinessDto
    {
        public string BusinessCode { get; set; }
        public string BusinessNameEn { get; set; }
        public string BusinessNameAr { get; set; }
        public bool IsWholeSale { get; set; }
    }



}
