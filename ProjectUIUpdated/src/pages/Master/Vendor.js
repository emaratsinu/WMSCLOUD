import React, { useState, useMemo, useEffect } from "react"
import Select from "react-select"
import TableContainer1 from "../../components/Common/TableContainer1"
import { useSearchParams } from "react-router-dom"
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

import Swal from "sweetalert2"
import { SquarePen } from "lucide-react"
import { ClipLoader } from "react-spinners"
import {
  fetchNextVendorNumber,
  fetchVendorLocationFromVendorPage,
  fetchVendorRecordsById,
  fetchVendors,
  saveVendorRecord,
} from "../../components/Api/VendorApiService"

const Vendor = ({}) => {
  const [searchParams] = useSearchParams()
  const clickedVendorType = searchParams.get("clickedVendorType") || "0"
  if (clickedVendorType !== "1" && clickedVendorType !== "2") {
    Swal.fire("Error", "Invalid vendor type!", "error")
    return null // Stop rendering the component
  }

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [EditLoadingRow, setEditLoadingRow] = useState(null)
  const columns = useMemo(
    () => [
      {
        header: "Code",
        accessorKey: "code",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Short Name",
        accessorKey: "shortName",
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
        header: "Address",
        accessorKey: "address",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNo",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Reg Date",
        accessorKey: "regDate",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Edit", // Eye icon column
        accessorKey: "edit",
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => (
          <button
            onClick={e => {
              e.stopPropagation() // Prevent row click event
              onViewClick(row.original)
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
    [EditLoadingRow]
  )

  //newly added states
  const [activeTab, setactiveTab] = useState(1)
  const [codeValue, setCodeValue] = useState()
  const [vendorIdValue, setVendorIdValue] = useState(0)
  const [nameEn, setNameEn] = useState("")
  const [nameAr, setNameAr] = useState("")
  const [address, setAddress] = useState("")
  const [saving, setSaving] = useState(false)
  const [shortName, setShortName] = useState("")
  const [notes, setNotes] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [websiteName, setWebsiteName] = useState("")
  const [faxName, setFaxName] = useState("")
  const [email, setEmail] = useState("")
  const [regDateFromForm, setRegDateFromForm] = useState("")
  const [fileLocData, setFileLocData] = useState([])
  const [selectedFileLoc, setselectedFileLoc] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [category, setCategory] = useState("")
  const [vendorType] = useState(clickedVendorType)

  useEffect(() => {
    console.log("Vendor Type Changed:", clickedVendorType)
    fetchBranch()
    fetchFileLoc()
    fetchNextCode()
  }, [clickedVendorType])
  const fetchNextCode = async () => {
    try {
      const data = await fetchNextVendorNumber(clickedVendorType)
      setCodeValue(data.nextNumber)
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error")
    }
  }

  const fetchBranch = async () => {
    try {
      setLoading(true)

      const response = await fetchVendors()

      if (response && Array.isArray(response)) {
        const transformedData = response.map(item => ({
          id: item.vendor_Id,
          code: item.vendor_Code,
          shortName: item.vendor_ShortName,
          nameEn: item.vendor_NameEn,
          nameAr: item.vendor_NameAr,
          address: item.vendor_Address,
          phoneNo: item.vendor_Phone,
          regDate: item.vendor_RegDate,
        }))
        setData(transformedData)
      } else {
        console.error("No data received from API")
      }
    } catch (error) {
      console.error("Error fetching branch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEngNameChange = e => {
    setNameEn(e.target.value)
  }
  const handleArNameChange = e => {
    setNameAr(e.target.value)
  }
  const handleShortNameChange = e => {
    setShortName(e.target.value)
  }
  const handlePhoneNumberChange = e => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value)
    }
  }
  const handleWebsiteName = e => {
    setWebsiteName(e.target.value)
  }
  const handleFaxNameChange = e => {
    setFaxName(e.target.value)
  }
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSave = async () => {
    if (!nameEn || !nameAr) {
      Swal.fire("Error", "Both Name(En) and Name(Ar) are required.", "error")
      return
    } else if (!shortName) {
      Swal.fire("Error", "Short name is required.", "error")
      return
    } else if (!category) {
      Swal.fire("Error", "Category needs to be selected.", "error")
      return
    } else if (selectedFileLoc === null) {
      Swal.fire("Error", "File loc needs to be selected.", "error")
      return
    } else if (!regDateFromForm) {
      Swal.fire("Error", "Date needs to be selected.", "error")
      return
    }
    setSaving(true)
    try {
      const payload = {
        vendor_Id: vendorIdValue,
        vendor_Type: vendorType,
        vendor_Code: codeValue,
        vendor_ShortName: shortName,
        vendor_NameEn: nameEn,
        vendor_NameAr: nameAr,
        vendor_Category: category,
        vendor_RegDate: regDateFromForm,
        vendor_Address: address,
        vendor_Phone: phoneNumber,
        vendor_Fax: faxName === null ? "" : faxName,
        vendor_Web: websiteName === null ? "" : websiteName,
        vendor_Email: email === null ? "" : email,
        vendor_IsActive: isActive,
        vendor_LocId: selectedFileLoc === null ? 0 : selectedFileLoc.value,
        vendor_GroupId: vendorType,
        vendor_PartOriginId: 15,
        vendor_CreatedBy: 1,
        vendor_UpdatedBy: 1,
        vendor_Notes: notes,
      }

      const response = await saveVendorRecord(payload)
      if (response && response.data.success) {
        Swal.fire("Saved", " Vendor details saved successfully!", "success")
        fetchNextCode()
        clearAllFields()
      } else {
        Swal.fire(
          "Error",
          response.statusMessage || "Failed to save Vendor details.",
          "error"
        )
      }
    } catch (error) {
      console.error("Error saving Vendor Details:", error)
      Swal.fire("Error", "An unexpected error occurred.", "error")
    } finally {
      setSaving(false)
    }
  }

  const handleAddressChange = event => {
    setAddress(event.target.value)
  }
  const handleNotesChange = event => {
    setNotes(event.target.value)
  }

  const clearAllFields = () => {
    setEditLoadingRow(null)
    setVendorIdValue(0)
    setNameEn("")
    setNameAr("")
    setAddress("")
    setShortName("")
    setNotes("")
    setPhoneNumber("")
    setWebsiteName("")
    setFaxName("")
    setEmail("")
    setRegDateFromForm("")
    setIsActive(false)
    setselectedFileLoc(null)
    setCategory("")
  }

  //used this api to view the record corresponding to the row
  const onViewClick = async rowData => {
    setEditLoadingRow(rowData.id) // Show loader for the specific row
    try {
      const responseData = await fetchVendorRecordsById(rowData.id)

      console.log("response data", responseData)
      setAddress(responseData.vendor_Address)
      setCodeValue(responseData.vendor_Code)
      setEmail(responseData.vendor_Email)
      setFaxName(responseData.vendor_Fax)
      setIsActive(responseData.vendor_IsActive)
      setNameEn(responseData.vendor_NameEn)
      setNameAr(responseData.vendor_NameAr)
      setNotes(responseData.vendor_Notes)
      setPhoneNumber(responseData.vendor_Phone)
      setShortName(responseData.vendor_ShortName)
      setVendorIdValue(responseData.vendor_Id)
      const dateFromApi = responseData.vendor_RegDate
      const formattedDate = dateFromApi.split("T")[0]
      setRegDateFromForm(formattedDate)
      setCategory(responseData.vendor_Category)
      setselectedFileLoc(responseData.vendor_LocId)
      setWebsiteName(responseData.vendor_Web)
      setactiveTab(1)
    } catch (error) {
      console.error("Error fetching invoice serial details:", error)
    } finally {
      setEditLoadingRow(null) // Hide loader after processing
    }
  }

  useEffect(() => {
    const selectedFileLocId = fileLocData.find(
      file => file.id === selectedFileLoc
    )

    if (selectedFileLocId) {
      setselectedFileLoc({
        value: selectedFileLocId.id,
        label: `${selectedFileLocId.code}`,
      })
    }
    console.log("fax name", faxName)
  }, [selectedFileLoc])

  //api call to fetch file location
  const fetchFileLoc = async () => {
    setLoading(true)
    try {
      const response = await fetchVendorLocationFromVendorPage(null, null)
      if (response && Array.isArray(response)) {
        const transformedData = response.map(item => ({
          id: item.vendorLoc_Id,
          code: item.vendorLoc_Code,
        }))
        setFileLocData(transformedData)
      } else {
        console.error("No data received from API")
      }
    } catch (error) {
      console.error("Error fetching Currency data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckboxChange = () => {
    setIsActive(prevState => !prevState)
  }

  const handleCategoryChange = event => {
    setCategory(event.target.value)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Vendor Add </h4>
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
                          >
                            <span className="number">1.</span> Vendor Add
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                              fetchBranch()
                            }}
                            // disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Vendor List
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
                                  <Label for="basicpill-itemcode-input1">
                                    Code
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control noneditinp"
                                    id="basicpill-itemcode-input1"
                                    readOnly
                                    value={codeValue}
                                  />
                                </div>
                              </Col>

                              {/* Short Name */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="shortName">Short Name</Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="NameEn"
                                    placeholder="Enter Short Name"
                                    value={shortName}
                                    onChange={handleShortNameChange}
                                  />
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
                                    placeholder="Enter Vendor Name (En)"
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
                                    placeholder="Enter Vendor Name (Ar)"
                                    value={nameAr}
                                    onChange={handleArNameChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="align-items-stretch mb-4">
                              {" "}
                              {/* Added mb-4 for spacing */}
                              {/* Address Field */}
                              <Col lg="4" className="d-flex">
                                <div className="mb-3 flex-grow-1">
                                  <Label for="basicpill-address-input1">
                                    Address
                                  </Label>
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
                              {/* Notes Field */}
                              <Col lg="4" className="d-flex">
                                <div className="mb-3 flex-grow-1">
                                  <Label for="basicpill-notes-input1">
                                    Notes
                                  </Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control w-100"
                                    rows="2"
                                    placeholder="Enter Notes"
                                    style={{ height: "50px" }} // Set height to match other fields
                                    value={notes}
                                    onChange={handleNotesChange}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="4" className="d-flex">
                                <div className="mb-3 flex-grow-1 d-flex align-items-center">
                                  <Label
                                    htmlFor="activeCheckbox"
                                    className="me-2 mb-0"
                                  >
                                    Active
                                  </Label>
                                  <input
                                    type="checkbox"
                                    id="activeCheckbox"
                                    className="form-check-input mt-0"
                                    checked={isActive}
                                    onChange={handleCheckboxChange}
                                  />
                                </div>
                              </Col>
                              <Col lg="4" className="d-flex">
                                <div className="mb-3 flex-grow-1">
                                  <Label className="mb-1">Category</Label>
                                  <div className="d-flex align-items-center">
                                    <div className="form-check d-flex align-items-center me-3">
                                      <input
                                        type="radio"
                                        id="domestic"
                                        name="category"
                                        value="D"
                                        className="form-check-input mt-0"
                                        checked={category === "D"}
                                        onChange={handleCategoryChange}
                                      />
                                      <label
                                        htmlFor="domestic"
                                        className="form-check-label ms-2 mb-0"
                                        style={{ fontSize: "14px" }}
                                      >
                                        Domestic
                                      </label>
                                    </div>
                                    <div className="form-check d-flex align-items-center">
                                      <input
                                        type="radio"
                                        id="international"
                                        name="category"
                                        value="I"
                                        className="form-check-input mt-0"
                                        checked={category === "I"}
                                        onChange={handleCategoryChange}
                                      />
                                      <label
                                        htmlFor="international"
                                        className="form-check-label ms-2 mb-0"
                                        style={{ fontSize: "14px" }}
                                      >
                                        International
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <h4 className="mb-3">Details</h4>
                            <Row>
                              {/* Phone Number */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="PhoneNo">Phone No</Label>
                                  <Input
                                    type="text" // Change to "text" to prevent number restrictions
                                    className="form-control"
                                    id="PhoneNo"
                                    placeholder="Enter Phone Number"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                  />
                                </div>
                              </Col>

                              {/* Website Name */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="website">Website</Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="website"
                                    placeholder="Enter Website"
                                    value={websiteName}
                                    onChange={handleWebsiteName}
                                  />
                                </div>
                              </Col>

                              {/* Fax Name */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="NameEn">Fax</Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="fax"
                                    placeholder="Enter Fax"
                                    value={faxName}
                                    onChange={handleFaxNameChange}
                                  />
                                </div>
                              </Col>

                              {/* Email Name */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="email">Email</Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                  />
                                </div>
                              </Col>

                              {/* File loc Selection */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="fileLocSelect">File Loc</Label>
                                  <Select
                                    options={fileLocData.map(vendor => ({
                                      value: vendor.id,
                                      label: `${vendor.code}`,
                                    }))}
                                    value={selectedFileLoc}
                                    placeholder="Select File Loc"
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    onChange={selected =>
                                      setselectedFileLoc(selected)
                                    }
                                  />
                                </div>
                              </Col>

                              {/* Reg Date */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="regDate">Reg Date</Label>
                                  <Input
                                    type="date"
                                    id="regDate"
                                    className="form-control"
                                    value={regDateFromForm}
                                    onChange={e =>
                                      setRegDateFromForm(e.target.value)
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </TabPane>

                        <TabPane tabId={2}>
                          <div className="page-content">
                            <div className="container-fluid">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Vendors</h4>
                              </div>

                              <TableContainer1
                                columns={columns}
                                data={data || []}
                                isGlobalFilter={true}
                                isPagination={true}
                                SearchPlaceholder="Search for Vendors..."
                                pagination="pagination"
                                paginationWrapper="dataTables_paginate paging_simple_numbers"
                                tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                                loading={loading}
                              />
                            </div>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div
                      className="actions clearfix"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <ul
                        style={{
                          display: "flex",
                          gap: "10px",
                          listStyle: "none",
                          padding: 0,
                        }}
                      >
                        {activeTab === 1 && (
                          <>
                            <li className="previous">
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  className="btn btn-primary"
                                  onClick={() => {
                                    fetchNextCode()
                                    clearAllFields()
                                  }}
                                  style={{
                                    margin: 0,
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    backgroundColor: "#6366F1", // Match button color
                                    color: "white",
                                    border: "none",
                                    textAlign: "center",
                                  }}
                                >
                                  Clear
                                </p>

                                <p
                                  className="btn btn-primary"
                                  onClick={() => {
                                    handleSave()
                                  }}
                                  style={{
                                    margin: 0,
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                    backgroundColor: "#6366F1", // Match button color
                                    color: "white",
                                    border: "none",
                                    textAlign: "center",
                                  }}
                                >
                                  {saving ? (
                                    <ClipLoader size={20} color="white" />
                                  ) : (
                                    "Save"
                                  )}
                                </p>
                              </div>
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
    </React.Fragment>
  )
}

export default Vendor
