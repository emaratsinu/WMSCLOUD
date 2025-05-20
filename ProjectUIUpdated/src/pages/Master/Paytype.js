import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import {
    retrieveAllPayTypeData,
  fetchNextPaytypeCode,
  savepaytype,
  fetchPaytypeById,
  
} from "../../components/Api/CurrencyApiService";
import TableContainer from "../../components/Common/TableContainer";
import { ClipLoader } from "react-spinners"; // Importing the spinner

const Paytype = () => {
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
    fetchPaytype();
  }, []);

  const fetchPaytype = async () => {
    setLoading(true);
    try {
      const fieldMapping = {
        "Name (En)": "make_NameEn",
        "Name (Ar)": "make_NameAr",
        Code: "make_Code",
      };

      const response = await retrieveAllPayTypeData(filters, fieldMapping);
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          id: item.payType_Id,
          code: item.payType_Code,
          nameEn: item.payType_NameEn,
          nameAr: item.payType_NameAr,
        }));
        setData(transformedData);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching paytype data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextCode = async () => {
    try {
      const data = await fetchNextPaytypeCode();
      setInputValues((prev) => ({ ...prev, code: data.nxtCarPayCode }));
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };

  const handleRowAction = async (row) => {
    try {
      const { id } = row; // Access the row data directly
      const data = await fetchPaytypeById(id); // Fetch details based on the ID
      setInputValues({
        id: data.payType_Id,
        code: data.payType_Code,
        NameEn: data.payType_NameEn,
        NameAr: data.payType_NameAr,
      });
      setShowInputFields(true);
    } catch (error) {
      console.error("Error fetching paytype details:", error);
      Swal.fire("Error", "Failed to fetch Paytype details.", "error");
    }
  };

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
        PayType_Id: inputValues.id || 0, // ID is used for updates, 0 for new entries
        PayType_Code: inputValues.code,
        PayType_NameEn: inputValues.NameEn,
        PayType_NameAr: inputValues.NameAr,
       
      };

      const response = await savepaytype(payload);
      if (response && response.success) {
        Swal.fire("Saved", "Paytype saved successfully!", "success");
        setShowInputFields(false);
        setInputValues({ id: null, code: "", NameEn: "", NameAr: "" });
        fetchPaytype(); // Refresh data after saving
      } else {
        Swal.fire("Error", response.statusMessage || "Failed to save car make.", "error");
      }
    } catch (error) {
      console.error("Error saving Paytype:", error);
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
          <h4 className="mb-0">Paytype</h4>
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
          SearchPlaceholder="Search for  Paytype..."
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

export default Paytype;
