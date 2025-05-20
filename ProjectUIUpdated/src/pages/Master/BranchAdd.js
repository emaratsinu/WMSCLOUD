import React, { useState, useMemo, useEffect } from "react"
import Select from "react-select";
import TableContainer from "../../components/Common/TableContainer";
import {
  fetchBranchArea,
  fetchBranches,
  fetchBranchRecords,
  fetchBranchType,
  fetchNextBranchNumber,
  saveBranchRecord
} from "../../components/Api/BranchApiService";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap"

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Swal from "sweetalert2";
import { Eye, SquarePen } from "lucide-react";
import { ClipLoader } from "react-spinners";

const BranchAdd = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewLoadingRow, setViewLoadingRow] = useState(null);
  const [EditLoadingRow, setEditLoadingRow] = useState(null);
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
      {
        header: "View", // Eye icon column
        accessorKey: "view",
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
              onViewClick(row.original, "View");
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            disabled={viewLoadingRow === row.original.id} // Disable if loading
          >
            {viewLoadingRow === row.original.id ? (
              <ClipLoader size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </button>
        ),
      },
      {
        header: "Edit", // Eye icon column
        accessorKey: "edit",
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
              onViewClick(row.original, "Edit");
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            disabled={EditLoadingRow === row.original.id} // Disable if loading
          >
            {EditLoadingRow === row.original.id ? (
              <ClipLoader size={20} color="black" />
            ) : (
              <SquarePen size={20} color="black" />
            )}
          </button>
        ),
      },
    ],
    [viewLoadingRow, EditLoadingRow]
  );


  //meta title

  const [ItemVendor, setItemVendor] = useState([]);
  const [selectedVendors, setselectedVendors] = useState(null);

  //state to save the selected area and area list
  const [areaList, setAreaList] = useState([]);
  const [selectedArea, setselectedArea] = useState(null);
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])

  //state to save the checked state to store options value
  const [checkedOptionsState, setCheckedOptionsState] = useState({
    activeCheckbox: false,
    currentBranchCheckbox: false,
    mainStoreCheckbox: false,
  });

  const [checkedTransactionsState, setCheckedTransactionsState] = useState({
    purchase: false,
    purchaseRet: false,
    transferOut: false,
    transferIn: false,
    sales: false,
    needSnxSupport: false,
    TransferBasedOnShEx: false
  });

  const [codeValue, setCodeValue] = useState();
  const [brIdValue, setBrIdValue] = useState(0);
  const [checkedControlsState, setCheckedControlsState] = useState({
    allowWhSale: false,
    allowBulkSale: false,
    allowCredit: false,
    allowCashCr: false,
    transferShortItemOnly: false,
  });

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [address, setAddress] = useState("");
  const [oldCodeValue, setOldCodeValue] = useState("")
  const [isViewButtonClicked, setIsViewButtonClicked] = useState(false)
  const [areaId, setAreaId] = useState()
  const [typeId, setTypeId] = useState()
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBranch();
    fetchAreaValues();
    fetchTypeValues();
    fetchNextCode()
  }, []);

  const fetchNextCode = async () => {
    try {
      const data = await fetchNextBranchNumber();
      setCodeValue(data.nextNumber)
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };

  const fetchBranch = async () => {
    try {
      setLoading(true);

      const response = await fetchBranches();

      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          id: item.br_Id,
          code: item.br_Code,
          nameEn: item.br_NameEn,
          nameAr: item.br_NameAr,
        }));
        setData(transformedData);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching branch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEngNameChange = (e) => {
    setNameEn(e.target.value);
  };
  const handleArNameChange = (e) => {
    setNameAr(e.target.value);
  };
  const handleOldCodeChange = (e) => {
    setOldCodeValue(e.target.value);
  };
  //fetch area values from BranchAPIService
  const fetchAreaValues = async () => {
    try {
      const data = await fetchBranchArea();
      setAreaList(data)
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };

  //fetch type values from BranchAPIService
  const fetchTypeValues = async () => {
    try {
      const data = await fetchBranchType();
      setItemVendor(data)
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };

  //checkbox event handler for Options checkbox
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedOptionsState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  //checkbox event handler for transactions checkbox
  const handleTransactionsCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedTransactionsState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const controls = [
    { id: "allowWhSale", label: "Allow Wh Sale" },
    { id: "allowBulkSale", label: "Allow Bulk Sale" },
    { id: "allowCredit", label: "Allow Credit" },
    { id: "allowCashCr", label: "Allow Cash Cr" },
    { id: "transferShortItemOnly", label: "Transfer Short Item Only" },
  ];

  const handleControlsCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedControlsState((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleSave = async () => {
    if (!nameEn || !nameAr) {
      Swal.fire("Error", "Both Name(En) and Name(Ar) are required.", "error");
      return;
    } else if (selectedVendors === null) {
      Swal.fire("Error", "Type needs to be selected.", "error");
      return;
    } else if (selectedArea === null) {
      Swal.fire("Error", "Area needs to be selected.", "error");
      return;
    }
    setSaving(true)
    try {
      const payload = {
        br_Id: brIdValue,
        br_Code: codeValue,
        br_NameEn: nameEn,
        br_NameAr: nameAr,
        br_Address: address,
        br_IsActive: checkedOptionsState.activeCheckbox,
        br_IsCurrBranch: checkedOptionsState.currentBranchCheckbox,
        br_AllowWhSales: checkedControlsState.allowWhSale,
        br_AllowBulkSales: checkedControlsState.allowBulkSale,
        br_AllowCr: checkedControlsState.allowCredit,
        br_AllowCCr: checkedControlsState.allowCashCr,
        br_AllowPurchase: checkedTransactionsState.purchase,
        br_AllowPurchaseRet: checkedTransactionsState.purchaseRet,
        br_AllowTrOut: checkedTransactionsState.transferOut,
        br_AllowTrIn: checkedTransactionsState.transferIn,
        br_AllowSales: checkedTransactionsState.sales,
        br_TransferBasedOnShEx: checkedTransactionsState.TransferBasedOnShEx,
        br_NeedShExReport: checkedTransactionsState.needSnxSupport,
        br_TypeId: selectedVendors === null ? "" : selectedVendors.value,
        br_AreaId: selectedArea === null ? "" : selectedArea.value,
        br_ClosedOn: new Date().toISOString(),
        br_CreatedBy: 1,
        br_CreatedOn: new Date().toISOString(),
        oldCode: oldCodeValue,
      };

      const response = await saveBranchRecord(payload);
      if (response && response.data.success) {
        Swal.fire("Saved", " Branch type  saved successfully!", "success");
        fetchNextCode();
        clearAllFields();
      } else {
        Swal.fire("Error", response.statusMessage || "Failed to save  Branch type.", "error");
      }
    } catch (error) {
      console.error("Error saving Branch Type:", error);
      Swal.fire("Error", "An unexpected error occurred.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const clearAllFields = () => {
    setselectedVendors(null)
    setselectedArea(null)
    setCheckedOptionsState({
      activeCheckbox: false,
      currentBranchCheckbox: false,
      mainStoreCheckbox: false,
    });

    setCheckedTransactionsState({
      purchase: false,
      purchaseRet: false,
      transferOut: false,
      transferIn: false,
      sales: false,
      needSnxSupport: false,
      TransferBasedOnShEx: false
    });
    setCheckedControlsState({
      allowWhSale: false,
      allowBulkSale: false,
      allowCredit: false,
      allowCashCr: false,
      transferShortItemOnly: false,
    });
    setNameEn("")
    setNameAr("")
    setOldCodeValue("")
    setAddress("")
    setTypeId()
    setAreaId()
    setIsViewButtonClicked(false)
  }

  //used this api to view the record corresponding to the row
  const onViewClick = async (rowData, buttonName) => {
    if (buttonName === "View") {
      setIsViewButtonClicked(true)
      setViewLoadingRow(rowData.id); // Show loader for the specific row
    } else if (buttonName === "Edit") {
      setIsViewButtonClicked(false)
      setEditLoadingRow(rowData.id); // Show loader for the specific row
    }


    try {
      const responseData = await fetchBranchRecords(rowData.id);
      setAddress(responseData.br_Address)
      setCodeValue(responseData.br_Code)
      setNameEn(responseData.br_NameEn)
      setNameAr(responseData.br_NameAr)
      setAreaId(responseData.br_AreaId)
      setTypeId(responseData.br_TypeId)
      setOldCodeValue(responseData.oldCode)
      setCheckedTransactionsState({
        purchase: responseData.br_AllowPurchase,
        purchaseRet: responseData.br_AllowPurchaseRet,
        transferOut: responseData.br_AllowTrOut,
        transferIn: responseData.br_AllowTrIn,
        sales: responseData.br_AllowSales,
        needSnxSupport: responseData.br_NeedShExReport,
        TransferBasedOnShEx: responseData.br_TransferBasedOnShEx
      });
      setCheckedOptionsState({
        activeCheckbox: responseData.br_IsActive,
        currentBranchCheckbox: responseData.br_IsCurrBranch,
        mainStoreCheckbox: false,
      });
      setCheckedControlsState({
        allowWhSale: responseData.br_AllowWhSales,
        allowBulkSale: responseData.br_AllowBulkSales,
        allowCredit: responseData.br_AllowCr,
        allowCashCr: responseData.br_AllowCCr,
        transferShortItemOnly: false,
      });
      setBrIdValue(responseData.br_Id)
      setCodeValue(responseData.br_Code)
      setactiveTab(1)
    } catch (error) {
      console.error("Error fetching invoice serial details:", error);
    } finally {
      setViewLoadingRow(null); // Hide loader after processing
      setEditLoadingRow(null); // Hide loader after processing
    }
  };

  useEffect(() => {
    const selectedVendor = ItemVendor.find(vendor => vendor.id === typeId);

    if (selectedVendor) {
      setselectedVendors({
        value: selectedVendor.id,
        label: `${selectedVendor.code} ~ ${selectedVendor.name_En} ~ ${selectedVendor.name_Ar}`
      });
    }

    const selectedArea = areaList.find(area => area.area_Id === areaId);
    if (selectedArea) {
      setselectedArea({
        value: selectedArea.area_Id,
        label: `${selectedArea.area_Code} ~ ${selectedArea.area_NameEn} ~ ${selectedArea.area_NameAr}`
      });
    }
  }, [areaId, typeId])


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Branch Add </h4>
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
                            <span className="number">1.</span> Branch Add
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                              fetchBranch();
                            }}
                          // disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Branch List
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
                          <Form>
                            <Row>
                              {/* Code Field */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="basicpill-itemcode-input1">Code</Label>
                                  <Input type="text" className="form-control noneditinp" id="basicpill-itemcode-input1" readOnly value={codeValue} />
                                </div>
                              </Col>

                              {/* English Name */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="NameEn">English Name</Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="NameEn"
                                    placeholder="Enter Branch Name (En)"
                                    value={nameEn}
                                    onChange={handleEngNameChange}
                                  />
                                </div>
                              </Col>

                              {/* Arabic Name */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="NameAr">Arabic Name</Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="NameAr"
                                    placeholder="Enter Branch Name (Ar)"
                                    value={nameAr}
                                    onChange={handleArNameChange}
                                  />
                                </div>
                              </Col>

                              {/* Vendor Type Selection */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="vendorSelect">Type</Label>
                                  <Select
                                    options={ItemVendor.map((vendor) => ({
                                      value: vendor.id,
                                      label: `${vendor.code} ~ ${vendor.name_En} ~ ${vendor.name_Ar}`,
                                    }))}
                                    value={selectedVendors}
                                    placeholder="Select Type"
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    onChange={(selected) => setselectedVendors(selected)}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="align-items-stretch mb-4"> {/* Added mb-4 for spacing */}
                              {/* Address Field */}
                              <Col lg="4" className="d-flex">
                                <div className="mb-3 flex-grow-1">
                                  <Label for="basicpill-address-input1">Address</Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control w-100"
                                    rows="2"
                                    placeholder="Enter Your Address"
                                    style={{ height: "50px" }} // Set height to match other fields
                                    value={address}
                                    onChange={handleAddressChange}
                                  />
                                </div>
                              </Col>

                              {/* Area Selection */}
                              <Col lg="4" className="d-flex">
                                <div className="mb-3 flex-grow-1">
                                  <Label for="areaSelect">Area</Label>
                                  <Select
                                    options={areaList.map((area) => ({
                                      value: area.area_Id,
                                      label: `${area.area_Code} ~ ${area.area_NameEn} ~ ${area.area_NameAr}`,
                                    }))}
                                    value={selectedArea}
                                    placeholder="Select Area"
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    onChange={(selected) => setselectedArea(selected)}
                                    styles={{ control: (base) => ({ ...base, height: "50px" }) }} // Match height
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="mb-3">
                                  <Label for="NameAr">Old Code</Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="NameAr"
                                    placeholder="Enter Old Code"
                                    value={oldCodeValue}
                                    onChange={handleOldCodeChange}
                                  />
                                </div>
                              </Col>

                              {/* Options Checkboxes */}
                              <Col lg="12">
                                <h5 className="mb-3">Options</h5>
                              </Col>
                              <Col lg="12">
                                <Row>
                                  {[
                                    { id: "activeCheckbox", label: "Active" },
                                    { id: "currentBranchCheckbox", label: "Is Current Branch" },
                                    { id: "mainStoreCheckbox", label: "Is Main Store" },
                                  ].map((option) => (
                                    <Col lg="3" md="4" sm="6" xs="12" key={option.id} className="mb-2">
                                      <div className="form-check d-flex align-items-center">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={option.id}
                                          checked={checkedOptionsState[option.id]}
                                          onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={option.id}>
                                          {option.label}
                                        </label>
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              </Col>


                            </Row>

                            {/* Allowed Transactions Section */}
                            <Row className="mt-4">
                              <Col lg="12">
                                <h5 className="mb-3">Allowed Transactions</h5>
                              </Col>
                              <Col lg="12">
                                <Row>
                                  {[
                                    { id: "purchase", label: "Purchase" },
                                    { id: "purchaseRet", label: "Purchase Ret" },
                                    { id: "transferOut", label: "Transfer Out" },
                                    { id: "transferIn", label: "Transfer In" },
                                    { id: "sales", label: "Sales" },
                                    { id: "TransferBasedOnShEx", label: "Transfer Based On Sh Ex" },
                                    { id: "needSnxSupport", label: "Need Shx Report" },
                                  ].map((option) => (
                                    <Col lg="3" md="4" sm="6" xs="12" key={option.id} className="mb-2">
                                      <div className="form-check d-flex align-items-center">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={option.id}
                                          checked={checkedTransactionsState[option.id]}
                                          onChange={handleTransactionsCheckboxChange}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={option.id}>
                                          {option.label}
                                        </label>
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            </Row>


                            {/* Control Section */}
                            <Row className="mt-4">
                              <Col lg="12">
                                <h5 className="mb-3">Control</h5>
                              </Col>
                              <Col lg="12">
                                <Row>
                                  {controls.map((option) => (
                                    <Col lg="3" md="4" sm="6" xs="12" key={option.id} className="mb-2">
                                      <div className="form-check d-flex align-items-center">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={option.id}
                                          checked={checkedControlsState[option.id]}
                                          onChange={handleControlsCheckboxChange}
                                        />
                                        <label className="form-check-label ms-2" htmlFor={option.id}>
                                          {option.label}
                                        </label>
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            </Row>


                          </Form>
                        </TabPane>

                        <TabPane tabId={2}>
                          <div className="page-content">
                            <div className="container-fluid">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Department</h4>

                              </div>



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
                              // handleRowClick={handleRowAction} // Pass custom row click handler
                              />

                            </div>
                          </div>
                        </TabPane>

                      </TabContent>
                    </div>
                    <div className="actions clearfix" style={{ display: "flex", justifyContent: "flex-end" }}>
                      <ul style={{ display: "flex", gap: "10px", listStyle: "none", padding: 0 }}>
                        {activeTab === 1 && (
                          <>
                            <li className="previous">
                              <Link
                                to="#"
                                onClick={() => {
                                  fetchNextCode();
                                  clearAllFields();
                                }}
                              >
                                Clear
                              </Link>
                            </li>
                            <li
                              className={isViewButtonClicked ? "previous disabled" : "previous"}
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  handleSave();
                                }}
                              >
                                {saving ? <ClipLoader size={20} color="black" /> : "Save"}
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  )
}

export default BranchAdd
