import React, { useState, useMemo, useEffect, useCallback } from "react"
import Select from "react-select"
import TableContainer1 from "../../components/Common/TableContainer1"
import "bootstrap/dist/css/bootstrap.min.css"
import "../Master/ownstyle.css"
import Swal from "sweetalert2"
import { ClipLoader } from "react-spinners" // Importing the spinner
//import { Modal } from "react-bootstrap"
import { Eye } from "lucide-react" // Importing Lucide eye icon

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  PaginationItem,
  PaginationLink,
  InputGroup,
  InputGroupText,
} from "reactstrap"

import { FaSearch } from "react-icons/fa"
import Pagination from "rc-pagination"
import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const PurchaseBranch = () => {
  const [invoiceItems, setInvoiceItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const [InvoiceModalOpen, setInvoiceModalOpen] = useState(false)
  const [InvoiceFilterValue, setInvoiceFilterValue] = useState("")
  const [pageNumber, setPageNumber] = useState(1) // Curr
  const [page, setPage] = useState(1)
  const [InvoiceLoading, setInvoiceLoading] = useState(false)
  const [InvoiceData, setInvoiceData] = useState([])
  const [InvoicePage, setInvoicePage] = useState(1)
  const [InvoiceTotalCount, setInvoiceTotalCount] = useState(0)
  const pageSize = 10 // Fi

  const [JobOrderModalOpen, setJobOrderModalOpen] = useState(false)
  const [JobOrderFilterValue, setJobOrderFilterValue] = useState("")
  const [JobOrderLoading, setJobOrderLoading] = useState(false)
  const [JobOrderData, setJobOrderData] = useState([])
  const [JobOrderPage, setJobOrderPage] = useState(1)
  const [JobOrderTotalCount, setJobOrderTotalCount] = useState(0)

  const [PurchaserModalOpen, setPurchaserModalOpen] = useState(false)
  const [PurchaserFilterValue, setPurchaserFilterValue] = useState("")
  const [PurchaserLoading, setPurchaserLoading] = useState(false)
  const [PurchaserData, setPurchaserData] = useState([])
  const [PurchaserPage, setPurchaserPage] = useState(1)
  const [PurchaserTotalCount, setPurchaserTotalCount] = useState(0)

  const [VendorModalOpen, setVendorModalOpen] = useState(false)
  const [VendorFilterValue, setVendorFilterValue] = useState("")
  const [VendorLoading, setVendorLoading] = useState(false)
  const [VendorData, setVendorData] = useState([])
  const [VendorPage, setVendorPage] = useState(1)
  const [VendorTotalCount, setVendorTotalCount] = useState(0)

  const [ReceiverModalOpen, setReceiverModalOpen] = useState(false)
  const [ReceiverFilterValue, setReceiverFilterValue] = useState("")
  const [ReceiverLoading, setReceiverLoading] = useState(false)
  const [ReceiverData, setReceiverData] = useState([])
  const [ReceiverPage, setReceiverPage] = useState(1)
  const [ReceiverTotalCount, setReceiverTotalCount] = useState(0)

  const [inputValues, setInputValues] = useState({
    code: "",
    namecode: "",
    Vat_id: "",
    Vat_Code: "",
    Vat_NameEn: "",
    Vat_NameAr: "",
    Vat_Per: "",
    cardcode: "",
    cardno: "",
  })

  const handleInvoiceOpenModal = () => {
    setInvoiceModalOpen(true)

    // ✅ Reset filters

    setInvoiceFilterValue("")

    setPageNumber(1)
    setPage(1) //

    // fetchCardDtls(1, 3, null, null, 1) // Fetch fresh data
  }

  const handleJobOrderOpenModal = () => {
    setJobOrderModalOpen(true)

    // ✅ Reset filters

    setJobOrderFilterValue("")

    setPageNumber(1)
    setPage(1) //

    // fetchCardDtls(1, 3, null, null, 1) // Fetch fresh data
  }

  const handlePurchaserOpenModal = () => {
    setPurchaserModalOpen(true)

    // ✅ Reset filters

    setPurchaserFilterValue("")

    setPageNumber(1)
    setPage(1) //

    // fetchCardDtls(1, 3, null, null, 1) // Fetch fresh data
  }

  const handleVendorOpenModal = () => {
    setVendorModalOpen(true)

    // ✅ Reset filters

    setVendorFilterValue("")

    setPageNumber(1)
    setPage(1) //

    // fetchCardDtls(1, 3, null, null, 1) // Fetch fresh data
  }

  const handleReceiverOpenModal = () => {
    setVendorModalOpen(true)

    // ✅ Reset filters

    setVendorFilterValue("")

    setPageNumber(1)
    setPage(1) //

    // fetchCardDtls(1, 3, null, null, 1) // Fetch fresh data
  }

  const handleBaraOpenModal = () => {
    setVendorModalOpen(true)

    // ✅ Reset filters

    setVendorFilterValue("")

    setPageNumber(1)
    setPage(1) //

    // fetchCardDtls(1, 3, null, null, 1) // Fetch fresh data
  }

  const handleInputChange = e => {
    const { id, value } = e.target // Get the input field ID and value
    setInputValues(prevValues => ({
      ...prevValues,
      [id]: value, // Use the input's ID to dynamically update the corresponding state field
    }))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4"> Purchase Branch </h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix"></div>
                    <div className="content clearfix">
                      <Form>
                        <Row>
                          {/* Code Field */}

                          <Col lg="3">
                            <FormGroup>
                              <Label for="invoiceNo">Invoice No</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="invoiceNo"
                                  value={inputValues.code}
                                  onChange={handleInputChange}
                                />
                                <Button
                                  color="primary"
                                  onClick={handleInvoiceOpenModal}
                                >
                                  <FaSearch />
                                </Button>
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col lg="3">
                            <FormGroup>
                              <Label for="invoiceNo">Job Order No</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="jobNo"
                                  value={inputValues.code}
                                  onChange={handleInputChange}
                                />
                                <Button
                                  color="primary"
                                  onClick={handleJobOrderOpenModal}
                                >
                                  <FaSearch />
                                </Button>
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col lg="3">
                            <FormGroup>
                              <Label for="invoiceNo">Purchaser</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="jobNo"
                                  value={inputValues.code}
                                  onChange={handleInputChange}
                                />
                                <Button
                                  color="primary"
                                  onClick={handlePurchaserOpenModal}
                                >
                                  <FaSearch />
                                </Button>
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col lg="3">
                            <FormGroup>
                              <Label for="vendor">Vendor</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="vendor"
                                  value={inputValues.code}
                                  onChange={handleInputChange}
                                />
                                <Button
                                  color="primary"
                                  onClick={handleVendorOpenModal}
                                >
                                  <FaSearch />
                                </Button>
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Modal
                          isOpen={InvoiceModalOpen}
                          toggle={() => setInvoiceModalOpen(!InvoiceModalOpen)}
                          size="lg"
                        >
                          <ModalHeader
                            toggle={() =>
                              setInvoiceModalOpen(!InvoiceModalOpen)
                            }
                          >
                            invoice Number
                          </ModalHeader>
                          <ModalBody
                            style={{ maxHeight: "80vh", overflow: "hidden" }}
                          >
                            {/* Filter Section */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                              {/* Filter Field Dropdown */}
                              <Input
                                type="select"
                                // value={cardFilterField}
                                // onChange={e => setCardFilterField(e.target.value)}
                                style={{ flex: 2 }}
                              >
                                <option value="CardId">Card Id</option>
                                <option value="CardCode">Card Code</option>
                              </Input>

                              {/* Filter Condition Dropdown */}
                              <Input
                                type="select"
                                value={InvoiceFilterValue}
                                onChange={e =>
                                  setCardFilterCondition(e.target.value)
                                }
                                style={{ flex: 2 }}
                              >
                                <option value="contains">Contains</option>
                                <option value="equals">Equals</option>
                                <option value="starts with">Starts With</option>
                                <option value="ends with">Ends With</option>
                                <option value="not equals">Not Equals</option>
                                <option value="not starts with">
                                  Not Starts With
                                </option>
                              </Input>

                              {/* Search Input */}
                              <Input
                                type="text"
                                placeholder="Enter search value"
                                value={InvoiceFilterValue}
                                onChange={e => {
                                  const value = e.target.value
                                  setInvoiceFilterValue(value)
                                }}
                                style={{ flex: 3 }}
                              />
                            </div>

                            {/* Scrollable Table */}
                            {InvoiceLoading ? (
                              <p>Loading...</p>
                            ) : (
                              <div
                                style={{ maxHeight: "50vh", overflowY: "auto" }}
                              >
                                <Table bordered responsive>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Invoice No</th>
                                      <th>Date</th>
                                      <th>Job Order No</th>
                                      <th>Branch Name Ar</th>
                                      <th>Branch Name En </th>
                                      <th>Branch Name</th>
                                      <th>Qty</th>
                                      <th>Amount</th>
                                      <th>Car Colour</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {InvoiceData.length > 0 ? (
                                      InvoiceData.map((item, index) => (
                                        <tr
                                          key={item.card_id}
                                          //onClick={() => handleCardRowClick(item)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <td>
                                            {(InvoicePage - 1) * pageSize +
                                              index +
                                              1}
                                          </td>
                                          <td>{item.code}</td>
                                          <td>{item.cgenNo}</td>
                                          <td>{item.openedon}</td>
                                          <td>{item.status}</td>
                                          <td>{item.recepcode}</td>
                                          <td>{item.branchName}</td>
                                          <td>{item.CarMake}</td>
                                          <td>{item.CarModel}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="11"
                                          className="text-center"
                                        >
                                          No data found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            )}

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <div className="text-muted">
                                Showing {(page - 1) * pageSize + 1} to{" "}
                                {Math.min(page * pageSize, InvoiceTotalCount)}{" "}
                                of {InvoiceTotalCount}
                              </div>
                              <Pagination
                                className="pagination-data"
                                current={page}
                                total={InvoiceTotalCount}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                //onChange={handleCardPageChange}
                                showTitle={false}
                              />
                            </div>
                          </ModalBody>
                        </Modal>

                        <Modal
                          isOpen={JobOrderModalOpen}
                          toggle={() =>
                            setJobOrderModalOpen(!JobOrderModalOpen)
                          }
                          size="lg"
                        >
                          <ModalHeader
                            toggle={() =>
                              setJobOrderModalOpen(!JobOrderModalOpen)
                            }
                          >
                            invoice Number
                          </ModalHeader>
                          <ModalBody
                            style={{ maxHeight: "80vh", overflow: "hidden" }}
                          >
                            {/* Filter Section */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                              {/* Filter Field Dropdown */}
                              <Input
                                type="select"
                                // value={cardFilterField}
                                // onChange={e => setCardFilterField(e.target.value)}
                                style={{ flex: 2 }}
                              >
                                <option value="CardId">Card Id</option>
                                <option value="CardCode">Card Code</option>
                              </Input>

                              {/* Filter Condition Dropdown */}
                              <Input
                                type="select"
                                value={InvoiceFilterValue}
                                onChange={e =>
                                  setCardFilterCondition(e.target.value)
                                }
                                style={{ flex: 2 }}
                              >
                                <option value="contains">Contains</option>
                                <option value="equals">Equals</option>
                                <option value="starts with">Starts With</option>
                                <option value="ends with">Ends With</option>
                                <option value="not equals">Not Equals</option>
                                <option value="not starts with">
                                  Not Starts With
                                </option>
                              </Input>

                              {/* Search Input */}
                              <Input
                                type="text"
                                placeholder="Enter search value"
                                value={JobOrderFilterValue}
                                onChange={e => {
                                  const value = e.target.value
                                  setJobOrderFilterValue(value)
                                }}
                                style={{ flex: 3 }}
                              />
                            </div>

                            {/* Scrollable Table */}
                            {JobOrderLoading ? (
                              <p>Loading...</p>
                            ) : (
                              <div
                                style={{ maxHeight: "50vh", overflowY: "auto" }}
                              >
                                <Table bordered responsive>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Invoice No</th>
                                      <th>Date</th>
                                      <th>Job Order No</th>
                                      <th>Branch Name Ar</th>
                                      <th>Branch Name En </th>
                                      <th>Branch Name</th>
                                      <th>Qty</th>
                                      <th>Amount</th>
                                      <th>Car Colour</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {JobOrderData.length > 0 ? (
                                      JobOrderData.map((item, index) => (
                                        <tr
                                          key={item.card_id}
                                          //onClick={() => handleCardRowClick(item)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <td>
                                            {(JobOrderPage - 1) * pageSize +
                                              index +
                                              1}
                                          </td>
                                          <td>{item.code}</td>
                                          <td>{item.cgenNo}</td>
                                          <td>{item.openedon}</td>
                                          <td>{item.status}</td>
                                          <td>{item.recepcode}</td>
                                          <td>{item.branchName}</td>
                                          <td>{item.CarMake}</td>
                                          <td>{item.CarModel}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="11"
                                          className="text-center"
                                        >
                                          No data found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            )}

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <div className="text-muted">
                                Showing {(page - 1) * pageSize + 1} to{" "}
                                {Math.min(page * pageSize, JobOrderTotalCount)}{" "}
                                of {JobOrderTotalCount}
                              </div>
                              <Pagination
                                className="pagination-data"
                                current={page}
                                total={JobOrderTotalCount}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                //onChange={handleCardPageChange}
                                showTitle={false}
                              />
                            </div>
                          </ModalBody>
                        </Modal>

                        <Modal
                          isOpen={PurchaserModalOpen}
                          toggle={() =>
                            setPurchaserModalOpen(!PurchaserModalOpen)
                          }
                          size="lg"
                        >
                          <ModalHeader
                            toggle={() =>
                              setPurchaserModalOpen(!PurchaserModalOpen)
                            }
                          >
                            invoice Number
                          </ModalHeader>
                          <ModalBody
                            style={{ maxHeight: "80vh", overflow: "hidden" }}
                          >
                            {/* Filter Section */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                              {/* Filter Field Dropdown */}
                              <Input
                                type="select"
                                // value={cardFilterField}
                                // onChange={e => setCardFilterField(e.target.value)}
                                style={{ flex: 2 }}
                              >
                                <option value="CardId">Card Id</option>
                                <option value="CardCode">Card Code</option>
                              </Input>

                              {/* Filter Condition Dropdown */}
                              <Input
                                type="select"
                                value={InvoiceFilterValue}
                                onChange={e =>
                                  setPurchaserFilterValue(e.target.value)
                                }
                                style={{ flex: 2 }}
                              >
                                <option value="contains">Contains</option>
                                <option value="equals">Equals</option>
                                <option value="starts with">Starts With</option>
                                <option value="ends with">Ends With</option>
                                <option value="not equals">Not Equals</option>
                                <option value="not starts with">
                                  Not Starts With
                                </option>
                              </Input>

                              {/* Search Input */}
                              <Input
                                type="text"
                                placeholder="Enter search value"
                                value={PurchaserFilterValue}
                                onChange={e => {
                                  const value = e.target.value
                                  setPurchaserFilterValue(value)
                                }}
                                style={{ flex: 3 }}
                              />
                            </div>

                            {/* Scrollable Table */}
                            {PurchaserLoading ? (
                              <p>Loading...</p>
                            ) : (
                              <div
                                style={{ maxHeight: "50vh", overflowY: "auto" }}
                              >
                                <Table bordered responsive>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Invoice No</th>
                                      <th>Date</th>
                                      <th>Job Order No</th>
                                      <th>Branch Name Ar</th>
                                      <th>Branch Name En </th>
                                      <th>Branch Name</th>
                                      <th>Qty</th>
                                      <th>Amount</th>
                                      <th>Car Colour</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {PurchaserData.length > 0 ? (
                                      PurchaserData.map((item, index) => (
                                        <tr
                                          key={item.card_id}
                                          //onClick={() => handleCardRowClick(item)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <td>
                                            {(PurchaserPage - 1) * pageSize +
                                              index +
                                              1}
                                          </td>
                                          <td>{item.code}</td>
                                          <td>{item.cgenNo}</td>
                                          <td>{item.openedon}</td>
                                          <td>{item.status}</td>
                                          <td>{item.recepcode}</td>
                                          <td>{item.branchName}</td>
                                          <td>{item.CarMake}</td>
                                          <td>{item.CarModel}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="11"
                                          className="text-center"
                                        >
                                          No data found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            )}

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <div className="text-muted">
                                Showing {(page - 1) * pageSize + 1} to{" "}
                                {Math.min(page * pageSize, PurchaserTotalCount)}{" "}
                                of {PurchaserTotalCount}
                              </div>
                              <Pagination
                                className="pagination-data"
                                current={page}
                                total={PurchaserTotalCount}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                //onChange={handleCardPageChange}
                                showTitle={false}
                              />
                            </div>
                          </ModalBody>
                        </Modal>

                        <Modal
                          isOpen={VendorModalOpen}
                          toggle={() => setVendorModalOpen(!VendorModalOpen)}
                          size="lg"
                        >
                          <ModalHeader
                            toggle={() => setVendorModalOpen(!VendorModalOpen)}
                          >
                            Invoice Number
                          </ModalHeader>
                          <ModalBody
                            style={{ maxHeight: "80vh", overflow: "hidden" }}
                          >
                            {/* Filter Section */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                              {/* Filter Field Dropdown */}
                              <Input type="select" style={{ flex: 2 }}>
                                <option value="CardId">Card Id</option>
                                <option value="CardCode">Card Code</option>
                              </Input>

                              {/* Filter Condition Dropdown */}
                              <Input
                                type="select"
                                value={InvoiceFilterValue}
                                onChange={e =>
                                  setVendorFilterValue(e.target.value)
                                }
                                style={{ flex: 2 }}
                              >
                                <option value="contains">Contains</option>
                                <option value="equals">Equals</option>
                                <option value="starts with">Starts With</option>
                                <option value="ends with">Ends With</option>
                                <option value="not equals">Not Equals</option>
                                <option value="not starts with">
                                  Not Starts With
                                </option>
                              </Input>

                              {/* Search Input */}
                              <Input
                                type="text"
                                placeholder="Enter search value"
                                value={VendorFilterValue}
                                onChange={e => {
                                  const value = e.target.value
                                  setVendorFilterValue(value)
                                }}
                                style={{ flex: 3 }}
                              />
                            </div>

                            {/* Scrollable Table */}
                            {VendorLoading ? (
                              <p>Loading...</p>
                            ) : (
                              <div
                                style={{ maxHeight: "50vh", overflowY: "auto" }}
                              >
                                <Table bordered responsive>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Invoice No</th>
                                      <th>Date</th>
                                      <th>Job Order No</th>
                                      <th>Branch Name Ar</th>
                                      <th>Branch Name En</th>
                                      <th>Branch Name</th>
                                      <th>Qty</th>
                                      <th>Amount</th>
                                      <th>Car Colour</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {VendorData.length > 0 ? (
                                      VendorData.map((item, index) => (
                                        <tr
                                          key={item.card_id}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <td>
                                            {(VendorPage - 1) * pageSize +
                                              index +
                                              1}
                                          </td>
                                          <td>{item.code}</td>
                                          <td>{item.cgenNo}</td>
                                          <td>{item.openedon}</td>
                                          <td>{item.status}</td>
                                          <td>{item.recepcode}</td>
                                          <td>{item.branchName}</td>
                                          <td>{item.CarMake}</td>
                                          <td>{item.CarModel}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="11"
                                          className="text-center"
                                        >
                                          No data found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            )}

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <div className="text-muted">
                                Showing {(page - 1) * pageSize + 1} to{" "}
                                {Math.min(page * pageSize, VendorTotalCount)} of{" "}
                                {VendorTotalCount}
                              </div>
                              <Pagination
                                className="pagination-data"
                                current={page}
                                total={VendorTotalCount}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                showTitle={false}
                              />
                            </div>
                          </ModalBody>
                        </Modal>

                        <Row>
                          {/* Ref Number */}
                          <Col lg="3">
                            <div className="mb-3">
                              <Label>Ref Number</Label>
                              <Input
                                type="text"
                                placeholder="Enter Ref Number"
                                //  value={refNumber}
                                onChange={e => setRefNumber(e.target.value)}
                              />
                            </div>
                          </Col>

                          {/* Pay Type Dropdown */}
                          <Col lg="3">
                            <div className="mb-3">
                              <Label>Pay Type</Label>
                              <Select
                                placeholder="Select Pay Type"
                                classNamePrefix="select2-selection"
                                isClearable
                                onChange={selected => setPayType(selected)}
                              />
                            </div>
                          </Col>

                          {/* Receiver Text Field */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="receiver">Receiver</Label>
                              <InputGroup>
                                <Input
                                  type="text"
                                  id="receiver"
                                  value={inputValues.code}
                                  onChange={handleInputChange}
                                />
                                <Button
                                  color="primary"
                                  onClick={handleReceiverOpenModal}
                                >
                                  <FaSearch />
                                </Button>
                              </InputGroup>
                            </FormGroup>
                          </Col>

                          <Col lg="3">
                            <div className="mb-3">
                              <Label for="notes">Notes</Label>
                              <Input
                                type="text"
                                id="notes"
                                className="form-control"
                                placeholder="Enter Notes"
                                // value={notes}
                                onChange={e => setNotes(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Modal
                          isOpen={ReceiverModalOpen}
                          toggle={() =>
                            setReceiverModalOpen(!ReceiverModalOpen)
                          }
                          size="lg"
                        >
                          <ModalHeader
                            toggle={() =>
                              setReceiverModalOpen(!ReceiverModalOpen)
                            }
                          >
                            Invoice Number
                          </ModalHeader>
                          <ModalBody
                            style={{ maxHeight: "80vh", overflow: "hidden" }}
                          >
                            {/* Filter Section */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                              {/* Filter Field Dropdown */}
                              <Input type="select" style={{ flex: 2 }}>
                                <option value="CardId">Card Id</option>
                                <option value="CardCode">Card Code</option>
                              </Input>

                              {/* Filter Condition Dropdown */}
                              <Input
                                type="select"
                                value={InvoiceFilterValue}
                                onChange={e =>
                                  setReceiverFilterValue(e.target.value)
                                }
                                style={{ flex: 2 }}
                              >
                                <option value="contains">Contains</option>
                                <option value="equals">Equals</option>
                                <option value="starts with">Starts With</option>
                                <option value="ends with">Ends With</option>
                                <option value="not equals">Not Equals</option>
                                <option value="not starts with">
                                  Not Starts With
                                </option>
                              </Input>

                              {/* Search Input */}
                              <Input
                                type="text"
                                placeholder="Enter search value"
                                value={ReceiverFilterValue}
                                onChange={e => {
                                  const value = e.target.value
                                  setReceiverFilterValue(value)
                                }}
                                style={{ flex: 3 }}
                              />
                            </div>

                            {/* Scrollable Table */}
                            {ReceiverLoading ? (
                              <p>Loading...</p>
                            ) : (
                              <div
                                style={{ maxHeight: "50vh", overflowY: "auto" }}
                              >
                                <Table bordered responsive>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Invoice No</th>
                                      <th>Date</th>
                                      <th>Job Order No</th>
                                      <th>Branch Name Ar</th>
                                      <th>Branch Name En</th>
                                      <th>Branch Name</th>
                                      <th>Qty</th>
                                      <th>Amount</th>
                                      <th>Car Colour</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ReceiverData.length > 0 ? (
                                      ReceiverData.map((item, index) => (
                                        <tr
                                          key={item.card_id}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <td>
                                            {(ReceiverPage - 1) * pageSize +
                                              index +
                                              1}
                                          </td>
                                          <td>{item.code}</td>
                                          <td>{item.cgenNo}</td>
                                          <td>{item.openedon}</td>
                                          <td>{item.status}</td>
                                          <td>{item.recepcode}</td>
                                          <td>{item.branchName}</td>
                                          <td>{item.CarMake}</td>
                                          <td>{item.CarModel}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="11"
                                          className="text-center"
                                        >
                                          No data found
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>
                              </div>
                            )}

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                              <div className="text-muted">
                                Showing {(page - 1) * pageSize + 1} to{" "}
                                {Math.min(page * pageSize, ReceiverTotalCount)}{" "}
                                of {ReceiverTotalCount}
                              </div>
                              <Pagination
                                className="pagination-data"
                                current={page}
                                total={ReceiverTotalCount}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                showTitle={false}
                              />
                            </div>
                          </ModalBody>
                        </Modal>

                        <Row>
                          {/* Car Model Dropdown */}
                          <Col lg="4">
                            <div className="mb-3">
                              <Label>Car Model</Label>
                              <Select
                                placeholder="Select Car Model"
                                classNamePrefix="select2-selection"
                                isClearable
                                onChange={selected =>
                                  setSelectedCarModel(selected)
                                }
                              />
                            </div>
                          </Col>

                          {/* Car Make Dropdown */}
                          <Col lg="4">
                            <div className="mb-3">
                              <Label>Car Make</Label>
                              <Select
                                placeholder="Select Car Make"
                                classNamePrefix="select2-selection"
                                isClearable
                                onChange={selected =>
                                  setSelectedCarMake(selected)
                                }
                              />
                            </div>
                          </Col>

                          {/* Year Dropdown */}
                          <Col lg="4">
                            <div className="mb-3">
                              <Label>Year</Label>
                              <Select
                                placeholder="Select Year"
                                classNamePrefix="select2-selection"
                                isClearable
                                onChange={selected => setSelectedYear(selected)}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          {/* Net Amount */}
                          <Col lg="3">
                            <div className="mb-3">
                              <Label>Net Amount</Label>
                              <Input
                                type="text"
                                placeholder="Enter Net Amount"
                              />
                            </div>
                          </Col>

                          {/* Invoice Amount */}
                          <Col lg="3">
                            <div className="mb-3">
                              <Label>Invoice Amount</Label>
                              <Input
                                type="text"
                                placeholder="Enter Invoice Amount"
                              />
                            </div>
                          </Col>

                          {/* Invoice Real Value */}
                          <Col lg="3">
                            <div className="mb-3">
                              <Label>Invoice Real Value</Label>
                              <Input
                                type="text"
                                placeholder="Enter Invoice Real Value"
                              />
                            </div>
                          </Col>

                          {/* Invoice Discount % */}
                          <Col lg="3">
                            <div className="mb-3">
                              <Label>Invoice Dis %</Label>
                              <Input
                                type="text"
                                placeholder="Enter Discount %"
                              />
                            </div>
                          </Col>
                        </Row>

                        {/* Invoice Grid */}
                        <Row>
                          <Col lg="12">
                            <div style={{ overflowX: "auto", width: "100%" }}>
                              <table
                                className="table table-bordered table-striped"
                                style={{
                                  width: "100%",
                                  tableLayout: "auto",
                                  minWidth: "1800px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                <thead
                                  className="table-light"
                                  style={{
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 2,
                                    background: "#fff",
                                  }}
                                >
                                  <tr>
                                    <th>Sl No</th>
                                    <th>Item No</th>
                                    <th>Part No</th>
                                    <th style={{ minWidth: "200px" }}>Item</th>
                                    <th>Unit</th>
                                    <th>Type</th>
                                    <th>Qty.Ord</th>
                                    <th>Lsp</th>
                                    <th>Price</th>
                                    <th>Act.Price</th>
                                    <th>Tot.Amt</th>
                                    <th>Disc%</th>
                                    <th>DiscAmt</th>
                                    <th>VAT %</th>
                                    <th>VAT Amt</th>
                                    <th>Net Amt</th>
                                    <th>Total Cost</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invoiceItems.map((item, index) => (
                                    <tr
                                      key={index}
                                      onClick={() => handleRowClick(item)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <td>{index + 1}</td>
                                      <td>{item.itemNo}</td>
                                      <td>{item.partNo}</td>
                                      <td style={{ minWidth: "200px" }}>
                                        {item.itemName}
                                      </td>
                                      <td>{item.unit}</td>
                                      <td>{item.type}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.lsp}</td>
                                      <td>{item.price}</td>
                                      <td>{item.actualPrice}</td>
                                      <td>{item.actualPrice}</td>
                                      <td>{item.discountPerc}</td>
                                      <td>{item.discountAmt}</td>
                                      <td>{item.vatPerc}</td>
                                      <td>{item.vat}</td>
                                      <td>{item.netamt}</td>
                                      <td>{item.totalcost}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr className="table-info">
                                    <td colSpan="6" className="text-end">
                                      <strong>Totals:</strong>
                                    </td>
                                    <td>
                                      <strong>
                                        {invoiceItems.reduce(
                                          (sum, item) =>
                                            sum + (item.quantity || 0),
                                          0
                                        )}
                                      </strong>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <strong>
                                        {invoiceItems
                                          .reduce(
                                            (sum, item) =>
                                              sum + (item.price || 0),
                                            0
                                          )
                                          .toFixed(2)}
                                      </strong>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <strong>
                                        {invoiceItems
                                          .reduce(
                                            (sum, item) =>
                                              sum + (item.vat || 0),
                                            0
                                          )
                                          .toFixed(2)}
                                      </strong>
                                    </td>
                                    <td>
                                      <strong>
                                        {invoiceItems
                                          .reduce(
                                            (sum, item) =>
                                              sum + (item.netamt || 0),
                                            0
                                          )
                                          .toFixed(2)}
                                      </strong>
                                    </td>
                                    <td>
                                      <strong>
                                        {invoiceItems
                                          .reduce(
                                            (sum, item) =>
                                              sum + (item.totalcost || 0),
                                            0
                                          )
                                          .toFixed(2)}
                                      </strong>
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </Col>
                        </Row>

                        <Row
                          className="align-items-center p-3"
                          style={{ background: "#d6e4f0" }}
                        >
                          {/* Date Picker */}
                          <Col lg="4" className="d-flex align-items-center">
                            <Label className="me-2">Date</Label>
                            <Input type="date" className="form-control" />
                          </Col>

                          {/* Discount Section */}
                          <Col lg="4" className="d-flex align-items-center">
                            <Input
                              type="radio"
                              name="discount"
                              className="me-2"
                              defaultChecked
                            />
                            <Label className="me-3">Disc %</Label>
                            <Input
                              type="text"
                              className="form-control me-2"
                              placeholder="%"
                            />

                            <Input
                              type="radio"
                              name="discount"
                              className="me-2"
                            />
                            <Label className="me-3">Disc Amt</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="0.000"
                            />
                          </Col>

                          {/* Amounts Section */}
                          <Col lg="4">
                            <Row>
                              <Col lg="6">
                                <Label className="fw-bold">Gross Amount</Label>
                                <Input
                                  type="text"
                                  className="form-control text-end fw-bold"
                                  value="0.000"
                                  readOnly
                                />
                              </Col>
                              <Col lg="6">
                                <Label className="fw-bold">Expenses</Label>
                                <Input
                                  type="text"
                                  className="form-control text-end bg-danger text-white fw-bold"
                                  placeholder="0.000"
                                />
                              </Col>
                              <Col lg="12">
                                <Label className="fw-bold text-primary">
                                  Net Amount
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control text-end fw-bold"
                                  value="0.000"
                                  readOnly
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>

                        <Modal show={showModal} size="lg" centered>
                          <Modal.Title>Serial Details</Modal.Title>

                          <Modal.Body>
                            {selectedItem && (
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Sl No</th>
                                    <th>Serial Number</th>
                                    <th>Parent Serial</th>
                                    <th>Unit</th>
                                    <th>Sales Price</th>
                                    <th>Cost Price</th>
                                    <th>Active</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedItem.serialNumbers?.map(
                                    (serial, index) => {
                                      // Calculate the individual cost per serial based on avg cost
                                      const avgCost =
                                        selectedItem.totalcost /
                                          selectedItem.serialNumbers.length || 0

                                      return (
                                        <tr key={serial}>
                                          <td>{index + 1}</td>
                                          <td>{serial}</td>
                                          <td>{serial}</td>
                                          <td>{selectedItem.unit}</td>
                                          <td>{selectedItem.price}</td>
                                          <td>{avgCost}</td>{" "}
                                          {/* Show individual serial cost */}
                                          <td>
                                            <input
                                              type="checkbox"
                                              defaultChecked
                                              // onChange={(e) => handleCheckboxChange(e, serial)}
                                            />
                                          </td>
                                        </tr>
                                      )
                                    }
                                  )}
                                </tbody>
                              </table>
                            )}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              // onClick={() => setShowModal(false)}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Form>
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

export default PurchaseBranch
