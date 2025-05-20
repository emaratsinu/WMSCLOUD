using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public  class Department
    {


        public int  Dept_Id { get; set; }

        public string Dept_Code { get; set; }

        public string Dept_NameEn { get; set; }

        public string Dept_NameAr { get;set; }

        public int Dept_BusId { get; set; }

        



    }



    public class  Business
    {

        public int Bus_Id { get; set; }


        public string Bus_Code { get; set; }

        public string Bus_NameEn { get;set; }

        public string Bus_NameAr { get; set; }




    }
}
