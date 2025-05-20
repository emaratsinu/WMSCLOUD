import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import {
    fetchItemOems,saveOem,fetchNextItemOemCode, fetchItemOemById
} from "../../components/Api/itemApiService";
import TableContainer from "../../components/Common/TableContainer";
import { ClipLoader } from "react-spinners"; // Importing the spinner

const ItemOem = () => {
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
    fetchoem();
  }, []);

  const fetchoem = async () => {
    setLoading(true);
    try {
      const fieldMapping = {
        "Name (En)": "make_NameEn",
        "Name (Ar)": "make_NameAr",
        Code: "make_Code",
      };

      const response = await fetchItemOems(filters, fieldMapping);
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          id: item.oeM_Id,
          code: item.oeM_Code,
          nameEn: item.oeM_Number,
          nameAr:item.oeM_Number,
        }));
        setData(transformedData);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching Unit data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextCode = async () => {
    try {
      const data = await fetchNextItemOemCode();
      setInputValues((prev) => ({ ...prev, code: data.nextNumberOem }));
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };
  const handleRowAction = async (rowData) => {
    try {
        const { id } = rowData;
        const data = await fetchItemOemById(id);

      
       
        // Update state with the fetched data
        setInputValues({
            id: data.oeM_Id,         
            code: data.oeM_Code,     
            NameEn: data.oeM_Number, 
            NameAr: data.oeM_Number, 
        });

        setShowInputFields(true);
    } catch (error) {
        console.error("Error fetching data or handling row action:", error);
        alert("An error occurred while handling the row action.");
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

  const handleSave = async () => {
    if (!inputValues.NameEn ) {
      Swal.fire("Error", "Both Name(En) and Name(Ar) are required.", "error");
      return;
    }

    try {
      const payload = {
        OEM_id: inputValues.id || 0, // ID is used for updates, 0 for new entries
        OEM_Code: inputValues.code,
        OEM_Number: inputValues.NameEn,
        OEM_CreatedBy: 1,
      };

      const response = await saveOem(payload);
      if (response && response.success) {
        // Refresh data after saving
        Swal.fire("Saved", "Item oem  saved successfully!", "success");
        
        setShowInputFields(false);
        setInputValues({ id: null, code: "", NameEn: "", NameAr: "" });
        fetchoem(); 
      } else {
        Swal.fire("Error", response.statusMessage || "Failed to save item name  .", "error");
      }
    } catch (error) {
      console.error("Error saving Item Unit  :", error);
      Swal.fire("Error", "An unexpected error occurred.", "error");
    }
  };

  const handleCancel = () => {
    setShowInputFields(false);
    setInputValues({ id: null, code: "", NameEn: "", NameAr: "" }); // Reset values when cancel
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Item Oem </h4>
          {!showInputFields && (
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={handleButtonClick}
            >
              <i className="bx bx-save me-2"></i> Add New
            </button>
          )}
        </div>

        {showInputFields && (
          <div className="mb-3">
            <div className="row g-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  value={inputValues.code}
                  onChange={handleInputChange}
                  placeholder="Code"
                  disabled
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="NameEn"
                  value={inputValues.NameEn}
                  onChange={handleInputChange}
                  placeholder="Oem Number"
                />
              </div>
            
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button className="btn btn-success me-2" onClick={handleSave}>
                <i className="bx bx-check-circle me-2"></i> Save
              </button>
              <button className="btn btn-danger" onClick={handleCancel}>
                <i className="bx bx-x-circle me-2"></i> Cancel
              </button>
            </div>
          </div>
        )}

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
          SearchPlaceholder="Search for Item Oem..."
          pagination="pagination"
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
          loading={loading}
          handleRowClick={handleRowAction} // Pass custom row click handler
        />

      )}
      </div>
    </div>
  );
};

export default ItemOem;
