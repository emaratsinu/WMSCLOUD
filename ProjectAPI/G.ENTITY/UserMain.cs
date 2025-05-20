using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class USER_MAIN
    {
        // Encrypted username
        public string USER_LoginName { get; set; }

        // Encrypted password
        public string USER_Password { get; set; }

        // Indicates if the user authentication was successful
        public bool Success { get; set; }

        // English name of the user
        public string Name_En { get; set; }

        // Arabic name of the user
        public string Name_Ar { get; set; }

        // ID of the user's current branch
        public int CurrentBranchId { get; set; }

        // ID of the user's branch
        public int UserBranchId { get; set; }

        // English name of the branch
        public string BRANCH_Name_En { get; set; }

        // Unique ID of the user
        public int UserId { get; set; }

        // Indicates if the user is part of the main store
        public bool IsMainStore { get; set; }

        // Employee ID for the user
        public int EmployeeId { get; set; }

        // Employee number
        public string EMPLOYEE_Number { get; set; }

        // Indicates if the user has wholesale privileges
        public bool IsWholesale { get; set; }

        // A message about the user's status or login process
        public string StatusMessage { get; set; }

        // Refresh token for the user's session
        public string RefreshToken { get; set; }
    }




    public class USER_MAINResult : DB_STATUS
    {
        public long USER_Id { get; set; }
        public string USER_Name_Ar { get; set; }
        public string USER_Name_En { get; set; }
        public long USER_EmployeeId { get; set; }
        public bool USER_IsLoggedIn { get; set; }
        public long USER_TypeId { get; set; }
        public bool USER_Active { get; set; }
        public long USER_UserId { get; set; }
        //public string USER_LoginName { get; set; }
        //public string USER_Password { get; set; }
        public long USER_BranchId { get; set; }
        public long Curr_BanchID { get; set; }
        public string BRANCH_Name_Ar { get; set; }
        public string BRANCH_Name_En { get; set; }
        public long USER_LanguageId { get; set; }
        public int? Old_Id { get; set; }
        public DateTime? User_LastUpdatedDate { get; set; }
        public bool IsMainStore { get; set; }
        public string? EMPLOYEE_Number { get; set; }
        public bool? IsWholesale { get; set; }
        //public string USER_LastPassword { get; set; }
    }
}
