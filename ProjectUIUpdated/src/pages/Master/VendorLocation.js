import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import {
    fetchVendorLocation,
} from "../../components/Api/VendorApiService";
import TableContainer from "../../components/Common/TableContainer";
import { ClipLoader } from "react-spinners"; // Importing the spinner

const ItemName = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showInputFields, setShowInputFields] = useState(false);
  const [filters, setFilters] = useState({
    filterField: "Name (En)",
    filterCondition: "contains",
    filterValue: "",
  });

  const [inputValues, setInputValues] = useState({
    id: null,
    code: "",
    NameEn: "",
    NameAr: "",
  });

  const columns = useMemo(
    () => [
      {
        header: "Code",
        accessorKey: "code",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Name (En)",
        accessorKey: "nameEn",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Name (Ar)",
        accessorKey: "nameAr",
        enableColumnFilter: false,
        enableSorting: true,
      },
    ],
    []
  );

  useEffect(() => {
    fetchVendorloc();
  }, []);

  const fetchVendorloc = async () => {
    setLoading(true);
    try {
      const fieldMapping = {
        "Name (En)": "make_NameEn",
        "Name (Ar)": "make_NameAr",
        Code: "make_Code",
      };

      const response = await fetchVendorLocation(filters, fieldMapping);
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          id: item.vendorLoc_Id,
          code: item.vendorLoc_Code,
          nameEn: item.vendorLoc_Code,
          nameAr: item.vendorLoc_Code,
        }));
        setData(transformedData);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching Currency data:", error);
    } finally {
      setLoading(false);
    }
  };

 


//   const handleRowClick = async (row) => {
//     alert()
//     try {
//       const { id } = row; // Access the row data directly
//       const data = await fetchCurrencyById(id); // Fetch details based on the ID
//       setInputValues({
//         id: data.curr_Id,
//         code: data.curr_Code,
//         NameEn: data.curr_ShortCode,
//         NameAr: data.curr_Desc,
//       });
//       setShowInputFields(true);
//     } catch (error) {
//       console.error("Error fetching currency details:", error);
//       Swal.fire("Error", "Failed to fetch currency details.", "error");
//     }
//   };

  const handleButtonClick = () => {
    setShowInputFields(true);
    fetchNextCode();
  };

 

  

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Vendor Location </h4>
        
        </div>

        {loading ? (
          <div className="text-center my-5">
            <ClipLoader color="#007bff" size={50} />
            <p>Loading data, please wait...</p>
          </div>
        ) : (

        <TableContainer
          columns={columns}
          data={data || []}
          isGlobalFilter={true}
          isPagination={true}
          SearchPlaceholder="Search for Vendor Location..."
          pagination="pagination"
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
          loading={loading}
          
        />
      )}
      </div>
    </div>
  );
};

export default ItemName;
