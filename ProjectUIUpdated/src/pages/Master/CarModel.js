import React, { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";

import '../Master/Car.css'
import { ClipLoader } from "react-spinners"; // Importing the spinner

import {
  retrieveAllCarModelData,
  fetchNextCarModelCode,
  saveCarModel,
  fetchCarModelById,
  fetchCarMakes,
} from "../../components/Api/CurrencyApiService";
import TableContainer from "../../components/Common/TableContainer";

const CarModel = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showInputFields, setShowInputFields] = useState(false);
  const [carMakes, setCarMakes] = useState([]);

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
    carMakeId: "",
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
    fetchCarModel();
    fetchCarMakeOptions();
  }, []);

  const fetchCarModel = async () => {
    setLoading(true);
    try {
      const fieldMapping = {
        "Name (En)": "make_NameEn",
        "Name (Ar)": "make_NameAr",
        Code: "make_Code",
      };
      const response = await retrieveAllCarModelData(filters, fieldMapping);
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          id: item.model_Id,
          code: item.model_Code,
          nameEn: item.model_NameEn,
          nameAr: item.model_NameAr,
          carMakeId: item.model_MakeId,
        }));
        setData(transformedData);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching car make data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarMakeOptions = async () => {
    try {
      const carMakesData = await fetchCarMakes();
      if (carMakesData) setCarMakes(carMakesData);
    } catch (error) {
      console.error("Error fetching car make options:", error);
    }
  };

  const fetchNextCode = async () => {
    try {
      const data = await fetchNextCarModelCode();
      setInputValues((prev) => ({ ...prev, code: data.nxtCarmodelCode }));
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };

  const handleRowAction = async (row) => {
    try {
      const data = await fetchCarModelById(row.id);
      setInputValues({
        id: data.model_Id,
        code: data.model_Code,
        NameEn: data.model_NameEn,
        NameAr: data.model_NameAr,
        carMakeId: data.model_MakeId,
      });
      setShowInputFields(true);
    } catch (error) {
      console.error("Error fetching car make details:", error);
      Swal.fire("Error", "Failed to fetch car make details.", "error");
    }
  };

  const handleSave = async () => {
    if (!inputValues.NameEn || !inputValues.NameAr) {
      Swal.fire("Error", "Both Name(En) and Name(Ar) are required.", "error");
      return;
    }

    try {
      const payload = {
        modelId: inputValues.id || 0,
        modelCode: inputValues.code,
        modelNameEn: inputValues.NameEn,
        modelNameAr: inputValues.NameAr,
        modelMakeId: inputValues.carMakeId,
        modelCreatedBy: 169, // Replace with actual user ID
      };

      const response = await saveCarModel(payload);
      if (response && response.success) {
        Swal.fire("Saved", "Car model saved successfully!", "success");
        resetInputFields();
        fetchCarModel();
      } else {
        Swal.fire(
          "Error",
          response.statusMessage || "Failed to save car make.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error saving car make:", error);
      Swal.fire("Error", "An unexpected error occurred.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const resetInputFields = () => {
    setInputValues({
      id: null,
      code: "",
      NameEn: "",
      NameAr: "",
      carMakeId: "",
    });
    setShowInputFields(false);
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Car Model</h4>
          {!showInputFields && (
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                setShowInputFields(true);
                fetchNextCode();
              }}
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
                  placeholder="Name (En)"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="NameAr"
                  value={inputValues.NameAr}
                  onChange={handleInputChange}
                  placeholder="Name (Ar)"
                />
              </div>
              <div className="col-md-4">
                <select
                  name="carMakeId"
                  value={inputValues.carMakeId}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Select Car Make</option>
                  {carMakes.map((carMake) => (
                    <option key={carMake.make_Id} value={carMake.make_Id}>
                      {carMake.make_NameEn} ~ {carMake.make_NameAr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-success me-2" onClick={handleSave}>
                <i className="bx bx-check-circle me-2"></i> Save
              </button>
              <button className="btn btn-danger" onClick={resetInputFields}>
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
  SearchPlaceholder="Search for Carmodel..."
  pagination="pagination"
  paginationWrapper="dataTables_paginate paging_simple_numbers"
  tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
  loading={loading}
  handleRowClick={handleRowAction}
/>
     )}
      </div>
    </div>
  );
};





export default CarModel;



