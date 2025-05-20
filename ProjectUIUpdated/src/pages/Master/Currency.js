import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import {
  retrieveAllCurrencyData,
  fetchNextCurrencyCode,
  saveCurrency,
  fetchCurrencyById,
} from "../../components/Api/CurrencyApiService";
import TableContainer from "../../components/Common/TableContainer";

const Currency = () => {
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
    fetchCurrency();
  }, []);

  const fetchCurrency = async () => {
    setLoading(true);
    try {
      const fieldMapping = {
        "Name (En)": "make_NameEn",
        "Name (Ar)": "make_NameAr",
        Code: "make_Code",
      };

      const response = await retrieveAllCurrencyData(filters, fieldMapping);
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          id: item.curr_Id,
          code: item.curr_Code,
          nameEn: item.curr_ShortCode,
          nameAr: item.curr_Desc,
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

  const fetchNextCode = async () => {
    try {
      const data = await fetchNextCurrencyCode();
      setInputValues((prev) => ({ ...prev, code: data.nxtCountryCode }));
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };
  const handleRowAction = async (rowData) => {
    try {
        // Destructure `id` from `rowData`
        const { id } = rowData;

        // Fetch data for the specific ID
        const data = await fetchCurrencyById(id);

        // Update state with the fetched data
        setInputValues({
            id: data.curr_Id,
            code: data.curr_Code,
            NameEn: data.curr_ShortCode,
            NameAr: data.curr_Desc,
        });

        // Show input fields
        setShowInputFields(true);

        // Log and display the clicked row data
       // console.log("Row clicked in parent:", rowData);
       // alert(`Row clicked: ${JSON.stringify(rowData)}`);
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
    if (!inputValues.NameEn || !inputValues.NameAr) {
      Swal.fire("Error", "Both Name(En) and Name(Ar) are required.", "error");
      return;
    }

    try {
      const payload = {
        Curr_Id: inputValues.id || 0, // ID is used for updates, 0 for new entries
        Curr_Code: inputValues.code,
        Curr_ShortCode: inputValues.NameEn,
        Curr_Desc: inputValues.NameAr,
      
      };

      const response = await saveCurrency(payload);
      if (response && response.success) {
        Swal.fire("Saved", "Currency  saved successfully!", "success");
        setShowInputFields(false);
        setInputValues({ id: null, code: "", NameEn: "", NameAr: "" });
        fetchCurrency(); // Refresh data after saving
      } else {
        Swal.fire("Error", response.statusMessage || "Failed to save Currency make.", "error");
      }
    } catch (error) {
      console.error("Error saving Currency :", error);
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
          <h4 className="mb-0">CUrrency</h4>
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
                  placeholder="Name(En)"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="NameAr"
                  value={inputValues.NameAr}
                  onChange={handleInputChange}
                  placeholder="Name(Ar)"
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

        <TableContainer
          columns={columns}
          data={data || []}
          isGlobalFilter={true}
          isPagination={true}
          SearchPlaceholder="Search for Currency..."
          pagination="pagination"
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
          loading={loading}
          handleRowClick={handleRowAction} // Pass custom row click handler
        />
      </div>
    </div>
  );
};

export default Currency;
