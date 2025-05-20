import React, { useState, useEffect ,useMemo} from 'react';

import * as Yup from 'yup';
import Select from "react-select";
import Swal from "sweetalert2";
import { FaSave } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FaTrash, FaPlus } from "react-icons/fa";
import Pagination from "rc-pagination";
import "../Master/Employee.css"
import{fetchCardEmployee, }from "../../components/Api/EmployeeApiService";

import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Container, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, Button, Modal } from "reactstrap";

import classnames from "classnames"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"


const Employee = () => {

  const [errors, setErrors] = useState({});

 
      
      const [TotalCount, setTotalCount] = useState(0); // 
      const [ItemPart, setItemPart] = useState([]);
      
      const [uploadedFileName, setUploadedFileName] = useState("");
      const [ItemVendor, setItemVendor]=useState([]);
      const [selectedFiles, setselectedFiles] = useState([]);
      const [ItemPrefix, setItemPrefix] = useState([]);
      const [Username, setUsername] = useState([]);
      const [Password, setPassword] = useState([]);
      const [selectedImage, setSelectedImage] = useState(null);

      const [selectedRow, setSelectedRow] = useState(null);  // Store clicked row data
     // recent saved  show in dropdown  
      const [selectedItem, setSelectedItem] = useState(null); 

      const [selectedOems, setSelectedOems] = useState(null);
      const [selectedParts, setSelectedParts] = useState(null);
      const [selectedGroups, setSelectedGroups] = useState(null);
      const [selectedCountries, setSelectedCountries] = useState(null);
      const [selectedVendors, setselectedVendors] = useState(null);
      const [selectedLocations, setSelectedLocations] = useState(null);
      const [selectedCarModel, setSelectedCarModel] = useState(null);

      const [selectedItemPrefix, setSelectedItemPrefix] = useState(null);
      const [selectedManufacture, setSelectedManufacture] = useState(null);
        const [page, setPage] = useState(1);
      const [empFilterField, setEmpFilterField] = useState("Emp_Code");
      const [empFilterCondition, setEmpFilterCondition] = useState("contains");
      const [empFilterValue, setEmpFilterValue] = useState("");
      const [empData, setEmpData] = useState([]);
      const [empLoading, setEmpLoading] = useState(false);
      const [empPage, setEmpPage] = useState(1);
      const [empTotalCount, setEmpTotalCount] = useState(0);
     
      
    
  

      
      const [loading, setLoading] = useState(false);
      const [currentPage, setCurrentPage] = useState(1); // Current page number
      const [pageSize] = useState(10); // Number of rows per page
      const [totalItems, setTotalItems] = useState(0); // Total number of items
      const [pageNumber, setPageNumber] = useState(1);

      const [current, setCurrent] = useState(1); // Current page
const [size, setSize] = useState(10); // Items per page

const [data, setData] = useState([]); // Current page data
const [unitRows, setUnitRows] = useState([
  { id: 1, unit: "Each", unitUp: "Each", factor: 1, isFactorEditable: false },
]); // Initial row with default values

const [inputValues, setInputValues] = useState({ code: "", namecode: "", ItemNameEn: "", itemNameAr: "", itemNameId: "", oemcode: "", oemNo: "", partCode: "", partCodeName: "", partType: "", grpcode: "", grpNameEn: "", grpNameAr: "", countryCode: "", countryNameEn: "", countryNameAr: "", unitcode: "", unitNameEN: "", unitNameAr: "", vendorcode: "", vendorNameEn: "", vendorNameAr: "", timefix: "", DesEn: "", DesAr: "", MaxQty: "", MinQty: "",
   ManfPartNo: "", AgentPrice: "", EcoOrdrQty: "", ManfBar1: "", Manf2Bar2: "", Notes: "",Quality:"",UnitRowNo:"",VendorRowNo:"",CarDetNo:"", ItemPrefixId:"", FromYear:"",ToYear:"",LocationDetNo:"",});

   useEffect(() => {
    fetchCardEmployeeDtls(1, "", "", "");
}, []);


      const [showInputFields, setShowInputFields] = useState(false);


       


        

      

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

        const handleCancel = () => {
          setShowInputFields(false);
          setInputValues({ id: null, code: "", NameEn: "", NameAr: "" }); // Reset values when cancel
        };

        const handleAcceptedFiles = async (acceptedFiles) => {
          if (!inputValues.code) {
            alert("Item Code is missing!");
            return;
          }
        
          const file = acceptedFiles[0];
          if (!file) return; // Prevent errors if no file is selected
        
          const updatedFile = {
            name: file.name,
            preview: URL.createObjectURL(file),
            formattedSize: `${(file.size / 1024).toFixed(2)} KB`, // Format file size
          };
        
          setselectedFiles([updatedFile]); // Set the single file in state
        
          try {
            const response = await uploadFile(file, inputValues.code);
        
            if (response && response.fileName) {
              console.log("Upload Success:", response);
              setUploadedFileName(response.fileName); // Store file name in state
            }
          } catch (error) {
            console.error("Upload Failed:", error);
          }
        };
          function formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return "0 Bytes"
            const k = 1024
            const dm = decimals < 0 ? 0 : decimals
            const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        
            const i = Math.floor(Math.log(bytes) / Math.log(k))
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
          }

        const handleInputChange = (e) => {
            const { id, value } = e.target; // Get the input field ID and value
            setInputValues((prevValues) => ({
              ...prevValues,
              [id]: value, // Use the input's ID to dynamically update the corresponding state field
            }));
          };
          
    
    const [varyingModal, setVaryingModal] = useState(false);

    const [isOemNoModalOpen, setOemModalOpen] = useState(false);
    const [isPartModalOpen, setPartModalOpen] = useState(false);
    const [isGroupModalOpen, setGroupModalOpen] = useState(false);
    const [isCountryModalOpen, setCountryModalOpen] = useState(false);
    const [isUnitModalOpen, setUnitModalOpen] = useState(false);
    const [isUnitSetModalOpen, setUnitSetModalOpen] = useState(false);
    const [modal_1, setModal_1] = useState('');

    const [checkboxState, setCheckboxState] = useState({
        active: false,
        onVacation: false,
        userActive: false,
      });

      const handleCheckboxChange = (e, field) => {
        setCheckboxState((prevState) => ({
          ...prevState,
          [field]: e.target.checked,
        }));
      };

    const tog_varyingModal = () => {
        setVaryingModal(!varyingModal);
    };
    const toggleOemNoModal = () => {

       
        setOemModalOpen(!isOemNoModalOpen);
      };

      const togglePartModal = () => {

        fetchNextpartCode();
       setPartModalOpen(!isPartModalOpen);
      };

      const toggleGroupModal = () => {

        fetchNextgrpcode();
       setGroupModalOpen(!isGroupModalOpen);
      };


      const toggleCountryModal = () => {

        fetchNextCountrycode();
        setCountryModalOpen(!isCountryModalOpen);
      };


      const toggleUnitModal = () => {
        fetchNextUnitcode();
        
        setUnitModalOpen(!isUnitModalOpen);
      };
     


      const toggleUnitSetModal = () => {
        fetchNextUnitcode();
        
        setUnitSetModalOpen(!isUnitSetModalOpen);
      };
     

      const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(customerData.length / value);
        if (current > newPerPage) {
          setCurrent(newPerPage);
        }
      };




     
    
    
    // Call this function when the page changes
    const handlePageChange = (page) => {
        setPageNumber(page);
        fetchAndSetItemList(page); // Fetch new data
    };
    
      const PaginationChange = (page) => {
        setCurrent(page); // Update the current page state
        fetchItemList(page, size); // Re-fetch the data
      };
      
    
      const PrevNextArrow = (current, type, originalElement) => {
        if (type === "prev") {
          return (
            <button title="Prev">
              <FontAwesomeIcon icon={faAngleLeft} />
              <i className="fa fa-angle-double-left"></i>
            </button>
          );
        }
        if (type === "next") {
          return (
            <button title="Next">
              <FontAwesomeIcon icon={faAngleRight} />
              <i className="fa fa-angle-double-right"></i>
            </button>
          );
        }
        return originalElement;
      };

      const handleRowClickUnit = (rowData) => {
        // You can pass any row data here, if you need to show specific details in the modal
        console.log('Row clicked:', rowData); // For debugging
        tog_center(); // Open the modal
      };

      const tog_center = () => {
        setmodal_center(!modal_center);
      };




      const [units, setUnits] = useState([
        { id: 1, unit: "Each", unitUp: "Each", factor: 1 }, // Default row
      ]);
      const [availableUnits, setAvailableUnits] = useState([]); // Units from API

   
      const [modal_center, setmodal_center] = useState(false);

    const [activeTab, setactiveTab] = useState(1)
    const [activeTabVartical, setoggleTabVertical] = useState(1)

    const [passedSteps, setPassedSteps] = useState([1])
    const [passedStepsVertical, setPassedStepsVertical] = useState([1])

    function toggleTab(tab) {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab]
            if (tab >= 1 && tab <= 2) {
                setactiveTab(tab)
                setPassedSteps(modifiedSteps)
            }
        }




    }


   

    const handleIsActiveChange = (id, isChecked) => {
     
      setUnitRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isActive: isChecked } : row
        )
      );
    };
    
    
    //const filePaths = selectedFiles.map((f) => f.name); // Extract the file names
  
    const filePaths = uploadedFileName ? uploadedFileName : "";
    //alert(filePaths);
  //  const itemPhotoPath = filePaths.length > 0 ? filePaths.join(", ") : "";
    
    // Function to save the item once the state is updated
    
    
      const fetchCardEmployeeDtls = async (page = 1, field = "", condition = "", value = "") => {
                setEmpLoading(true);
                try {
                    const response = await fetchCardEmployee(
                        page,
                        pageSize,
                        field.trim(),
                        condition.trim(),
                        value.trim()
                    );
            
                    console.log("Raw Employee API Response:", response);
            
                    if (response && response.items && Array.isArray(response.items)) {
                        const formattedData = response.items.map((item, index) => ({
                            id: item.emp_Id,
                            code: item.emp_Code,
                            mainCode: item.emp_MainCode,
                            nameEn: item.emp_NameEn,
                            nameAr: item.emp_NameAr,
                            dispNam: item.dispNam,
                            designationEn: item.desig_NameEn,
                            designationAr: item.desig_NameAr,
                            isActive: item.emp_IsActive,
                            isActiveUser: item.emp_IsActiveUser,
                            index: (page - 1) * pageSize + index + 1
                        }));
            
                        setEmpData(formattedData);
                        setEmpTotalCount(response.totalCount ?? 0);
                    } else {
                        console.error("Unexpected API response format:", response);
                        setEmpData([]);
                        setEmpTotalCount(0);
                    }
                } catch (error) {
                    console.error("Error fetching employee details:", error);
                    setEmpData([]);
                    setEmpTotalCount(0);
                } finally {
                    setEmpLoading(false); // Fix: Set loading to false after completion
                }
            };
            

            const handleCustomerPageChange = (newPage) => {
              setPageNumber(newPage); // ✅ Correctly updates the state
              setPage(newPage);
              
              if (empFilterValue ==""){
                  
                fetchCardEmployeeDtls(newPage)
              }
              else{
               
                fetchCardEmployeeDtls(newPage, empFilterField, empFilterCondition, empFilterValue);
              }
  
  
             
          };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Forms" breadcrumbItem="Form Wizard" />

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title mb-4">Employee </h4>
                                    <div className="wizard clearfix">
                                        <div className="steps clearfix">
                                            <ul>
                                                <NavItem
                                                    className={classnames({ current: activeTab === 1 })}
                                                >
                                                    <NavLink
                                                        className={classnames({ current: activeTab === 1 })}
                                                        onClick={() => {
                                                            setactiveTab(1)
                                                        }}
                                                        disabled={!(passedSteps || []).includes(1)}
                                                    >
                                                        <span className="number">1.</span> Employee Add 
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem
                                                    className={classnames({ current: activeTab === 2 })}
                                                >
                                                    <NavLink
                                                        className={classnames({ active: activeTab === 2 })}
                                                        onClick={() => {
                                                            setactiveTab(2)
                                                        }}
                                                       // disabled={!(passedSteps || []).includes(2)}
                                                    >
                                                        <span className="number">2.</span> Employee List
                                                       
                                                    </NavLink>
                                                </NavItem>
                                                
                                               
                                            </ul>
                                        </div>
                                        <div className="content clearfix">
                                            <TabContent activeTab={activeTab} className="body">
                                            <TabPane tabId={1}>
  <Form>
    {/* First Row */}
    <Row className="mb-3">
      {/* Non-editable Emp Code */}
      <Col lg="3">
        <div className="form-group">
          <Label className="col-form-label" for="basicpill-itemcode-input">
            Emp Code
          </Label>
          <Input
            type="text"
            className="form-control noneditinp"
            id="basicpill-itemcode-input"
            value={inputValues.code}
            readOnly
          />
        </div>
      </Col>

      {/* Non-editable Emp Code @ */}
      <Col lg="3">
        <div className="form-group">
          <Label className="col-form-label" for="basicpill-itemcode-alt">
            Emp Code @
          </Label>
          <Input
            type="text"
            className="form-control noneditinp"
            id="basicpill-itemcode-alt"
            value={inputValues.code}
            readOnly
          />
        </div>
      </Col>

      {/* Name En */}
      <Col lg="3">
        <div className="form-group">
          <Label className="col-form-label" htmlFor="ItemNameEn">
            Name En:
          </Label>
          <Input type="text" className="form-control" id="ItemNameEn" />
        </div>
      </Col>

      {/* Name Ar */}
      <Col lg="3">
        <div className="form-group">
          <Label className="col-form-label" htmlFor="itemNameAr">
            Name Ar:
          </Label>
          <Input type="text" className="form-control" id="itemNameAr" />
        </div>
      </Col>
    </Row>

    {/* Second Row */}
    <Row className="mb-3">
      {/* Initials */}
      <Col lg="3">
        <div className="form-group">
          <Label className="col-form-label" for="timefix">
            Initials
          </Label>
          <Input
            type="text"
            className="form-control"
            id="initails"
            placeholder="Initails"
          />
        </div>
      </Col>


      <Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-itemprefix-input">Designation</Label>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px" }}>
    <Select
  options={ItemPrefix.map((itemprfx) => ({
    value: itemprfx.prefix_Id,
    label: `${itemprfx.prefix_Code}`,
  }))}
  value={selectedItemPrefix}
  placeholder="Select Designation "
  classNamePrefix="select2-selection"
  isClearable={true} // Allows clearing the selection
  onChange={selectedOption => setSelectedItemPrefix(selectedOption)} // Set selected value
/>


<i
        className="fas fa-save icon-button"
        title="Save"
        onClick={() => {
          tog_varyingModal();
          setModal_1("@fat");
        }}
      ></i>
    </div>
  </div>
</Col>

  
<Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-itemprefix-input">Department</Label>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px" }}>
    <Select
  options={ItemPrefix.map((itemprfx) => ({
    value: itemprfx.prefix_Id,
    label: `${itemprfx.prefix_Code}`,
  }))}
  value={selectedItemPrefix}
  placeholder="Select Department"
  classNamePrefix="select2-selection"
  isClearable={true} // Allows clearing the selection
  onChange={selectedOption => setSelectedItemPrefix(selectedOption)} // Set selected value
/>


<i
        className="fas fa-save icon-button"
        title="Save"
        onClick={() => {
            toggleOemNoModal();
          setModal_1("@fat");
        }}
      ></i>
    </div>
  </div>
</Col>

  <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-address-input1">
                                                                       Address
                                                                    </Label>
                                                                    <input
                                                                        id="AgentPrice"
                                                                        className="form-control"
                                                                       // value={inputValues.AgentPrice || ''}
                                                                        placeholder="Address"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>




</Row>
{/* Modal 1  */}

<Modal isOpen={varyingModal} toggle={tog_varyingModal}>
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">New Item Name</h5>
    <button type="button" className="btn-close" onClick={tog_varyingModal}></button>
  </div>
  <div className="modal-body">
    <form>
      <div className="mb-3">
        <label htmlFor="namecode" className="col-form-label">Item Code:</label>
        <input
          type="text"
          className="form-control"
          id="namecode"
          value={inputValues.namecode}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ItemNameEn" className="col-form-label">Name En:</label>
        <input
          type="text"
          className="form-control"
          id="ItemNameEn" // Match id with state key
          value={inputValues.ItemNameEn} // Controlled value
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemNameAr" className="col-form-label">Name Ar:</label>
        <input
          type="text"
          className="form-control"
          id="itemNameAr" // Match id with state key
          value={inputValues.itemNameAr} // Controlled value
          onChange={handleInputChange}
        />
      </div>
    </form>
  </div>
 
</Modal>


<Modal isOpen={isOemNoModalOpen} toggle={toggleOemNoModal}>
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">Add New Part No</h5>
    <button type="button" className="btn-close" onClick={toggleOemNoModal}></button>
  </div>
  <div className="modal-body">
    <form>
      <div className="mb-3">
        <label htmlFor="partno-code" className="col-form-label">Oem  Code:</label>
        <input
          type="text"
          className="form-control"
          id="oemcode"
          value={inputValues.oemcode}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="partNameEn" className="col-form-label">Oem No:</label>
        <input
          type="text"
          className="form-control"
          id="oemNo"
         value={inputValues.oemNo}
          onChange={handleInputChange}
        />
      </div>
      
    </form>
  </div>
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={toggleOemNoModal}>
      Close
    </button>
    <button type="button" className="btn btn-primary" > 
      Save
    </button>
  </div>
</Modal>



<Row className="mb-3">
      <Col lg="3">
        <div className="mb-3">
          <Label for="imageUpload">Upload Image</Label>
          <Input
            type="file"
            id="imageUpload"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <div className="mt-2">
              <img src={selectedImage} alt="Uploaded" width="100" height="100" className="img-thumbnail" />
            </div>
          )}
        </div>
      </Col>
    </Row>



<Row>
  {/* Current Branch */}
  <Col lg="3">
    <div className="mb-3">
      <Label for="basicpill-partcode-input">Current Branch</Label>
      <Select
        id="basicpill-partcode-input"
        options={ItemPart.map((part) => ({
          value: part.id,
          label: `${part.partCode}`,
        }))}
        value={selectedParts}
        placeholder="Select Part Code"
        classNamePrefix="select2-selection"
        isClearable
        onChange={(selected) => setSelectedParts(selected)}
      />
    </div>
  </Col>

  {/* Status Section with Radio Buttons & Checkbox */}
  <Col lg="5">
    <div className="mb-3">
      <Label>Status</Label>
      <div style={{ display: "flex", flexDirection: "row", gap: "50px", alignItems: "center" }}>
        {/* Radio Button Group for Active & On Vacation */}
        <div className="form-check">
          <Input
            type="radio"
            id="active"
            name="status"  
            className="form-check-input custom-radio"
            onChange={(e) => handleCheckboxChange(e, "active")}
          />
          <Label className="form-check-label" for="active">
            Active
          </Label>
        </div>
        <div className="form-check">
          <Input
            type="radio"
            id="onVacation"
            name="status"  
            className="form-check-input custom-radio"
            onChange={(e) => handleCheckboxChange(e, "onVacation")}
          />
          <Label className="form-check-label" for="onVacation">
            On Vacation
          </Label>
        </div>

        {/* Independent Checkbox for User Active */}
        <div className="form-check">
          <Input
            type="checkbox"
            id="userActive"
            className="form-check-input custom-checkbox"
            onChange={(e) => handleCheckboxChange(e, "userActive")}
          />
          <Label className="form-check-label" for="userActive">
            User Active
          </Label>
        </div>
      </div>
    </div>
  </Col>

  {/* User Name Field */}
  <Col lg="2">
    <div className="mb-3">
      <Label for="username">User Name</Label>
      <Input
        type="text"
        id="username"
        className="form-control"
        placeholder="Enter Username"
      //  value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  </Col>

  {/* Password Field */}
  <Col lg="2">
    <div className="mb-3">
      <Label for="password">Password</Label>
      <Input
        type="password"
        id="password"
        className="form-control"
        placeholder="Enter Password"
      //  value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  </Col>
</Row>


<Row>
  {/* Phone Number */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="phoneNumber">Phone Number</Label>
      <Input
        type="text"
        id="phoneNumber"
        className="form-control"
        placeholder="Enter Phone Number"
       // value={phoneNumber}
       // onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
  </Col>

  {/* Mobile Number */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="mobileNumber">Mobile Number</Label>
      <Input
        type="text"
        id="mobileNumber"
        className="form-control"
        placeholder="Enter Mobile Number"
       // value={mobileNumber}
       // onChange={(e) => setMobileNumber(e.target.value)}
      />
    </div>
  </Col>

  {/* Email */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="email">Email</Label>
      <Input
        type="email"
        id="email"
        className="form-control"
        placeholder="Enter Email"
       // value={email}
       // onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </Col>
</Row>


<Row>
  {/* Date of Join */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="dateOfJoin">Date of Join</Label>
      <Input
        type="date"
        id="dateOfJoin"
        className="form-control"
       // value={dateOfJoin}
        //onChange={(e) => setDateOfJoin(e.target.value)}
      />
    </div>
  </Col>

  {/* Date of Birth */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="dateOfBirth">Date of Birth</Label>
      <Input
        type="date"
        id="dateOfBirth"
        className="form-control"
       // value={dateOfBirth}
      //  onChange={(e) => setDateOfBirth(e.target.value)}
      />
    </div>
  </Col>

  {/* Basic Salary */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="basicSalary">Basic Salary</Label>
      <Input
        type="number"
        id="basicSalary"
        className="form-control"
        placeholder="Enter Basic Salary"
      //  value={basicSalary}
       // onChange={(e) => setBasicSalary(e.target.value)}
      />
    </div>
  </Col>
</Row>


{/* Identity Section Heading */}
<Row>
  <Col lg="12">
  <h5 className="mb-3 fw-bold">Identity</h5>

  </Col>
</Row>

{/* Row for Iqama No, Date of Issue, and Date of Expiry */}
<Row>
  {/* Iqama No */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="iqamaNo">Iqama No</Label>
      <Input
        type="text"
        id="iqamaNo"
        className="form-control"
        placeholder="Enter Iqama No"
       // value={iqamaNo}
       // onChange={(e) => setIqamaNo(e.target.value)}
      />
    </div>
  </Col>

  {/* Date of Issue */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="dateOfIssue">Date of Issue</Label>
      <Input
        type="date"
        id="dateOfIssue"
        className="form-control"
       // value={dateOfIssue}
       // onChange={(e) => setDateOfIssue(e.target.value)}
      />
    </div>
  </Col>

  {/* Date of Expiry */}
  <Col lg="4">
    <div className="mb-3">
      <Label for="dateOfExpiry">Date of Expiry</Label>
      <Input
        type="date"
        id="dateOfExpiry"
        className="form-control"
       // value={dateOfExpiry}
       // onChange={(e) => setDateOfExpiry(e.target.value)}
      />
    </div>
  </Col>
</Row>


<Row>
  <Col lg="4">
    <div className="mb-3">
      <Label for="placeOfIssue">Place of Issue</Label>
      <Input type="text" id="placeOfIssue" className="form-control" />
    </div>
  </Col>
  <Col lg="4">
    <div className="mb-3">
      <Label for="passportNumber">Passport Number</Label>
      <Input type="text" id="passportNumber" className="form-control" />
    </div>
  </Col>
  <Col lg="4">
    <div className="mb-3">
      <Label for="nationality">Nationality</Label>
      <Select
        id="nationality"
       // options={nationalityOptions} // Pass an array of nationality options
        classNamePrefix="select2-selection"
        placeholder="Select Nationality"
        isClearable
      />
    </div>
  </Col>
</Row>
  </Form>
</TabPane>

                                                <TabPane tabId={2}>


                                                <div className="d-flex align-items-center gap-2 mb-3">
      <Input type="select" value={empFilterField} onChange={(e) => setEmpFilterField(e.target.value)} style={{ flex: 2 }}>
        <option value="Emp_Code">Employee Code</option>
        <option value="Emp_NameEn">Employee Name (EN)</option>
      </Input>

      <Input type="select" value={empFilterCondition} onChange={(e) => setEmpFilterCondition(e.target.value)} style={{ flex: 2 }}>
        <option value="contains">Contains</option>
        <option value="equals">Equals</option>
      </Input>

      <Input
        type="text"
        placeholder="Enter search value"
        value={empFilterValue}
        onChange={(e) => {
          const value = e.target.value;
          setEmpFilterValue(value);
          if (value.length >= 3) {
            fetchCardEmployeeDtls(1, empFilterField, empFilterCondition, value);
          }
        }}
        style={{ flex: 3 }}
      />
    </div>

    {empLoading ? <p>Loading...</p> : (
      <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Code</th>
              <th>Employee Main Code </th>
              <th>Employee Name En </th>
              <th>Employee Name Ar </th>
              <th>Designation Name En </th>
              <th>Designation Name Ar </th>
              <th>Employee  Active  </th>
              <th>Employee Is Active User  </th>
            </tr>
          </thead>
          <tbody>
            {empData.length > 0 ? (
              empData.map((item, index) => (
                <tr key={item.id} onClick={() => handleRowEmpClick(item)} style={{ cursor: "pointer" }}>
                <td>{(empPage - 1) * 10 + index + 1}</td>
                <td>{item.code}</td>
                <td>{item.mainCode}</td>
                <td>{item.nameEn}</td>
                <td>{item.nameAr}</td>
                <td>{item.designationEn}</td>
                <td>{item.designationAr}</td>
                <td>{item.isActive ? "Yes" : "No"}</td>
                <td>{item.isActiveUser ? "Yes" : "No"}</td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No data found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )}


<div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, empTotalCount)} of {empTotalCount}
          </div>
          <Pagination
            className="pagination-data"
            current={page}
            total={empTotalCount}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={handleCustomerPageChange}
            showTitle={false}
          />
        </div>
 
                                             

    
      
           

   

    
 
</TabPane>




                                            </TabContent>
                                        </div>
                                        <div className="actions clearfix">
                                            <ul>
                                                <li
                                                    className={
                                                        activeTab === 1 ? "previous disabled" : "previous"
                                                    }
                                                >
                                                    <Link
                                                        to="#"
                                                        onClick={() => {
                                                            toggleTab(activeTab - 1)
                                                        }}
                                                    >
                                                        Previous
                                                    </Link>
                                                </li>
                                                <li
                                                    className={activeTab ===2  ? "next disabled" : "next"}
                                                >
                                                    <Link
                                                        to="#"
                                                        onClick={() => {
                                                            toggleTab(activeTab + 1)
                                                        }}
                                                    >
                                                        Next
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="12">

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Employee
