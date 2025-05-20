using Dapper;
using G.ENTITY;  // Ensure BranchType is defined in this namespace
using G.REPOSITORY;
using System.Collections.Generic;
using System.Data;

namespace G.SERVICE

{

    public interface IBusinessService
    {
        List<Business> GetBusiness(string filterField = null, string filterCondition = null, string filterValue = null);
        string GetNxtBusinessCode();
        Business GetBusiness_id(long Desig_Id);

        DB_STATUS SaveDesignation(Business Dept);

    }
    internal class BusinessService
    {
    }
}
