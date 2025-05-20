namespace GarageWebApi.Models
{
    public class UserLoginModel
    {
        public string Username { get; set; }

        public string Password { get; set; }

    }

    public class UserMainModel : ResponseModel
    {
        public long UId { get; set; }
        public string Name_Ar { get; set; }
        public string Name_En { get; set; }
        public long EmployeeId { get; set; }
        //public string LoginName { get; set; }
        //public string Password { get; set; }
        public bool IsLoggedIn { get; set; }
        public long TypeId { get; set; }
        public bool IsActive { get; set; }
        public long UserId { get; set; }
        public long UserBranchId { get; set; }
        public long CurrentBranchId { get; set; }
        public string BRANCH_Name_En { get; set; }
        public string BRANCH_Name_Ar { get; set; }
        public long LanguageId { get; set; }
        public int? OldId { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public int? ExpiresInhrs { get; set; }
        public int? StatusCode { get; set; }


        //public string LastPassword { get; set; }
    }
}

