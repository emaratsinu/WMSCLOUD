import React, { useEffect, useState } from "react";
import { getBusinesses, saveBusiness } from "../../components/Api/GmsBusiness";
import Select from "react-select";
import Pagination from "rc-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultForm = {
  business_Id: null,
  business_Code: "",
  business_NameEn: "",
  business_NameAr: "",
  business_Company_Id: 1,
  business_Active: true,
  business_CreatedDate: new Date().toISOString(),
  business_CreatedBy: 1,
  business_ModifiedDate: new Date().toISOString(),
  business_ModifiedBy: 1,
};

const emptyFilter = {
  business_Code: "",
  business_NameEn: "",
  business_NameAr: "",
  business_Company_Id: null,
  business_Active: null,
};

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [filter, setFilter] = useState(emptyFilter);
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadBusinesses();
  }, [page]);

  const loadBusinesses = async (filterData = emptyFilter) => {
    setLoading(true);
    try {
      const data = await getBusinesses(filterData);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = data.slice(startIndex, endIndex);
      setBusinesses(paginatedData);
      setTotalCount(data.length);
    } catch (error) {
      alert("Error loading businesses: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value === "" ? null : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        ...form,
        business_ModifiedDate: new Date().toISOString(),
      };
      const result = await saveBusiness(formData);
      alert(result.message);
      setForm(defaultForm);
      setIsEditing(false);
      loadBusinesses(filter);
    } catch (error) {
      alert("Error saving business: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (business) => {
    setForm({
      ...business,
      business_ModifiedDate: new Date().toISOString(),
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setForm(defaultForm);
    setIsEditing(false);
  };

  const handleApplyFilter = () => {
    loadBusinesses(filter);
  };

  const handleClearFilter = () => {
    setFilter(emptyFilter);
    loadBusinesses(emptyFilter);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  // Generate options for searchable dropdowns
  const businessCodeOptions = businesses.map(b => ({
    value: b.business_Code,
    label: b.business_Code
  }));

  const businessNameEnOptions = businesses.map(b => ({
    value: b.business_NameEn,
    label: b.business_NameEn
  }));

  const businessNameArOptions = businesses.map(b => ({
    value: b.business_NameAr,
    label: b.business_NameAr
  }));

  const companyIdOptions = [...new Set(businesses.map(b => b.business_Company_Id))].map(id => ({
    value: id,
    label: id?.toString()
  }));

  const handleSelectChange = (selectedOption, field) => {
    setFilter({ 
      ...filter, 
      [field]: selectedOption ? selectedOption.value : null 
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadBusinesses(filter);
  };

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Business Management</h4>
        </div>

        {/* Form Section */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">
              {isEditing ? "Edit Business" : "Add New Business"}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Name (English)</label>
                  <input
                    className="form-control"
                    name="business_NameEn"
                    placeholder="Name in English"
                    value={form.business_NameEn}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Name (Arabic)</label>
                  <input
                    className="form-control"
                    name="business_NameAr"
                    placeholder="Name in Arabic"
                    value={form.business_NameAr}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label className="form-label">Company ID</label>
                  <input
                    className="form-control"
                    name="business_Company_Id"
                    type="number"
                    value={form.business_Company_Id}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Created By</label>
                  <input
                    className="form-control"
                    name="business_CreatedBy"
                    type="number"
                    value={form.business_CreatedBy}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Modified By</label>
                  <input
                    className="form-control"
                    name="business_ModifiedBy"
                    type="number"
                    value={form.business_ModifiedBy}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="business_Active"
                      checked={form.business_Active}
                      onChange={handleFormChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button 
                  className="btn btn-success me-2" 
                  type="submit" 
                  disabled={loading}
                >
                  <i className="bx bx-check-circle me-2"></i>
                  {loading ? "Saving..." : (isEditing ? "Update Business" : "Save Business")}
                </button>
                {isEditing && (
                  <button 
                    className="btn btn-danger" 
                    type="button" 
                    onClick={handleCancelEdit}
                  >
                    <i className="bx bx-x-circle me-2"></i>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Filter Section */}
        <div className="card mb-4">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Filter Businesses</h5>
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="bx bx-filter me-2"></i>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>
          {showFilters && (
            <div className="card-body">
              <div className="row g-3 mb-3">
                <div className="col-md-3">
                  <label className="form-label">Business Code</label>
                  <Select
                    value={businessCodeOptions.find(option => option.value === filter.business_Code)}
                    onChange={(option) => handleSelectChange(option, 'business_Code')}
                    options={businessCodeOptions}
                    isClearable
                    placeholder="Select Business Code"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Name (English)</label>
                  <Select
                    value={businessNameEnOptions.find(option => option.value === filter.business_NameEn)}
                    onChange={(option) => handleSelectChange(option, 'business_NameEn')}
                    options={businessNameEnOptions}
                    isClearable
                    placeholder="Select Name (English)"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Name (Arabic)</label>
                  <Select
                    value={businessNameArOptions.find(option => option.value === filter.business_NameAr)}
                    onChange={(option) => handleSelectChange(option, 'business_NameAr')}
                    options={businessNameArOptions}
                    isClearable
                    placeholder="Select Name (Arabic)"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Company ID</label>
                  <Select
                    value={companyIdOptions.find(option => option.value === filter.business_Company_Id)}
                    onChange={(option) => handleSelectChange(option, 'business_Company_Id')}
                    options={companyIdOptions}
                    isClearable
                    placeholder="Select Company ID"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button 
                  className="btn btn-primary me-2" 
                  onClick={handleApplyFilter} 
                  disabled={loading}
                >
                  <i className="bx bx-search me-2"></i>
                  Apply Filter
                </button>
                <button 
                  className="btn btn-warning" 
                  onClick={handleClearFilter}
                >
                  <i className="bx bx-refresh me-2"></i>
                  Clear Filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Business List ({businesses.length})</h5>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Business Code</th>
                      <th>Name EN</th>
                      <th>Name AR</th>
                      <th>Company ID</th>
                      <th>Active</th>
                      <th>Created</th>
                      <th>Created By</th>
                      <th>Modified</th>
                      <th>Modified By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.length === 0 ? (
                      <tr>
                        <td colSpan="11" className="text-center">No businesses found</td>
                      </tr>
                    ) : (
                      businesses.map((b, index) => (
                        <tr key={b.business_Id}>
                          <td>{(page - 1) * pageSize + index + 1}</td>
                          <td>{b.business_Code}</td>
                          <td>{b.business_NameEn}</td>
                          <td>{b.business_NameAr}</td>
                          <td>{b.business_Company_Id}</td>
                          <td>
                            <span className={`badge ${b.business_Active ? 'bg-success' : 'bg-danger'}`}>
                              {b.business_Active ? "Yes" : "No"}
                            </span>
                          </td>
                          <td>{formatDate(b.business_CreatedDate)}</td>
                          <td>{b.business_CreatedBy}</td>
                          <td>{formatDate(b.business_ModifiedDate)}</td>
                          <td>{b.business_ModifiedBy}</td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => handleEdit(b)}
                            >
                              <i className="bx bx-edit me-1"></i>
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {businesses.length > 0 && (
              <div className="d-flex justify-content-end mt-3">
                <Pagination
                  current={page}
                  total={totalCount}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  className="pagination"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}