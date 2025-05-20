using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.ENTITY
{
    public class DB_STATUS
    {
        //public long ID { get; set; }
        public string Status { get; set; }
        public int Id { get; set; }
        public bool Success { get; set; }
        public string StatusMessage { get; set; }
        public string RedirectUrl { get; set; }
        public string Location_Code { get; set; }
    }


    public class BaseResult
        {
            public int TotalRecords { get; set; }
        }
    }
