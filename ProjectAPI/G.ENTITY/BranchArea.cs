using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class BranchArea
    {

        public int Area_Id { get; set; }
        public string Area_Code { get; set; }
        public string Area_NameEn { get; set; }
        public string Area_NameAr { get; set; }
    }




    namespace G.ENTITY
    {

        public class BranchAreaResponseModel
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name_En { get; set; }
            public string Name_Ar { get; set; }
        }
    }
}
