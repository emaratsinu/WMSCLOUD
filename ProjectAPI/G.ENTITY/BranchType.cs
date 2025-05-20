using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class BranchType
    {

        public int BrType_Id { get; set; }
        public string BrType_Code { get; set; }
        public string BrType_NameEn { get; set; }
        public string BrType_NameAr { get; set; }
    }


    namespace G.ENTITY
    {
        public class BranchTypeResponseModel
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name_En { get; set; }
            public string Name_Ar { get; set; }
        }
    }

}
