import React, { useEffect, useState } from "react";
import { getEmployees, saveEmployee } from "../../components/Api/GmsEmployee";
import { Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, Button, Table } from "reactstrap";
import Select from "react-select";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Pagination from "rc-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import Country from "../Master/Country";
import Department from "../Master/Department";
import Designation from "../Master/Designation";

const defaultForm = {
  employee_Id: 0,
  employee_NameEn: "",
  employee_NameAr: "",
  employee_CreatedDate: new Date().toISOString(),
  employee_CreatedBy: 1,
  employee_ModifiedDate: new Date().toISOString(),
  employee_ModifiedBy: 1,
  employee_Business_Id: 1,
  employee_Gender_Id: null,
  employee_BirthDate: "",
  employee_JoinDate: "",
  employee_Passport_Date: "",
  employee_Passport_ExpDate: "",
  employee_NatID: "",
  employee_NatID_Date: "",
  employee_NatID_ExpDate: "",
  employee_Country_Id: null,
  employee_Address1: "",
  employee_Department_ID: null,
  employee_Designation_ID: null,
  employee_Branch_Id: null,
  employee_PassportNumber: "",
  employee_VisaNumber: "",
  employee_Visa_Date: "",
  employee_Visa_ExpDate: "",
  employee_Address2: "",
  employee_ServiceEndDate: ""
};

const emptyFilter = {
  employee_Id: null,
  employee_Code: "",
  employee_NameEn: "",
  employee_NameAr: "",
  employee_CreatedDate: null,
  employee_CreatedBy: null,
  employee_ModifiedDate: null,
  employee_ModifiedBy: null,
  employee_Business_Id: null,
  employee_Gender_Id: null,
  employee_BirthDate: null,
  employee_JoinDate: null,
  employee_Department_ID: null,
  employee_Designation_ID: null,
  employee_Branch_Id: null,
  employee_Country_Id: null,
  Branch:"",
  Gender:"",
  employee_Passport_Date: null,
  employee_Passport_ExpDate: null,
  employee_NatID: "",
  employee_NatID_Date: null,    
  employee_NatID_ExpDate: null,
  employee_PassportNumber: "",
  employee_VisaNumber: "",
  employee_Visa_Date: null,
  employee_Visa_ExpDate: null,
  employee_Address1: "",
  employee_Address2: "",
  employee_ServiceEndDate: null,
  Country:"",
  Department:"",
  Designation:"",
  business_Name: "",
  
  
};

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [filter, setFilter] = useState(emptyFilter);
  const [showFilters, setShowFilters] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadEmployees();
  }, [page]);

  const loadEmployees = async (filterData = emptyFilter) => {
    setLoading(true);
    try {
      const data = await getEmployees(filterData);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = data.slice(startIndex, endIndex);
      setEmployees(paginatedData);
      setTotalCount(data.length);
    } catch (error) {
      alert("Error loading employees: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.type === 'date' ? e.target.value : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        ...form,
        employee_ModifiedDate: new Date().toISOString(),
        // Convert date strings to proper format for API
        employee_BirthDate: form.employee_BirthDate ? new Date(form.employee_BirthDate).toISOString() : null,
        employee_JoinDate: form.employee_JoinDate ? new Date(form.employee_JoinDate).toISOString() : null,
        employee_Passport_Date: form.employee_Passport_Date ? new Date(form.employee_Passport_Date).toISOString() : null,
        employee_Passport_ExpDate: form.employee_Passport_ExpDate ? new Date(form.employee_Passport_ExpDate).toISOString() : null,
        employee_NatID_Date: form.employee_NatID_Date ? new Date(form.employee_NatID_Date).toISOString() : null,
        employee_NatID_ExpDate: form.employee_NatID_ExpDate ? new Date(form.employee_NatID_ExpDate).toISOString() : null,
        employee_Visa_Date: form.employee_Visa_Date ? new Date(form.employee_Visa_Date).toISOString() : null,
        employee_Visa_ExpDate: form.employee_Visa_ExpDate ? new Date(form.employee_Visa_ExpDate).toISOString() : null,
        employee_ServiceEndDate: form.employee_ServiceEndDate ? new Date(form.employee_ServiceEndDate).toISOString() : null,
      };
      const result = await saveEmployee(formData);
      alert(result.message);
      setForm(defaultForm);
      setIsEditing(false);
      loadEmployees(filter);
    } catch (error) {
      alert("Error saving employee: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setForm({
      ...employee,
      employee_ModifiedDate: new Date().toISOString(),
      // Convert dates to input format (YYYY-MM-DD)
      employee_BirthDate: employee.employee_BirthDate ? new Date(employee.employee_BirthDate).toISOString().split('T')[0] : "",
      employee_JoinDate: employee.employee_JoinDate ? new Date(employee.employee_JoinDate).toISOString().split('T')[0] : "",
      employee_Passport_Date: employee.employee_Passport_Date ? new Date(employee.employee_Passport_Date).toISOString().split('T')[0] : "",
      employee_Passport_ExpDate: employee.employee_Passport_ExpDate ? new Date(employee.employee_Passport_ExpDate).toISOString().split('T')[0] : "",
      employee_NatID_Date: employee.employee_NatID_Date ? new Date(employee.employee_NatID_Date).toISOString().split('T')[0] : "",
      employee_NatID_ExpDate: employee.employee_NatID_ExpDate ? new Date(employee.employee_NatID_ExpDate).toISOString().split('T')[0] : "",
      employee_Visa_Date: employee.employee_Visa_Date ? new Date(employee.employee_Visa_Date).toISOString().split('T')[0] : "",
      employee_Visa_ExpDate: employee.employee_Visa_ExpDate ? new Date(employee.employee_Visa_ExpDate).toISOString().split('T')[0] : "",
      employee_ServiceEndDate: employee.employee_ServiceEndDate ? new Date(employee.employee_ServiceEndDate).toISOString().split('T')[0] : "",
    });
    setIsEditing(true);
    setActiveTab(1);
  };

  const handleCancelEdit = () => {
    setForm(defaultForm);
    setIsEditing(false);
  };

  const handleApplyFilter = () => {
    loadEmployees(filter);
  };

  const handleClearFilter = () => {
    setFilter(emptyFilter);
    loadEmployees(emptyFilter);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 2) {
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  };

  // Generate options for searchable dropdowns
  const employeeCodeOptions = [...new Set(employees.map(emp => emp.employee_Code).filter(Boolean))].map(code => ({
    value: code,
    label: code
  }));

  const employeeNameEnOptions = [...new Set(employees.map(emp => emp.employee_NameEn).filter(Boolean))].map(name => ({
    value: name,
    label: name
  }));

  const employeeNameArOptions = [...new Set(employees.map(emp => emp.employee_NameAr).filter(Boolean))].map(name => ({
    value: name,
    label: name
  }));

  const businessOptions = [...new Set(employees.map(emp => emp.employee_Business_Id).filter(Boolean))].map(id => ({
    value: id,
    label: emp => employees.find(e => e.employee_Business_Id === id)?.business_Name || id.toString()
  }));

  const genderOptions = [...new Set(employees.map(emp => emp.employee_Gender_Id).filter(Boolean))].map(id => ({
    value: id,
    label: employees.find(emp => emp.employee_Gender_Id === id)?.gender || id.toString()
  }));

  const countryOptions = [...new Set(employees.map(emp => emp.employee_Country_Id).filter(Boolean))].map(id => ({
    value: id,
    label: employees.find(emp => emp.employee_Country_Id === id)?.country || id.toString()
  }));

  const departmentOptions = [...new Set(employees.map(emp => emp.employee_Department_ID).filter(Boolean))].map(id => ({
    value: id,
    label: employees.find(emp => emp.employee_Department_ID === id)?.department || id.toString()
  }));

  const designationOptions = [...new Set(employees.map(emp => emp.employee_Designation_ID).filter(Boolean))].map(id => ({
    value: id,
    label: employees.find(emp => emp.employee_Designation_ID === id)?.designation || id.toString()
  }));

  const branchOptions = [...new Set(employees.map(emp => emp.employee_Branch_Id).filter(Boolean))].map(id => ({
    value: id,
    label: employees.find(emp => emp.employee_Branch_Id === id)?.branch || id.toString()
  }));

  const createdByOptions = [...new Set(employees.map(emp => emp.employee_CreatedBy).filter(Boolean))].map(id => ({
    value: id,
    label: id.toString()
  }));

  const modifiedByOptions = [...new Set(employees.map(emp => emp.employee_ModifiedBy).filter(Boolean))].map(id => ({
    value: id,
    label: id.toString()
  }));

  const handleSelectChange = (selectedOption, field) => {
    setFilter({ 
      ...filter, 
      [field]: selectedOption ? selectedOption.value : null 
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadEmployees(filter);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Employee" breadcrumbItem="Employee Management" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Employee Management System</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem className={classnames({ current: activeTab === 1 })}>
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => setActiveTab(1)}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1.</span> {isEditing ? "Edit Employee" : "Add Employee"}
                          </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ current: activeTab === 2 })}>
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => setActiveTab(2)}
                          >
                            <span className="number">2.</span> Employee List
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>

                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
                          <Form onSubmit={handleSubmit}>
                            {/* Personal Information Section */}
                            <h5 className="mb-3 text-primary">Personal Information</h5>
                            <Row className="mb-3">
                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_NameEn">
                                    Name (English) *
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="employee_NameEn"
                                    name="employee_NameEn"
                                    placeholder="Name in English"
                                    value={form.employee_NameEn}
                                    onChange={handleFormChange}
                                    required
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_NameAr">
                                    Name (Arabic) *
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="employee_NameAr"
                                    name="employee_NameAr"
                                    placeholder="Name in Arabic"
                                    value={form.employee_NameAr}
                                    onChange={handleFormChange}
                                    required
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Gender_Id">
                                    Gender
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_Gender_Id"
                                    name="employee_Gender_Id"
                                    placeholder="Gender ID"
                                    value={form.employee_Gender_Id || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_BirthDate">
                                    Birth Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_BirthDate"
                                    name="employee_BirthDate"
                                    value={form.employee_BirthDate}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Country_Id">
                                    Country
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_Country_Id"
                                    name="employee_Country_Id"
                                    placeholder="Country ID"
                                    value={form.employee_Country_Id || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_NatID">
                                    National ID
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="employee_NatID"
                                    name="employee_NatID"
                                    placeholder="National ID Number"
                                    value={form.employee_NatID}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col lg="6">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_NatID_Date">
                                    National ID Issue Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_NatID_Date"
                                    name="employee_NatID_Date"
                                    value={form.employee_NatID_Date}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_NatID_ExpDate">
                                    National ID Expiry Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_NatID_ExpDate"
                                    name="employee_NatID_ExpDate"
                                    value={form.employee_NatID_ExpDate}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            {/* Address Information */}
                            <h5 className="mb-3 text-primary">Address Information</h5>
                            <Row className="mb-3">
                              <Col lg="6">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Address1">
                                    Address 1
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="employee_Address1"
                                    name="employee_Address1"
                                    placeholder="Primary Address"
                                    value={form.employee_Address1}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Address2">
                                    Address 2
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="employee_Address2"
                                    name="employee_Address2"
                                    placeholder="Secondary Address"
                                    value={form.employee_Address2}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            {/* Employment Information */}
                            <h5 className="mb-3 text-primary">Employment Information</h5>
                            <Row className="mb-3">
                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Business_Id">
                                    Business ID
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_Business_Id"
                                    name="employee_Business_Id"
                                    placeholder="Business ID"
                                    value={form.employee_Business_Id || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Department_ID">
                                    Department
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_Department_ID"
                                    name="employee_Department_ID"
                                    placeholder="Department ID"
                                    value={form.employee_Department_ID || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Designation_ID">
                                    Designation
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_Designation_ID"
                                    name="employee_Designation_ID"
                                    placeholder="Designation ID"
                                    value={form.employee_Designation_ID || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Branch_Id">
                                    Branch
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_Branch_Id"
                                    name="employee_Branch_Id"
                                    placeholder="Branch ID"
                                    value={form.employee_Branch_Id || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_JoinDate">
                                    Join Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_JoinDate"
                                    name="employee_JoinDate"
                                    value={form.employee_JoinDate}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_ServiceEndDate">
                                    Service End Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_ServiceEndDate"
                                    name="employee_ServiceEndDate"
                                    value={form.employee_ServiceEndDate}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            {/* Passport & Visa Information */}
                            <h5 className="mb-3 text-primary">Passport & Visa Information</h5>
                            <Row className="mb-3">
                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_PassportNumber">
                                    Passport Number
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="employee_PassportNumber"
                                    name="employee_PassportNumber"
                                    placeholder="Passport Number"
                                    value={form.employee_PassportNumber}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Passport_Date">
                                    Passport Issue Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_Passport_Date"
                                    name="employee_Passport_Date"
                                    value={form.employee_Passport_Date}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Passport_ExpDate">
                                    Passport Expiry Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_Passport_ExpDate"
                                    name="employee_Passport_ExpDate"
                                    value={form.employee_Passport_ExpDate}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_VisaNumber">
                                    Visa Number
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="employee_VisaNumber"
                                    name="employee_VisaNumber"
                                    placeholder="Visa Number"
                                    value={form.employee_VisaNumber}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Visa_Date">
                                    Visa Issue Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_Visa_Date"
                                    name="employee_Visa_Date"
                                    value={form.employee_Visa_Date}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_Visa_ExpDate">
                                    Visa Expiry Date
                                  </Label>
                                  <Input
                                    type="date"
                                    className="form-control"
                                    id="employee_Visa_ExpDate"
                                    name="employee_Visa_ExpDate"
                                    value={form.employee_Visa_ExpDate}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            {/* System Information */}
                            <h5 className="mb-3 text-primary">System Information</h5>
                            <Row className="mb-3">
                              <Col lg="6">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_CreatedBy">
                                    Created By
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_CreatedBy"
                                    name="employee_CreatedBy"
                                    placeholder="Created By User ID"
                                    value={form.employee_CreatedBy || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>

                              <Col lg="6">
                                <div className="form-group">
                                  <Label className="col-form-label" htmlFor="employee_ModifiedBy">
                                    Modified By
                                  </Label>
                                  <Input
                                    type="number"
                                    className="form-control"
                                    id="employee_ModifiedBy"
                                    name="employee_ModifiedBy"
                                    placeholder="Modified By User ID"
                                    value={form.employee_ModifiedBy || ""}
                                    onChange={handleFormChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            {/* Action Buttons */}
                            <Row>
                              <Col lg="12">
                                <div className="d-flex gap-2">
                                  <Button
                                    color="success"
                                    type="submit"
                                    disabled={loading}
                                  >
                                    {loading ? "Saving..." : (isEditing ? "Update Employee" : "Save Employee")}
                                  </Button>
                                  {isEditing && (
                                    <Button
                                      color="secondary"
                                      type="button"
                                      onClick={handleCancelEdit}
                                    >
                                      Cancel Edit
                                    </Button>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>

                        <TabPane tabId={2}>
                          {/* Filter Section */}
                          <div className="mb-4">
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <h5 className="mb-0 fw-bold">Filter Employees</h5>
                              <Button
                                color="primary"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                              >
                                {showFilters ? "Hide Filters" : "Show Filters"}
                              </Button>
                            </div>

                            {showFilters && (
                              <Card>
                                <CardBody>
                                  {/* Basic Info Filters */}
                                  <h6 className="text-primary mb-3">Basic Information</h6>
                                  <Row className="mb-3">
                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_Code">Employee Code</Label>
                                        <Select
                                          options={employeeCodeOptions}
                                          value={employeeCodeOptions.find(option => option.value === filter.employee_Code)}
                                          placeholder="Select Employee Code"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_Code')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_NameEn">Name (English)</Label>
                                        <Select
                                          options={employeeNameEnOptions}
                                          value={employeeNameEnOptions.find(option => option.value === filter.employee_NameEn)}
                                          placeholder="Select Name (English)"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_NameEn')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_NameAr">Name (Arabic)</Label>
                                        <Select
                                          options={employeeNameArOptions}
                                          value={employeeNameArOptions.find(option => option.value === filter.employee_NameAr)}
                                          placeholder="Select Name (Arabic)"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_NameAr')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_Business_Id">Business</Label>
                                        <Select
                                          options={businessOptions}
                                          value={businessOptions.find(option => option.value === filter.employee_Business_Id)}
                                          placeholder="Select Business"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_Business_Id')}
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  {/* Employment Filters */}
                                  <h6 className="text-primary mb-3">Employment Information</h6>
                                  <Row className="mb-3">
                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_Department_ID">Department</Label>
                                        <Select
                                          options={departmentOptions}
                                          value={departmentOptions.find(option => option.value === filter.employee_Department_ID)}
                                          placeholder="Select Department"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_Department_ID')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_Designation_ID">Designation</Label>
                                        <Select
                                          options={designationOptions}
                                          value={designationOptions.find(option => option.value === filter.employee_Designation_ID)}
                                          placeholder="Select Designation"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_Designation_ID')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_Branch_Id">Branch</Label>
                                        <Select
                                          options={branchOptions}
                                          value={branchOptions.find(option => option.value === filter.employee_Branch_Id)}
                                          placeholder="Select Branch"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_Branch_Id')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="3">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_Gender_Id">Gender</Label>
                                        <Select
                                          options={genderOptions}
                                          value={genderOptions.find(option => option.value === filter.employee_Gender_Id)}
                                          placeholder="Select Gender"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_Gender_Id')}
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col lg="4">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_Country_Id">Country</Label>
                                        <Select
                                          options={countryOptions}
                                          value={countryOptions.find(option => option.value === filter.employee_Country_Id)}
                                          placeholder="Select Country"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_Country_Id')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="4">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_JoinDate">Join Date</Label>
                                        <Input
                                          type="date"
                                          className="form-control"
                                          id="filter_employee_JoinDate"
                                          name="employee_JoinDate"
                                          value={filter.employee_JoinDate || ""}
                                          onChange={handleFilterChange}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="4">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_BirthDate">Birth Date</Label>
                                        <Input
                                          type="date"
                                          className="form-control"
                                          id="filter_employee_BirthDate"
                                          name="employee_BirthDate"
                                          value={filter.employee_BirthDate || ""}
                                          onChange={handleFilterChange}
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  {/* System Filters */}
                                  <h6 className="text-primary mb-3">System Information</h6>
                                  <Row className="mb-3">
                                    <Col lg="4">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_CreatedBy">Created By</Label>
                                        <Select
                                          options={createdByOptions}
                                          value={createdByOptions.find(option => option.value === filter.employee_CreatedBy)}
                                          placeholder="Select Created By"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_CreatedBy')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="4">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_ModifiedBy">Modified By</Label>
                                        <Select
                                          options={modifiedByOptions}
                                          value={modifiedByOptions.find(option => option.value === filter.employee_ModifiedBy)}
                                          placeholder="Select Modified By"
                                          classNamePrefix="select2-selection"
                                          isClearable={true}
                                          isSearchable={true}
                                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'employee_ModifiedBy')}
                                        />
                                      </div>
                                    </Col>

                                    <Col lg="4">
                                      <div className="form-group">
                                        <Label htmlFor="filter_employee_CreatedDate">Created Date</Label>
                                        <Input
                                          type="date"
                                          className="form-control"
                                          id="filter_employee_CreatedDate"
                                          name="employee_CreatedDate"
                                          value={filter.employee_CreatedDate || ""}
                                          onChange={handleFilterChange}
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <div className="d-flex gap-2">
                                    <Button
                                      color="primary"
                                      onClick={handleApplyFilter}
                                      disabled={loading}
                                    >
                                      Apply Filter
                                    </Button>
                                    <Button
                                      color="warning"
                                      onClick={handleClearFilter}
                                    >
                                      Clear Filter
                                    </Button>
                                  </div>
                                </CardBody>
                              </Card>
                            )}
                          </div>

                          {/* Employee Table */}
                          <Card>
                            <CardBody>
                              <h5 className="mb-3">Employee List ({employees.length} records)</h5>
                              {loading ? (
                                <p>Loading employees...</p>
                              ) : (
                                <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
                                  <Table bordered responsive>
                                    <thead>
                                      <tr>
                                        <th>Sl.No</th>
                                        <th>Code</th>
                                        <th>Name (EN)</th>
                                        <th>Name (AR)</th>
                                        <th>Business</th>
                                        <th>Department</th>
                                        <th>Designation</th>
                                        <th>Branch</th>
                                        <th>Gender</th>
                                        <th>Country</th>
                                        <th>Birth Date</th>
                                        <th>Join Date</th>
                                        <th>National ID</th>
                                        <th>Passport</th>
                                        <th>Visa</th>
                                        <th>Address 1</th>
                                        <th>Created Date</th>
                                        <th>Created By</th>
                                        <th>Modified Date</th>
                                        <th>Modified By</th>
                                        <th>Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {employees.length === 0 ? (
                                        <tr>
                                          <td colSpan="21" className="text-center">
                                            No employees found
                                          </td>
                                        </tr>
                                      ) : (
                                        employees.map((emp, index) => (
                                          <tr key={emp.employee_Id}>
                                            <td>{(page - 1) * pageSize + index + 1}</td>
                                            <td>{emp.employee_Code}</td>
                                            <td>{emp.employee_NameEn}</td>
                                            <td>{emp.employee_NameAr}</td>
                                            <td>{emp.business_Name || emp.employee_Business_Id}</td>
                                            <td>{emp.department || emp.employee_Department_ID}</td>
                                            <td>{emp.designation || emp.employee_Designation_ID}</td>
                                            <td>{emp.branch || emp.employee_Branch_Id}</td>
                                            <td>{emp.gender || emp.employee_Gender_Id}</td>
                                            <td>{emp.country || emp.employee_Country_Id}</td>
                                            <td>{formatDate(emp.employee_BirthDate)}</td>
                                            <td>{formatDate(emp.employee_JoinDate)}</td>
                                            <td>{emp.employee_NatID}</td>
                                            <td>{emp.employee_PassportNumber}</td>
                                            <td>{emp.employee_VisaNumber}</td>
                                            <td>{emp.employee_Address1}</td>
                                            <td>{formatDate(emp.employee_CreatedDate)}</td>
                                            <td>{emp.employee_CreatedBy}</td>
                                            <td>{formatDate(emp.employee_ModifiedDate)}</td>
                                            <td>{emp.employee_ModifiedBy}</td>
                                            <td>
                                              <Button
                                                color="info"
                                                size="sm"
                                                onClick={() => handleEdit(emp)}
                                              >
                                                Edit
                                              </Button>
                                            </td>
                                          </tr>
                                        ))
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              )}

                              <div className="d-flex justify-content-between align-items-center mt-4">
                                <div className="text-muted">
                                  Showing {employees.length > 0 ? (page - 1) * pageSize + 1 : 0} to {Math.min(page * pageSize, totalCount)} of {totalCount} entries
                                </div>
                                {totalCount > pageSize && (
                                  <Pagination
                                    className="pagination-data"
                                    current={page}
                                    total={totalCount}
                                    pageSize={pageSize}
                                    onChange={handlePageChange}
                                    hideOnSinglePage={true}
                                    showTitle={false}
                                  />
                                )}
                              </div>
                            </CardBody>
                          </Card>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}