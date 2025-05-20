import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { Label } from "reactstrap";
import {
  fetchDepartment,
  SaveDepartment,
  fetchNextDepartmentCode,
  fetchDepartmentById,
  fetchBusiness,
} from "../../components/Api/DepartmentApiService";
import TableContainer from "../../components/Common/TableContainer";
import { ClipLoader } from "react-spinners"; // Importing the spinner

const Department = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showInputFields, setShowInputFields] = useState(false);
  const [businessOptions, setBusinessOptions] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

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
    Business_Id: "",
    BusinessName: "",
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
    fetchDept();
    fetchBus();
  }, []);

  


const fetchDept = async () => {
    setLoading(true);
    try {
      const fieldMapping = {
        "Name (En)": "",
        "Name (Ar)": "",
        Code: "",
      };

      const response = await fetchDepartment(filters, fieldMapping);
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
           id: item.dept_Id,
          code: item.dept_Code,
          nameEn: item.dept_NameEn,
          nameAr: item.dept_NameAr,
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

  const fetchBus = async () => {
    setLoading(true);
    try {
      const response = await fetchBusiness();
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          value: item.bus_Id,
          label: item.bus_NameEn,
        }));
        setBusinessOptions(transformedData);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching Business data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextCode = async () => {
    try {
      const data = await fetchNextDepartmentCode();
      setInputValues((prev) => ({ ...prev, code: data.nxtCountryCode }));
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };


  

  const handleRowAction = async (rowData) => {
    try {
      const { id } = rowData;
      const data = await fetchDepartmentById(id);
      setInputValues({
        id: data.dept_Id,
        code: data.dept_Code,
        NameEn: data.dept_NameEn,
        NameAr: data.dept_NameAr,
        Business_Id: data.bus_Id,
       
      });
      setSelectedBusiness({
        value: data.bus_Id,
        label: data.bus_NameEn,
      });

      setShowInputFields(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "An error occurred while fetching department data.", "error");
    }
  };

  const handleButtonClick = () => {
    setShowInputFields(true);
    fetchNextCode();
  };

  const handleSave = async () => {
    if (!inputValues.NameEn || !inputValues.NameAr || !selectedBusiness) {
      Swal.fire("Error", "All fields including Business are required.", "error");
      return;
    }

    try {
      const payload = {
        Dept_Id: inputValues.id || 0,  // Lowercase `d`
        Dept_Code: inputValues.code,   // Lowercase `d`
        Dept_NameEn: inputValues.NameEn,
        Dept_NameAr: inputValues.NameAr,
        Dept_BusId: selectedBusiness.value,
       
      };

      const response = await SaveDepartment(payload);
      if (response && response.success) {
        Swal.fire("Saved", "Department saved successfully!", "success");
        setShowInputFields(false);
        setInputValues({ id: null, code: "", NameEn: "", NameAr: "" });
        setSelectedBusiness(null);
        fetchDept();
      } else {
        Swal.fire("Error", response.statusMessage || "Failed to save department.", "error");
      }
    } catch (error) {
      console.error("Error saving department:", error);
      Swal.fire("Error", "An unexpected error occurred.", "error");
    }
  };

  const handleCancel = () => {
    setShowInputFields(false);
    setInputValues({ id: null, code: "", NameEn: "", NameAr: "" });
    setSelectedBusiness(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Department</h4>
          {!showInputFields && (
            <button className="btn btn-primary" onClick={handleButtonClick}>
              <i className="bx bx-save me-2"></i> Add New
            </button>
          )}
        </div>

        {showInputFields && (
          <div className="mb-3">
            <div className="row g-2">
              <div className="col-md-4">
                <input type="text" className="form-control" name="code" value={inputValues.code} disabled />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" name="NameEn" value={inputValues.NameEn} onChange={handleInputChange} placeholder="Name(En)" />
              </div>
              <div className="col-md-4">
                <input type="text" className="form-control" name="NameAr" value={inputValues.NameAr} onChange={handleInputChange} placeholder="Name(Ar)" />
              </div>
              <div className="col-md-6">
                <Label>Business</Label>
                <Select options={businessOptions} value={selectedBusiness}
                 onChange={setSelectedBusiness}
                 isClearable

                 menuPortalTarget={document.body} // Ensures dropdown renders outside of its parent
                 styles={{
                   menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to stay on top
                   menu: (base) => ({
                     ...base,
                     backgroundColor: "white", // Ensures background is solid
                     zIndex: 9999, // Keeps dropdown on top
                   }),
                 }}
                 
                 />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
              <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
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
          SearchPlaceholder="Search for Department..."
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

export default Department;
