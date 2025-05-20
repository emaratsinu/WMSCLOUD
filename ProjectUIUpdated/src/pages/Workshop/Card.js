import React, { useState, useEffect } from "react"
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

import Select from "react-select"
import { FaSearch } from "react-icons/fa"
import Pagination from "rc-pagination"
import Swal from "sweetalert2"

import classnames from "classnames"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { fetchItemCarDetails } from "../../components/Api/itemApiService"
import {
  fetchCardCustomer,
  fetchNextCardCode,
  fetchJobOrderTypes,
  fetchJobOrderStatus,
  fetchCardEmployee,
  fetchCardDetails,
  fetchNextCGenCode,
  fetchLabourDetails,
  fetchLabourJobDetails,
  fetchLabourOtherJobDetails,
  SaveLabourdetails,
  fetchNextLabourDetCode,
  fetchLabourStatusHead,
  fetchLabourStatusDetails,
  fetchMechanicGroup,
  SaveCardMain,
  UpdateCardCgenStatus,
  fetchJobOrderCode,
  fetchSavedCardId,
  UpdateLabourCommission,
  fetchOldParts,
  fetchStoreParts,
  fetchOutsideParts,
  fetchJobNetAmts,
  fetchCustParts,
  fetchNextOldPartCode,
  SaveOldPart,
  fetchNextCustPartCode,
  SaveCustPart,
} from "../../components/Api/CardApiService"
import "../Master/ownstyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

const CardAdd = () => {
  const [activeTab, setactiveTab] = useState(1)
  const [subTab, setSubTab] = useState(1)
  const [ItemCarDet, setCarDet] = useState([])
  const [selectedCarModel, setSelectedCarModel] = useState(null)
  const [carMake, setCarMake] = useState("") // State for Car Make
  const [modalOpen, setModalOpen] = useState(false)

  const [selectedPlate, setSelectedPlate] = useState("")
  const [plateData, setPlateData] = useState([])
  const [data, setData] = useState([]) // API result
  const [loading, setLoading] = useState(false)
  const [TotalCount, setTotalCount] = useState(0) // Total records
  const [page, setPage] = useState(1)
  const pageSize = 10 // Fixed page size
  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(10)
  const [selectedField, setSelectedField] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [filterField, setFilterField] = useState("CarPlateEn")
  const [filterCondition, setFilterCondition] = useState("contains")
  const [JobOrdrTypes, setJobOrdrTypes] = useState([])
  const [JobOrdrStatus, setJobOrdrStatus] = useState([])

  const [jobOrderStatusCode, setJobOrderStatusCode] = useState(null)
  const [SelectedJobOrderType, setSelectedJobOrderType] = useState(null)
  const [SelectedJobOrderStatus, setSelectedJobOrderStatus] = useState(null)
  const [empModalOpen, setEmpModalOpen] = useState(false)
  const [empFilterField, setEmpFilterField] = useState("Emp_Code")
  const [empFilterCondition, setEmpFilterCondition] = useState("contains")
  const [empFilterValue, setEmpFilterValue] = useState("")
  const [empData, setEmpData] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [empPage, setEmpPage] = useState(1)
  const [empTotalCount, setEmpTotalCount] = useState(0)
  const [employeeList, setEmployeeList] = useState([])
  const [cardFilterField, setCardFilterField] = useState("CardCode")
  const [cardFilterCondition, setCardFilterCondition] = useState("contains")
  const [cardFilterValue, setCardFilterValue] = useState("")
  const [cardData, setCardData] = useState([])
  const [CardLoading, setCardLoading] = useState(false)
  const [CardPage, setCardPage] = useState(1)
  const [CardTotalCount, setCardTotalCount] = useState(0)
  const [cardModalOpen, setCardModalOpen] = useState(false)
  const [mechanicDetails, setMechanicDetails] = useState([])
  const [StorePartDetails, SetStorePartDetails] = useState([])
  const [JobGrpFilterField, setJobGrpFilterField] = useState("CardCode")
  const [JobGrpFilterCondition, setJobGrpFilterCondition] = useState("contains")
  const [JobGrpFilterValue, setJobGrpFilterValue] = useState("")
  const [LabourGrpData, setLabourGrpData] = useState("")
  const [LabourChildGrpData, setLabourChildGrpData] = useState("")
  const [LabourGrpLoading, setLabourGrpLoading] = useState(false)
  const [LabourGrpModalOpen, setLabourGrpModalOpen] = useState(false)
  const [ChildLabourGrpData, setChildLabourGrpData] = useState("")
  const [ShowChildTable, setShowChildTable] = useState(false)
  const [ShowChildDetTable, setShowChildDetTable] = useState(false)

  const [LabourChildGrpLoading, setLabourChildGrpLoading] = useState(false)
  const [ChildDetGrpData, setChildDetGrpData] = useState("")

  const [OtherJobFilterField, setOtherJobFilterField] = useState("")
  const [OtherJobFilterCondition, setOtherJobFilterCondition] =
    useState("contains")
  const [OtherJobFilterValue, setOtherJobFilterValue] = useState("")
  const [OtherJobModalOpen, setOtherJobModalOpen] = useState(false)
  const [OtherJobData, setOtherJobData] = useState("")

  const [selectedLabourGrp, setSelectedLabourGrp] = useState(null)
  const [selectedChildGrp, setSelectedChildGrp] = useState(null)
  const [selectedChildDetGrp, setSelectedChildDetGrp] = useState(null)
  const [LabourStatusHead, setLabourStatusHead] = useState([])
  const [LabourStatusdetail, setLabourStatusdetail] = useState([])
  const [MechanicGroup, setMechanicGroup] = useState([])
  const [OldPartsDetails, setOldPartsDetails] = useState([])
  const [OutsidePartDetails, SetOutsidePartDetails] = useState([])
  const [NetAmtDetails, SetNetAmtDetails] = useState([])
  const [CusPartDetails, SetCusPartDetails] = useState([])

  const [pageNumber, setPageNumber] = useState(1) // Curr
  const [formData, setFormData] = useState({
    plateEn: "",
    plateAr: "",
    nameEn: "",
    nameAr: "",
    ownerEn: "",
    ownerAr: "",
    phone: "",
    empcode: "",
    empnameEn: "",
    empnameAr: "",
    createdby: "",
    cgen: "",
    jobordertypeen: "",
    jobordertypear: "",
    joborderid: "",
    status: "",
    statusid: "",
    empid: "",
    caryear: "",
    labourGrpid: "",
    labourGrpcode: "",
    labourGrpEn: "",
    labourGrpAr: "",
    labourStatusId: "",
    status2: "",
    status2Name: "",
    mechGroupId: "",

    price: "",
    vatPercentage: "",
    vatAmount: "",
    netAmount: "",
    cardownerid: "",
    make_id: "",
    Model_id: "",
    vincode: "",
    kilometers: "",
    engineType: "",
    gearType: "",
    skillLevel: "",
    mitchelTime: "",
    convTime: "",
    OldPartItemId: "",
    OldPartItemCode: "",
    OldPartItemNameEn: "",
    OldPartItemNameAr: "",
    OldPartOem: "",
    OldPartNetSales: "",
    OldPartPrice: "",
    OldPartVatAmt: "",
    OldPartNetSalesPrice: "",
    SummaryLabourNet: "",
    SummaryLabourVatNetAmt: "",
    SummaryOldPartNet: "",
    SummaryCustPartNet: "",
    SummaryStorePartNet: "",
    SummaryOutSidePartNet: "",
    SummaryDepositNet: "",
    SummaryDosNet: "",
    SummaryOldPartVatAmt: "",
    SummaryLabourCharge: "",
    SummaryWarrantyPeriod: 0,
    SummaryGrossAmount: 0,
    SummaryNetAmount: 0,
    SummaryLabourDiscAmt: "",

    OldPartId: "",
    OldPartNameEn: "",
    OldPartNameAr: "",
    OldPartNumber: "",
    OldPartQty: 0,
    OldPartPrice: 0,
    OldPartVatPercentage: "",
    OldPartVatAmount: 0,
    OldPartNetAmount: 0,

    CustPartPartNo: "",
    CustPartNameEn: "",
    CustPartNameAr: "",
    CustPartQty: "",
    CustPartPrice: "",
    CustPartNetAmount: "",
  })

  const [inputValues, setInputValues] = useState({
    code: "",
    cgencode: "",
    LabourDetCode: "",
    cgenid: "",
    savedcardid: "",
    OldpartCode: "",
    CustpartCode: "",
  })

  useEffect(() => {
    fetchNxtCardCode()
    fetchjobOrdrTypes()
    fetchjobOrdrStatus()
    fetchNxtCGenCode()
    GetLabourStatusHead()
    GetMechanicGroup()
    GetCarModels()
    fetchNxtOldPartCode()
    fetchNxtCustPartCode()
  }, [])
  useEffect(() => {
    console.log("Updated selectedCustomer:", selectedCustomer)
  }, [selectedCustomer])

  const fetchNxtCardCode = async () => {
    try {
      const data = await fetchNextCardCode()
      setInputValues(prev => ({ ...prev, code: data.nxtCardCode }))
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error")
    }
  }

  const NextLabourDetCode = async () => {
    try {
      const data = await fetchNextLabourDetCode()
      setInputValues(prev => ({ ...prev, LabourDetCode: data.nxtlabourCode }))
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error")
    }
  }

  const getJobOrderStatusById = async statusId => {
    try {
      const result = await fetchJobOrderCode(statusId)
      setJobOrderStatusCode(result) // Store the result in state
      return result // Return the fetched data
    } catch (error) {
      console.error("Error fetching job order status:", error)
    }
  }

  const fetchNxtCGenCode = async () => {
    try {
      const br_id = 3 // Hardcoded Branch ID
      const cardStatusCode = "002" // Hardcoded Status Code

      const data = await fetchNextCGenCode(br_id, cardStatusCode) // Pass parameters
      setInputValues(prev => ({
        ...prev,
        cgenid: data.cGen_Id,
        cgencode: data.cgeN_NUMBER,
      }))
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error")
    }
  }
  const handleLabourDiscountChange = e => {
    let labourDiscAmt = parseFloat(e.target.value) || 0 // Labour Discount Amount
    let labourCharges = parseFloat(formData.SummaryLabourCharge) || 0 // Labour Charges
    let storePartNet = parseFloat(formData.SummaryStorePartNet) || 0
    let outsidePartNet = parseFloat(formData.SummaryOutSidePartNet) || 0
    let customerPartNet = parseFloat(formData.SummaryCustPartNet) || 0
    let dosNet = parseFloat(formData.SummaryDosNet) || 0
    let oldPartNet = parseFloat(formData.SummaryOldPartNet) || 0
    let parkingCharge = parseFloat(formData.SummaryParkingCharge) || 0
    let deposit = parseFloat(formData.SummaryDepositNet) || 0

    // Calculate Labour VAT Amount (15% of (Labour Charges - Discount))
    let labourVatAmt = ((labourCharges - labourDiscAmt) * 0.15).toFixed(2)

    // Calculate New Labour Net Amount
    let newLabourNetAmt =
      labourDiscAmt === 0
        ? (labourCharges + parseFloat(labourVatAmt)).toFixed(2) // If no discount, just add VAT
        : ((labourCharges - labourDiscAmt) * 1.05).toFixed(2) // Otherwise, apply discount & VAT

    // Calculate New Labour Net Amount
    let newCalcNetAmt = (
      labourCharges -
      labourDiscAmt +
      parseFloat(labourVatAmt)
    ).toFixed(2)

    // Calculate Gross Amount
    let grossAmount = (
      parseFloat(newCalcNetAmt) +
      storePartNet +
      outsidePartNet +
      customerPartNet +
      dosNet +
      oldPartNet +
      parkingCharge
    ).toFixed(2)

    // Calculate Net Amount (Gross Amount - Deposit)
    let netAmount = (parseFloat(grossAmount) - deposit).toFixed(2)

    // Update State
    setFormData({
      ...formData,
      SummaryLabourDiscAmt: labourDiscAmt,
      SummaryLabourVatNetAmt: labourVatAmt,
      SummaryLabourNet: newLabourNetAmt,
      SummaryGrossAmount: grossAmount,
      SummaryNetAmount: netAmount,
    })
  }

  const fetchjobOrdrTypes = async () => {
    try {
      const JobOrdrTypesData = await fetchJobOrderTypes()
      if (JobOrdrTypesData) setJobOrdrTypes(JobOrdrTypesData)
    } catch (error) {
      console.error("Error fetching item name  options:", error)
    }
  }

  const GetCarModels = async () => {
    try {
      const CarModelsData = await fetchItemCarDetails()
      if (CarModelsData) setCarDet(CarModelsData)
    } catch (error) {
      console.error("Error fetching item name  options:", error)
    }
  }

  const clearForm = () => {
    setFormData({
      plateEn: "",
      plateAr: "",
      nameEn: "",
      nameAr: "",
      ownerEn: "",
      ownerAr: "",
      phone: "",
      empcode: "",
      empnameEn: "",
      empnameAr: "",
      createdby: "",
      cgen: "",
      jobordertypeen: "",
      jobordertypear: "",
      joborderid: "",
      status: "",
      statusid: "",
      empid: "",
      caryear: "",
      labourGrpid: "",
      labourGrpcode: "",
      labourGrpEn: "",
      labourGrpAr: "",
      labourStatusId: "",
      status2: "",
      status2Name: "",
      mechGroupId: "",

      price: "",
      vatPercentage: "",
      vatAmount: "",
      netAmount: "",
      cardownerid: "",
      make_id: "",
      Model_id: "",
      vincode: "",
      kilometers: "",
      engineType: "",
      gearType: "",
    })

    setInputValues({
      code: "",
      cgencode: "",
      LabourDetCode: "",
      cgenid: "",
      savedcardid: "",
    })

    // **Call the useEffect functions**
    fetchNxtCardCode()
    fetchjobOrdrTypes()
    fetchjobOrdrStatus()
    fetchNxtCGenCode()
    GetLabourStatusHead()
    GetMechanicGroup()
    GetCarModels()
  }

  const GetMechanicGroup = async () => {
    try {
      const BrId = 3 // Example: Replace with actual value
      const Criteria = 0 // Example: Replace with actual value
      const MechanicGrpData = await fetchMechanicGroup(BrId, Criteria)

      if (MechanicGrpData) {
        setMechanicGroup(MechanicGrpData)
      }
    } catch (error) {
      console.error("Error fetching mechanic group options:", error)
    }
  }

  const fetchjobOrdrStatus = async () => {
    try {
      const JobOrdrStatusData = await fetchJobOrderStatus()
      if (JobOrdrStatusData) setJobOrdrStatus(JobOrdrStatusData)
    } catch (error) {
      console.error("Error fetching job order status   options:", error)
    }
  }

  const GetLabourStatusHead = async () => {
    try {
      const LabourStatusHeadData = await fetchLabourStatusHead()
      if (LabourStatusHeadData) setLabourStatusHead(LabourStatusHeadData)
    } catch (error) {
      console.error("Error fetching job order status   options:", error)
    }
  }

  const GetLabourStatusDetails = async (criteria, lbStatDet_HeadId) => {
    try {
      const LabourStatusdetailData = await fetchLabourStatusDetails(
        criteria,
        lbStatDet_HeadId
      )

      if (LabourStatusdetailData.length > 0) {
        const firstStatus = LabourStatusdetailData[0]

        setLabourStatusdetail(LabourStatusdetailData)

        setFormData(prev => ({
          ...prev,
          status2: firstStatus.lbStatDet_Id, // ✅ Store ID
          status2Name: firstStatus.dispName, // ✅ Display Name
        }))
      }
    } catch (error) {
      console.error("Error fetching Status 2 details:", error)
    }
  }

  const handleInputChange = async e => {
    const { name, value } = e.target

    // Update formData
    setFormData(prevData => ({ ...prevData, [name]: value }))

    // If Status 1 is changed, fetch Status 2 options dynamically
    if (name === "labourStatusId" && value) {
      await GetLabourStatusDetails(1, value) // Fetch status details
    } else {
      setLabourStatusdetail([]) // Reset Status 2 options if no selection
    }
  }

  const fetchCardCustomerDtls = async (
    page = 1,
    field = "",
    condition = "",
    value = ""
  ) => {
    setLoading(true)
    try {
      const response = await fetchCardCustomer(
        page,
        pageSize,
        field.trim(), // Ensure it passes correctly
        condition.trim(), // Ensure it passes correctly
        value.trim()
      )

      console.log("Raw API Response:", response)

      if (response && Array.isArray(response.items)) {
        setData(
          response.items.map((item, index) => ({
            id: item.cOwner_Id,
            code: item.cOwner_Code,
            nameEn: item.cOwner_NameEn,
            nameAr: item.cOwner_NameAr,
            phone: item.cOwner_ContactNo,
            plateEn: item.card_CarPlateEn,
            plateAr: item.card_CarPlateAr,
            CarMakeEn: item.make_NameEn,
            CarMakeAr: item.make_NameAr,
            ModelEn: item.model_NameEn,
            ModelAr: item.model_NameAr,
            ModelId: item.model_Id,
            MakeId: item.make_Id,
            CarYear: item.card_CarYear,
            CarVinCode: item.card_VinCode,
            CarEngine: item.card_Engine,
            CarGear: item.card_Gear,
            index: (page - 1) * pageSize + index + 1,
          }))
        )

        setTotalCount(response.totalCount ?? 0)
      } else {
        console.error("Unexpected API response format:", response)
        setData([])
        setTotalCount(0)
      }
    } catch (error) {
      console.error("Error fetching card customers:", error)
      setData([])
      setTotalCount(0)
    } finally {
      setLoading(false)
    }
  }

  const fetchCardEmployeeDtls = async (
    page = 1,
    field = "",
    condition = "",
    value = ""
  ) => {
    setEmpLoading(true)
    try {
      const response = await fetchCardEmployee(
        page,
        pageSize,
        field.trim(),
        condition.trim(),
        value.trim()
      )

      console.log("Raw Employee API Response:", response)

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
          index: (page - 1) * pageSize + index + 1,
        }))

        setEmpData(formattedData)
        setEmpTotalCount(response.totalCount ?? 0)
      } else {
        console.error("Unexpected API response format:", response)
        setEmpData([])
        setEmpTotalCount(0)
      }
    } catch (error) {
      console.error("Error fetching employee details:", error)
      setEmpData([])
      setEmpTotalCount(0)
    } finally {
      setEmpLoading(false) // Fix: Set loading to false after completion
    }
  }

  const fetchCardDtls = async (
    cr = 1,
    brId = 3, // ✅ Use dynamic branch ID
    jOrderStatus = null,
    jobOrderId = null,
    page = 1,
    field = "",
    condition = "",
    value = ""
  ) => {
    setCardLoading(true)

    console.log("🔍 Calling fetchCardDetails with params:", {
      cr,
      brId,
      jOrderStatus,
      jobOrderId,
      page,
      pageSize,
      field: field.trim(),
      condition: condition.trim(),
      value: value.trim(),
    })

    try {
      const response = await fetchCardDetails(
        cr,
        brId,
        jOrderStatus,
        jobOrderId,
        page,
        pageSize,
        field.trim(),
        condition.trim(),
        value.trim()
      )

      console.log("Raw API Response:", response)

      if (response && response.items && Array.isArray(response.items.items)) {
        // ✅ Format the data before setting state
        const formattedData = response.items.items.map((item, index) => ({
          id: item.card_Id,
          code: item.card_Code,
          cgenNo: item.cgen_Number,
          openedon: item.card_OpenDate,
          status: item.jobOrderStatDisp,
          statusid: item.jorder_StatId,
          recepcode: item.recpCode,
          branchName: item.br_NameEn,
          CarMake: item.makeDisplayName,
          CarModel: item.modelDisplayName,
          CarColour: item.card_CarColour,
          cgen: item.cgen_Number,
          recpNameEn: item.recpNameEn,
          recpnameAr: item.recpnameAr,
          recepid: item.recpId,
          jobordertypeen: item.jordertype_DescEn,
          jobordertypear: item.jordertype_DescAr,
          joborderid: item.jordertype_Id,
          CarPlateEn: item.card_CarPlateEn,
          CarPlateAr: item.card_CarPlateAr,
          caryear: item.card_CarYear,

          index: (page - 1) * pageSize + index + 1,
        }))

        setCardData(formattedData) // ✅ Corrected setting of state
        setCardTotalCount(response.totalCount ?? 0) // ✅ Ensure correct key casing
      } else {
        console.error("Unexpected API response format:", response)
        setCardData([])
        setCardTotalCount(0)
      }
    } catch (error) {
      console.error("Error fetching card details:", error)
      setCardData([])
      setCardTotalCount(0)
    } finally {
      setCardLoading(false)
    }
  }

  const updateCGenStatus = async (longCGenId, strJoOrderStatCode) => {
    console.log("Inside updateCGenStatus - Cgenid:", longCGenId) // Debugging
    console.log("Inside updateCGenStatus - JOborderStsid:", strJoOrderStatCode)

    try {
      // Fetch job order status details using strJoOrderStatCode as ID
      const jobOrderStatusList = await getJobOrderStatusById(strJoOrderStatCode)

      // Check if response is valid and contains at least one item
      if (
        !Array.isArray(jobOrderStatusList) ||
        jobOrderStatusList.length === 0
      ) {
        alert("Error: Unable to fetch valid Job Order Status Code")
        return
      }

      // Extract the first item from the array
      const jobOrderStatus = jobOrderStatusList[0]

      // Ensure that jOrder_StatCode exists
      if (!jobOrderStatus.jOrder_StatCode) {
        alert("Error: Invalid Job Order Status Code")
        return
      }

      // Extract the job order status code
      const strCGenStatCode = jobOrderStatus.jOrder_StatCode

      // Find the corresponding new CGen status code
      const resolvedCGenStatus = findCGenNewStatus(strCGenStatCode)

      // Ensure the resolved status is valid
      if (!resolvedCGenStatus) {
        alert("Error: Invalid Job Order Status Code")
        return
      }

      // Call the API to update the CGen status
      const response = await UpdateCardCgenStatus({
        cGen_Id: longCGenId,
        cStatus_Code: resolvedCGenStatus,
      })

      console.log("CGen Status updated successfully:", response)
    } catch (error) {
      console.error("Error updating card status:", error.message)
      alert(error.message || "Error updating card status")
    }
  }

  const GetCardlabourDetails = async (jobcard_id = null) => {
    try {
      const criteria = 1 // Always pass criteria as 1

      if (!jobcard_id) {
        console.error("Missing jobcard_id for fetching labour details.")
        return
      }

      const response = await fetchLabourDetails(criteria, jobcard_id) // Pass jobcard_id dynamically

      console.log("Raw API Response:", response)

      // Check if response is an array
      if (!Array.isArray(response)) {
        console.error("API response format is incorrect:", response)
        return
      }

      const formattedData = response.map(item => ({
        jobName: item.lGrp_DescEn,
        mechanicGroup: item.mechGrp_NameEn,
        mechanicName: item.emp_NameEn,
        price: item.lbDet_Rate,
        totalAmount: item.lbDetNetTotal,
        totalDisc: item.lbDetDiscTotAmt,
        vatPerc: item.lbDet_VATPerc,
        vatAmt: item.lbDet_VATAmt,
        netAmt: item.lbDetNetAmt,
        status: item.labStat_DescEn,
        statusDesc: item.lbStatDet_DescEn,
      }))

      setMechanicDetails(formattedData)
    } catch (error) {
      console.error("Error fetching labour details:", error)
    }
  }
  // fetch job seach in labour details
  const GetCardlabourGrpJobs = async (
    LGrp_ParentId,
    Criteria,
    field = "",
    condition = "",
    value = ""
  ) => {
    setLabourGrpLoading(true)
    try {
      const response = await fetchLabourJobDetails(
        LGrp_ParentId,
        Criteria,
        field.trim(),
        condition.trim(),
        value.trim()
      )

      console.log("Raw Labour Group API Response:", response)

      if (response && Array.isArray(response)) {
        const formattedData = response.map((item, index) => ({
          id: item.lGrp_Id,
          code: item.lGrp_Code,
          descAr: item.lGrp_DescAr,
          descEn: item.lGrp_DescEn,
          parentId: item.lGrp_ParentId,
          level: item.lGrp_Level,
          index: index + 1,
        }))

        setLabourGrpData(formattedData)
      } else {
        console.error("Unexpected API response format:", response)
        setLabourGrpData([])
      }
    } catch (error) {
      console.error("Error fetching labour group details:", error)
      setLabourGrpData([])
    } finally {
      setLabourGrpLoading(false)
    }
  }

  const GetCardlabourChildGrpJobs = async (
    LGrp_ParentId,
    Criteria,
    field = "",
    condition = "",
    value = ""
  ) => {
    try {
      const response = await fetchLabourJobDetails(
        LGrp_ParentId,
        Criteria,
        field.trim(),
        condition.trim(),
        value.trim()
      )

      console.log("Raw Labour Group API Response:", response)

      if (response && Array.isArray(response) && response.length > 0) {
        const formattedData = response.map((item, index) => ({
          id: item.lGrp_Id,
          code: item.lGrp_Code,
          descAr: item.lGrp_DescAr,
          descEn: item.lGrp_DescEn,
          index: index + 1,
        }))

        setLabourChildGrpData(formattedData)
        setShowChildTable(true) // Show only if there is child data
        return formattedData // Return data to check in handleLabourGrpRowClick
      } else {
        console.warn("No child data found for this parent.")
        setLabourChildGrpData([])
        setShowChildTable(false) // Hide if no child data
        setLabourGrpModalOpen(false) // Close modal if no child data
        return []
      }
    } catch (error) {
      console.error("Error fetching labour group details:", error)
      setLabourChildGrpData([])
      setShowChildTable(false) // Hide in case of an error
      setLabourGrpModalOpen(false) // Close modal on error
      return []
    }
  }

  const GetCardlabourChildDetJobs = async (
    LGrp_ParentId,
    Criteria,
    field = "",
    condition = "",
    value = ""
  ) => {
    try {
      const response = await fetchLabourJobDetails(
        LGrp_ParentId,
        Criteria,
        field.trim(),
        condition.trim(),
        value.trim()
      )

      console.log("Raw Labour Group API Response:", response)

      if (response && Array.isArray(response) && response.length > 0) {
        const formattedData = response.map((item, index) => ({
          id: item.lGrp_Id,
          code: item.lGrp_Code,
          descAr: item.lGrp_DescAr,
          descEn: item.lGrp_DescEn,
          index: index + 1,
        }))

        setChildDetGrpData(formattedData)
        setShowChildDetTable(true) // Show only if there is child data
        return formattedData // Return data to check in handleLabourGrpRowClick
      } else {
        console.warn("No child data found for this parent.")
        setChildDetGrpData([])
        setShowChildDetTable(false) // Hide if no child data
        setLabourGrpModalOpen(false) // Close modal if no child data
        return []
      }
    } catch (error) {
      console.error("Error fetching labour group details:", error)
      setChildDetGrpData([])
      setShowChildDetTable(false) // Hide in case of an error
      setLabourGrpModalOpen(false) // Close modal on error
      return []
    }
  }

  const handleRowClick = customer => {
    console.log("Row Click Data:", customer)

    // Find the matching model from ItemCarDet
    const selectedModel = ItemCarDet.find(
      model => model.model_Id === customer.ModelId
    )

    setFormData(prevData => ({
      ...prevData,
      cardownerid: customer.id,
      plateEn: customer.plateEn,
      plateAr: customer.plateAr,
      nameEn: customer.nameEn,
      nameAr: customer.nameAr,
      ownerEn: customer.ownerEn,
      ownerAr: customer.ownerAr,
      phone: customer.phone,
      caryear: customer.CarYear,
      make_id: customer.MakeId,
      Model_id: customer.ModelId,
      engineType: customer.CarEngine,
      gearType: customer.CarGear,
      vincode: customer.CarVinCode,
    }))

    // Update dropdown and car make field
    if (selectedModel) {
      setSelectedCarModel({
        value: selectedModel.model_Id,
        label: `${selectedModel.model_NameEn} ~ ${selectedModel.model_NameAr}`,
      })

      setCarMake(`${customer.CarMakeEn} ~ ${customer.CarMakeAr}`)
    } else {
      setSelectedCarModel(null)
      setCarMake("")
    }

    setModalOpen(false)
  }

  const handleRowEmpClick = employee => {
    console.log("Row Click Data:", employee)

    setFormData(prevData => ({
      ...prevData, // Retain existing data
      empid: employee.id,
      empcode: employee.code,
      empnameEn: employee.nameEn,
      empnameAr: employee.nameAr,
      createdby: employee.dispNam,
    }))

    setEmpModalOpen(false)
  }

  const GetOtherJobs = async (field = "", condition = "", value = "") => {
    try {
      const response = await fetchLabourOtherJobDetails(
        field.trim(),
        condition.trim(),
        value.trim()
      )

      console.log("Raw Labour Group API Response:", response)

      if (response && Array.isArray(response)) {
        const formattedData = response.map((item, index) => ({
          id: item.lGrp_Id,
          code: item.lGrp_Code,
          descAr: item.lGrp_DescAr,
          descEn: item.lGrp_DescEn,
          parentId: item.lGrp_ParentId,
          level: item.lGrp_Level,
          index: index + 1,
        }))

        setOtherJobData(formattedData)
      } else {
        console.error("Unexpected API response format:", response)
        setOtherJobData([])
      }
    } catch (error) {
      console.error("Error fetching labour group details:", error)
      setOtherJobData([])
    } finally {
    }
  }

  const handleCardRowClick = item => {
    console.log("Clicked Row Data:", item) // Debugging - Check if all fields exist

    GetCardlabourDetails(item.id)

    GetStorePartDtls(item.id, 3)
    GetOldPartsDtls(item.id)

    GetOutsidePartDlts(item.id, 3, 0)

    GetNetAmtDlts(item.id, 3)
    GetCustomerPartDlts(item.id, 0, 0)

    setFormData(prevData => ({
      ...prevData, // Retain existing data
      code: item.code,
      cgen: item.cgen,
      jobordertypeen: item.jobordertypeen,
      jobordertypear: item.jobordertypear,
      joborderid: item.joborderid,
      status: item.status,
      statusid: item.statusid,
      empdid: item.recepid,
      createdby: `${item.recpNameEn}~${item.recepid}`,
      plateEn: item.CarPlateEn,
      plateAr: item.CarPlateAr,
      caryear: item.caryear,
    }))

    setCardModalOpen(false)
  }

  const handleLabourGrpRowClick = async item => {
    setSelectedLabourGrp(item.id) // Set selected row
    setSelectedChildGrp(null) // Reset child selection
    setSelectedChildDetGrp(null) // Reset child detail selection
    console.log("Existing selectedLabourGrp:", selectedLabourGrp)
    console.log("Clicked Row Data:", item) // Debugging - Check if all fields exist

    try {
      const response = await GetCardlabourChildGrpJobs(item.id, 0)
      console.log("response :", response)
      if (!response || response.length === 0) {
        ///
        ;(formData.labourGrpAr = item.descAr),
          (formData.labourGrpEn = item.descEn),
          (formData.labourGrpcode = item.code),
          (formData.labourGrpid = item.id)

        setLabourGrpModalOpen(false) // Close modal if no child data
      }
    } catch (error) {
      console.error("Error fetching child data:", error)
      setShowChildTable(false) // Hide child table in case of an error
      setLabourGrpModalOpen(false) // Close modal on error
    }
  }

  const handleChildDetRowClick = async item => {
    console.log("Clicked Row Data:", item) // Debugging - Check if all fields exist

    try {
      // Update form data correctly using setFormData
      setFormData(prevData => ({
        ...prevData,
        labourGrpAr: item.descAr,
        labourGrpEn: item.descEn,
        labourGrpcode: item.code,
        labourGrpid: item.id,
      }))

      setOtherJobModalOpen(false)
    } catch (error) {
      console.error("Error fetching child data:", error)

      setOtherJobModalOpen(false) // Close modal on error
    }
  }

  const handleChildRowClick = async item => {
    setSelectedChildGrp(item.id) // Set selected row
    setSelectedChildDetGrp(null) // Reset child detail selection

    console.log("Clicked Row Data:", item) // Debugging - Check if all fields exist

    try {
      const response = await GetCardlabourChildDetJobs(item.id, 0)
      console.log("response :", response)
      if (!response || response.length === 0) {
        ///
        ;(formData.labourGrpAr = item.descAr),
          (formData.labourGrpEn = item.descEn),
          (formData.labourGrpcode = item.code),
          (formData.labourGrpid = item.id)

        setLabourGrpModalOpen(false) // Close modal if no child data
      }
    } catch (error) {
      console.error("Error fetching child data:", error)
      setShowChildTable(false) // Hide child table in case of an error
      setLabourGrpModalOpen(false) // Close modal on error
    }
  }
  const maxPagesToShow = 10 // Show only 10 pages at a time
  const totalPages = Math.ceil(TotalCount / pageSize)

  // Ensure startPage is reset properly when clicking next
  const startPage = Math.max(
    1,
    Math.min(
      page - Math.floor(maxPagesToShow / 2),
      totalPages - maxPagesToShow + 1
    )
  )
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  const calculateNetAmount = (price, vatPercentage) => {
    if (!price || !vatPercentage) return "" // Return empty if values are missing

    const vatAmount = (parseFloat(price) * parseFloat(vatPercentage)) / 100
    const netAmount = parseFloat(price) + vatAmount

    setFormData(prev => ({
      ...prev,
      vatAmount: vatAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
    }))
  }

  const handlePageChange = newPage => {
    setPageNumber(newPage) // ✅ Correctly updates the state
    setPage(newPage)

    if (filterValue == "") {
      fetchCardCustomerDtls(newPage)
    } else {
      fetchCardCustomerDtls(newPage, filterField, filterCondition, filterValue)
    }
  }
  const handleCustomerPageChange = newPage => {
    alert(newPage)
    setPageNumber(newPage) // ✅ Correctly updates the state
    setPage(newPage)

    if (empFilterValue == "") {
      fetchCardEmployeeDtls(newPage)
    } else {
      fetchCardEmployeeDtls(
        newPage,
        empFilterField,
        empFilterCondition,
        empFilterValue
      )
    }
  }

  const handleCardPageChange = newPage => {
    setPageNumber(newPage) // ✅ Correctly updates the state
    setPage(newPage)

    if (cardFilterValue == "") {
      fetchCardDtls(1, 3, null, null, newPage)
    } else {
      fetchCardDtls(
        1,
        3,
        null,
        null,
        newPage,
        cardFilterField,
        cardFilterCondition,
        cardFilterValue
      )
    }
  }

  const PaginationChange = page => {
    setCurrent(page) // Update the current page state
    fetchCardCustomerDtls(page, size) // Re-fetch the data
  }

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <button title="Prev">
          <FontAwesomeIcon icon={faAngleLeft} />
          <i className="fa fa-angle-double-left"></i>
        </button>
      )
    }
    if (type === "next") {
      return (
        <button title="Next">
          <FontAwesomeIcon icon={faAngleRight} />
          <i className="fa fa-angle-double-right"></i>
        </button>
      )
    }
    return originalElement
  }

  // Open modal and fetch data
  const handleOpenModal = () => {
    setModalOpen(true)

    // ✅ Reset filters
    setSelectedField("")
    setSelectedCondition("")
    setFilterValue("")
    setPageNumber(1)
    setPage(1) //

    fetchCardCustomerDtls(1) // Fetch fresh data
  }

  const handleEmpOpenModal = () => {
    setEmpModalOpen(true)

    // ✅ Reset filters
    setEmpFilterCondition("")
    setEmpFilterValue("")
    setEmpFilterField("")

    setPageNumber(1)
    setPage(1) //

    fetchCardEmployeeDtls(1) // Fetch fresh data
  }

  const handleCardOpenModal = () => {
    setCardModalOpen(true)

    // ✅ Reset filters

    setCardFilterValue("")

    setPageNumber(1)
    setPage(1) //

    fetchCardDtls(1, 3, null, null, 1) // Fetch fresh data
  }

  const handleModelChange = selected => {
    setSelectedCarModel(selected)

    if (selected) {
      const foundModel = ItemCarDet.find(
        model => model.model_Id === selected.value
      )
      if (foundModel) {
        setCarMake(`${foundModel.make_NameEn} ~ ${foundModel.make_NameAr}`)
        setFormData(prev => ({
          ...prev,
          make_id: foundModel.model_MakeId, // Store the make id
          Model_id: foundModel.model_Id, // Store the model id
        }))
      }
    } else {
      setCarMake("") // Clear if no model is selected
      setFormData(prev => ({
        ...prev,
        make_id: "",
        Model_id: "",
      }))
    }
  }

  const CommonBusL = {
    JobOrderOn: "001",
    JobOrderClosed: "004",
    JobOrderCancelled: "003",
    JobOrderFinished: "004",
    strOpenedCardCode: "003",
    strClosedCardCode: "004",
    strCancelledCardCode: "005",
  }

  const findCGenNewStatus = jobOrderNewStatus => {
    if (jobOrderNewStatus === CommonBusL.JobOrderOn) {
      return CommonBusL.strOpenedCardCode // "003"
    } else if (jobOrderNewStatus === CommonBusL.JobOrderClosed) {
      return CommonBusL.strClosedCardCode // "004"
    } else if (jobOrderNewStatus === CommonBusL.JobOrderCancelled) {
      return CommonBusL.strCancelledCardCode // "005"
    } else if (jobOrderNewStatus === CommonBusL.JobOrderFinished) {
      return CommonBusL.strOpenedCardCode // "003"
    } else {
      return "" // Default empty string if no match
    }
  }

  const handleAddUpdateLabourDetails = async () => {
    try {
      NextLabourDetCode()

      const LBCode = inputValues.LabourDetCode

      const MechGrpid = formData.mechGroupId
      const LabourGrId = formData.labourGrpid
      const Sts1 = formData.labourStatusId
      const Sts2 = formData.status2
      const skill = formData.skillLevel
      const mitcheltime = formData.mitchelTime
      const convTime = formData.convTime

      const qty = formData.qty || 1 // Default to 1 if empty
      const vatPerc = formData.vatPercentage || 15 // Default VAT percentage
      const vatAmt = formData.vatAmount || formData.price * (vatPerc / 100) // Calculate VAT amount if missing
      const rate = formData.price || 100 // Default price if empty

      const payload = {
        lbDet_Id: 0,
        lbDet_Code: LBCode, // Correctly updated value
        lbDet_Date: new Date().toISOString(),
        lbDet_CardId: inputValues.savedcardid,
        lbDet_LGrpId: LabourGrId,
        lbDet_MechGrpId: MechGrpid,
        lbDet_MechId: 290,
        lbDet_Qty: qty,
        lbDet_VATPerc: vatPerc,
        lbDet_VATAmt: vatAmt,
        lbDet_Rate: rate,
        lbDet_LabStatId: Sts1,
        lbDet_LabStatDetId: Sts2,
        lbDet_EndDate: new Date().toISOString(),
        lbDet_WDays: 0,
        lbDet_WHrs: 0,
        lbDet_WMins: 0,
        lbDet_WSecs: 0,
        lbDet_Comm: 0,
        lbDet_MitchelTime: mitcheltime,
        lbDet_SkillLevel: skill,
        lbDet_NormalTime: convTime,
        lbDet_UserId: 169,
        lbDet_BranchId: 3,
        lbDet_IsActive: true,
        lbDet_IsCancelled: false,
      }

      // Save Labour details
      const saveResponse = await SaveLabourdetails(payload)
      console.log("Labour details saved successfully:", saveResponse)
      alert("Labour details saved successfully!")
      NextLabourDetCode()

      // Fetch updated list
      await GetCardlabourDetails(inputValues.savedcardid)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to save labour details: " + error.message)
    }
  }

  const handleSaveCardMain = async () => {
    NextLabourDetCode()
    fetchNxtCGenCode()

    const JOborderStsid = formData.statusid
    const CardTypeId = formData.joborderid
    const RecepId = formData.empid
    const Card_Cownerid = formData.cardownerid
    const Makeid = formData.make_id
    const Modelid = formData.Model_id
    const Vincode = formData.vincode
    const kilometer = formData.kilometers
    const enginetype = formData.engineType
    const GearType = formData.gearType
    const CarplateAr = formData.plateAr
    const CarplateEn = formData.plateEn
    const Cgenid = inputValues.cgenid
    const CardCode = inputValues.code

    const payload = {
      Card_Id: 0, // New record
      Card_Code: CardCode, // using your labour detail code
      Card_CGenId: Cgenid, // Set accordingly (or generated value)
      Card_CrdTypeId: CardTypeId,
      Card_OpenDate: new Date().toISOString(), // Use current date/time or input value
      Card_CloseDate: new Date().toISOString(), // Use current date/time or input value
      Card_RecpId: RecepId,
      Card_COwnerId: Card_Cownerid,
      Card_MakeId: Makeid, // Replace with actual make id
      Card_ModelId: Modelid, // Replace with actual model id
      Card_CarYear: "2001", // e.g., "2025"
      Card_CarPlateAr: CarplateAr || "",
      Card_CarPlateEn: CarplateEn || "",
      Card_VinCode: Vincode || "",
      Card_Kilometer: kilometer || "",
      Card_Engine: enginetype || "",
      Card_Gear: GearType || "",
      Card_deposit: parseFloat(inputValues.deposit || 0),
      Card_description: inputValues.description || "",
      Card_StatId: 1, // status 1 from your selection
      Card_UserId: 169, // or use inputValues.userId if dynamic
      Card_BranchId: 3, // or use inputValues.branchId if dynamic
      Card_DemurrageAmt: parseFloat(inputValues.demurrageAmt || 0),
      Card_LabourDiscAmt: parseFloat(inputValues.labourDiscAmt || 0),
      Card_LabourVatAmt: 15, // Fixed value as per your payload
      Card_LabourNet: parseFloat(inputValues.labourNet || 0),
      Card_OldPartNet: parseFloat(inputValues.oldPartNet || 0),
      Card_CustPartNet: parseFloat(inputValues.custPartNet || 0),
      Card_StorePartNet: parseFloat(inputValues.storePartNet || 0),
      Card_OutSidePartNet: parseFloat(inputValues.outSidePartNet || 0),
      Card_DosNet: parseFloat(inputValues.dosNet || 0),
      Card_PaymentMode: parseInt(inputValues.paymentMode, 10) || 0,
      Card_SpanAmt: parseFloat(inputValues.spanAmt || 0),
      Card_CashAmt: parseFloat(inputValues.cashAmt || 0),
      Card_AuthentCode: inputValues.authCode || "",
      Card_SpanNumber: inputValues.spanNumber || "",
      Card_NewModelName: inputValues.newModelName || "",
      Card_NewMakeName: inputValues.newMakeName || "",
      Card_QtNo: inputValues.qtNo || 0,
      Card_SpanType: inputValues.spanType || "",
      Card_SpanCommPerc: parseFloat(inputValues.spanCommPerc || 0),
      Card_SpanCommAmt: parseFloat(inputValues.spanCommAmt || 0),
      Card_SpanName: inputValues.spanName || "",
      Card_PayType: inputValues.payType || "",
      Card_WarrantyPeriod: inputValues.warrantyPeriod || "",
      Card_InsuranceType: inputValues.insuranceType || "",
      Card_InsuranceExpDate: inputValues.insuranceExpDate || "",
      Card_PrintCount: parseInt(inputValues.printCount, 10) || 0,
      Card_CarColour: inputValues.carColour || "",
      Card_CustRefNo: inputValues.custRefNo || "",
    }

    try {
      const response = await SaveCardMain(payload)
      console.log("Labour details saved successfully:", response)
      Swal.fire("Labour details saved successfully!")

      GetSavedCardId(CardCode, 3)
      updateCGenStatus(Cgenid, JOborderStsid)
    } catch (error) {
      console.error("Error:", error.message)
      Swal.fire("Failed to save labour details: " + error.message)
    }
  }

  const handleSaveOldPart = async () => {
    let isOldPartAddNew = formData.OldPartId === null //

    alert(isOldPartAddNew)
    if (!validateOldPartEntry(isOldPartAddNew)) {
      return
    }
    try {
      // Ensure new part code is fetched before proceeding
      await fetchNextOldPartCode()

      // Calculate amounts
      const price = parseFloat(formData.OldPartPrice) || 0
      const qty = parseFloat(formData.OldPartQty) || 1
      const vatPercentage = parseFloat(formData.OldPartVatPercentage) || 0
      const vatAmount = (price * qty * (vatPercentage / 100)).toFixed(2)
      const netAmount = (price * qty + parseFloat(vatAmount)).toFixed(2)

      // Prepare payload
      const payload = {
        cOld_Id: 0,
        cOld_Code: inputValues.OldpartCode || "", // Ensure it exists
        cOld_Type: 1,
        cOld_CardId: inputValues.savedcardid || null, // Prevent undefined issues
        cOld_PartNo: formData.OldPartNumber || null,
        cOld_PartNameAr: formData.OldPartNameAr || "",
        cOld_PartNameEn: formData.OldPartNameEn || "",
        cOld_Qty: qty,
        cOld_Rate: price,
        cOld_Date: new Date().toISOString(), // Store as ISO string
        cOld_IsReturned: false,
        cOld_ReturnDate: new Date().toISOString(),
        cOld_UserId: 169,
        cOld_BranchId: 3,
        cOld_OEM: "",
        cOld_VatPer: vatPercentage,
        cOld_VatAmt: vatAmount,
        cOld_NetAmt: netAmount, // ✅ Added net amount
      }

      // Save the data
      const response = await SaveOldPart(payload)
      console.log("Old part details saved successfully:", response)

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Old part details saved successfully!",
      })

      GetOldPartsDtls(inputValues.savedcardid)
      await fetchNextOldPartCode()
    } catch (error) {
      console.error("Error:", error.message)
      await fetchNextOldPartCode()

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          "Failed to save old part details: " +
          (error.message || "Unknown error"),
      })
    }
  }

  const validateOldPartEntry = isOldPartAddNew => {
    alert(5)

    // Check if Job Order ID is empty or zero
    if (!inputValues.savedcardid || inputValues.savedcardid === "0") {
      Swal.fire("Validation Error", "Job Order ID is required.", "error")
      return false
    }

    // Ensure part names are not empty
    if (!formData.OldPartNameEn?.trim() || !formData.OldPartNameAr?.trim()) {
      Swal.fire(
        "Validation Error",
        "Old part name (both English and Arabic) is required.",
        "error"
      )
      return false
    }
    alert(10)

    return true // ✅ Return true when all validations pass
  }

  // Validate Job Order Status

  const handleSaveCustPart = async () => {
    try {
      // Ensure the new part code is fetched once before proceeding
      await fetchNextCustPartCode()

      // Prepare payload using formData
      const payload = {
        cPart_Id: 0,
        cPart_Code: inputValues.CustpartCode, // Use the fetched next part code
        cPart_Type: 1, // Adjust if you need a specific type
        cPart_CardId: inputValues.savedcardid || 0, // Use formData for saved card ID
        cPart_PartNo: "", // Use formData for part number
        cPart_PartNameAr: formData.CustPartNameAr || "", // Use formData for part name (Arabic)
        cPart_PartNameEn: formData.CustPartNameEn || "", // Use formData for part name (English)
        cPart_Qty: formData.CustPartQty || 0, // Use formData for quantity
        cPart_Rate: formData.CustPartPrice || 0, // Use formData for rate (price)
        cPart_Date: new Date(), // Use current timestamp
        cPart_IsReturned: false, // Check if part is returned
        cPart_ReturnDate: new Date(),

        cPart_UserId: 169,
        cPart_BranchId: 3,
        cPart_OEM: formData.CustPartPartNo || "", // Adjust as per OEM if applicable
      }

      // Save the data
      const response = await SaveCustPart(payload)
      console.log("Cust part details saved successfully:", response)

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Cust part details saved successfully!",
      })

      // Refresh old part details and fetch the next part code
      GetCustomerPartDlts(inputValues.savedcardid, 0, 0)
    } catch (error) {
      console.error("Error:", error)

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to save old part details: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`,
      })
    }
  }

  const UpdateLBCommission = async savedCardId => {
    if (!savedCardId) {
      console.error("Error: savedcardid is not available.")
      return
    }

    const payload = {
      JobOrderId: savedCardId,
      CommissionPerc: 5,
    }

    try {
      const response = await UpdateLabourCommission(payload)
      console.log("Update Commission saved successfully:", response)
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  const handleLabourGrpOpenModal = () => {
    setLabourGrpModalOpen(true)

    // ✅ Reset filters

    setJobGrpFilterValue("")

    GetCardlabourGrpJobs(0, 0)
  }

  const handleOtherJobOpenModal = () => {
    setOtherJobModalOpen(true)

    // ✅ Reset filters

    GetOtherJobs()
  }

  const GetSavedCardId = async (CardCode, BranchId) => {
    try {
      const data = await fetchSavedCardId(CardCode, BranchId)

      // Ensure that the API response is valid
      if (!data || !data.savedCardId) {
        console.error("Error: savedCardId is not available.")
        Swal.fire("Error", "Failed to fetch the next code.", "error")
        return
      }

      const savedCardId = data.savedCardId // Extract the savedCardId

      // Set the state and immediately use the updated value
      setInputValues(prev => {
        const updatedValues = { ...prev, savedcardid: savedCardId }

        // Call UpdateLBCommission after the state is updated
        UpdateLBCommission(savedCardId)

        return updatedValues
      })
    } catch (error) {
      console.error("Error fetching savedCardId:", error)
      Swal.fire("Error", "Failed to fetch the next code.", "error")
    }
  }

  const GetOldPartsDtls = async (
    cardId,
    isReturned = null,
    oldPartId = null
  ) => {
    try {
      const criteria = 1 // Always pass criteria as 1

      alert(cardId)

      if (!cardId) {
        console.error("Missing cardId for fetching old parts details.")
        return
      }

      // Call API with correct parameters
      const response = await fetchOldParts(
        criteria,
        cardId,
        isReturned,
        oldPartId
      )

      console.log("Raw API Response:", response)

      // Validate response format
      if (!Array.isArray(response)) {
        console.error("API response format is incorrect:", response)
        return
      }

      // Format data

      const formattedData = response.map(item => ({
        oldPartId: item.cOld_Id, // Unique ID for the old part
        oldCode: item.cOld_Code, // Old Part Code
        oldType: item.cOld_Type, // Type of old part
        oldCardId: item.cOld_CardId, // Associated Job Card ID
        oldPartNo: item.cOld_PartNo, // Part Number
        oldPartNameAr: item.cOld_PartNameAr, // Part Name (Arabic)
        oldPartNameEn: item.cOld_PartNameEn, // Part Name (English)
        oldQty: item.cOld_Qty, // Quantity of the part
        oldRate: item.cOld_Rate, // Rate per unit
        oldDate: item.cOld_Date, // Date of transaction
        oldIsReturned: item.cOld_IsReturned, // Return Status (1 = Yes, 0 = No)
        oldReturnDate: item.cOld_ReturnDate, // Date of return (if applicable)
        oldUserId: item.cOld_UserId, // User ID who handled the transaction
        oldBranchId: item.cOld_BranchId, // Branch ID
        oldOEM: item.cOld_OEM, // OEM info (if available)
        oldVatPer: item.cOld_VatPer, // VAT Percentage
        oldVatAmount: item.cOld_VatAmt, // VAT Amount
        oldNetAmount: item.cOldNetAmt, // Total Net Amount (including VAT)
      }))

      setOldPartsDetails(formattedData) // ✅ Update state with formatted data
    } catch (error) {
      console.error("Error fetching old parts details:", error)
    }
  }

  const GetStorePartDtls = async (SaJobcardid, SaBrId) => {
    try {
      // Call API with correct parameters
      const response = await fetchStoreParts(SaJobcardid, SaBrId)

      console.log("Raw API Response:", response)

      // Validate response format
      if (!Array.isArray(response)) {
        console.error("API response format is incorrect:", response)
        return
      }

      // Format data
      const formattedData = response.map(item => ({
        OldPartItemId: item.itemN_Id,
        OldPartItemCode: item.item_Code,
        OldPartItemNameEn: item.itemN_NameEn,
        OldPartItemNameAr: item.itemN_NameAr,
        OldPartOem: item.oem_Number,
        OldPartNetSales: item.netSales,
        OldPartPrice: item.sadet_Price,
        OldPartVatAmt: item.sadet_VATAMT,
        OldPartNetSalesPrice: item.netSalesPrice,
      }))

      SetStorePartDetails(formattedData) // ✅ Update state with formatted data
    } catch (error) {
      console.error("Error fetching old parts details:", error)
    }
  }

  const GetOutsidePartDlts = async (Card_Id, Br_Id, IsReturned) => {
    try {
      // Call API with correct parameters
      const response = await fetchOutsideParts(Card_Id, Br_Id, IsReturned)

      console.log("Raw API Response:", response)

      // Validate response format
      if (!Array.isArray(response)) {
        console.error("API response format is incorrect:", response)
        return
      }

      // Format data
      const formattedData = response.map(item => ({
        OutsidePartId: item.wsDet_Id,
        OutsideSalesId: item.wsDet_WSalesId,
        OutsideItemCode: item.wsDet_ItemCode,
        OutsidePartCode: item.wsDet_PartCode,
        OutsidePartNameAr: item.wsDet_PartNameAr,
        OutsidePartNameEn: item.wsDet_PartNameEn,
        OutsidePartQty: item.wsDet_Qty,
        OutsidePartPrice: item.wsDet_Price,
        OutsidePartDiscPer: item.wsDet_DiscPerc,
        OutsidePartDiscAmt: item.wsDet_DiscAmt,
        OutsidePartBonusQty: item.wsDet_BonusQty,
        OutsidePartAllowDisc: item.wsDet_AllowDisc,
        OutsidePartIsReturned: item.wsDet_IsReturned,
        OutsidePartCostPrice: item.wsDet_CostPrice,
        OutsidePartMechId: item.wsDet_MechId,
        OutsidePartMechGrpId: item.wsDet_MechGrpId,
        OutsidePartVATPerc: item.wsDet_VATPerc,
        OutsidePartVATAmt: item.wsDet_VATAmt,
        OutsidePartTotal: item.osPartTotal,
        OutsideSalesCode: item.wSales_Code,
      }))

      SetOutsidePartDetails(formattedData) // ✅ Update state with formatted data
    } catch (error) {
      console.error("Error fetching old parts details:", error)
    }
  }

  const GetCustomerPartDlts = async (
    CPart_CardId,
    CPart_IsReturned,
    criteria
  ) => {
    try {
      // Call API with correct parameters
      const response = await fetchCustParts(
        CPart_CardId,
        CPart_IsReturned,
        criteria
      )

      console.log("Raw API Response:", response)

      // Validate response format
      if (!Array.isArray(response)) {
        console.error("API response format is incorrect:", response)
        return
      }

      // Format data
      const formattedData = response.map(item => ({
        CustPartId: item.cPart_Id,
        CustPartCode: item.cPart_Code,
        CustPartType: item.cPart_Type,
        CustPartDate: item.cPart_Date,
        CustPartCardId: item.cPart_CardId,
        CustPartPartNo: item.cPart_PartNo,
        CustPartPartNameEn: item.cPart_PartNameEn,
        CustPartPartNameAr: item.cPart_PartNameAr,
        CustPartQty: item.cPart_Qty,
        CustPartRate: item.cPart_Rate,
        CustPartIsReturned: item.cPart_IsReturned,
        CustPartReturnDate: item.cPart_ReturnDate,
        CustPartUserId: item.cPart_UserId,
        CustPartBranchId: item.cPart_BranchId,
        CustPartOEM: item.cPart_OEM,
        CustPartNetAmt: item.cCustPartNetAmt,
      }))

      SetCusPartDetails(formattedData) // ✅ Update state with formatted data
    } catch (error) {
      console.error("Error fetching old parts details:", error)
    }
  }

  const GetNetAmtDlts = async (Card_Id, Br_Id) => {
    try {
      const response = await fetchJobNetAmts(Card_Id, Br_Id)

      console.log("Raw API Response:", response)

      if (!Array.isArray(response)) {
        console.error("API response format is incorrect:", response)
        return
      }

      const formattedData = response.map(item => ({
        SummaryLabourCharge: parseFloat(item.card_LabourNet || 0).toFixed(2),
        SummaryLabourNet: parseFloat(item.card_LabourNet || 0).toFixed(2),
        SummaryLabourVatNetAmt: parseFloat(
          item.card_LabourVATAmtNet || 0
        ).toFixed(2),
        SummaryOldPartNet: parseFloat(item.card_OldPartNet || 0).toFixed(2),
        SummaryCustPartNet: parseFloat(item.card_CustPartNet || 0).toFixed(2),
        SummaryStorePartNet: parseFloat(item.card_StorePartNet || 0).toFixed(2),
        SummaryOutSidePartNet: parseFloat(
          item.card_OutSidePartNet || 0
        ).toFixed(2),
        SummaryDepositNet: parseFloat(item.card_DepositNet || 0).toFixed(2),
        SummaryDosNet: parseFloat(item.card_DosNet || 0).toFixed(2),
        SummaryOldPartVatAmt: parseFloat(item.card_OldPartVatAmt || 0).toFixed(
          2
        ),
        SummaryGrossAmount: parseFloat(item.card_DepositNet || 0).toFixed(2), // Gross Amount = Deposit
        SummaryNetAmount: parseFloat(0).toFixed(2), // Net Amount = 0
      }))

      SetNetAmtDetails(formattedData)

      if (formattedData.length > 0) {
        const netAmounts = formattedData[0]

        setFormData(prev => ({
          ...prev,
          SummaryLabourCharge: netAmounts.SummaryLabourNet,
          SummaryLabourNet: netAmounts.SummaryLabourNet,
          SummaryLabourVatNetAmt: netAmounts.SummaryLabourVatNetAmt,
          SummaryOldPartNet: netAmounts.SummaryOldPartNet,
          SummaryCustPartNet: netAmounts.SummaryCustPartNet,
          SummaryStorePartNet: netAmounts.SummaryStorePartNet,
          SummaryOutSidePartNet: netAmounts.SummaryOutSidePartNet,
          SummaryDepositNet: netAmounts.SummaryDepositNet,
          SummaryDosNet: netAmounts.SummaryDosNet,
          SummaryOldPartVatAmt: netAmounts.SummaryOldPartVatAmt,
          SummaryGrossAmount: netAmounts.SummaryGrossAmount,
          SummaryNetAmount: netAmounts.SummaryNetAmount,
        }))
      }
    } catch (error) {
      console.error("Error fetching job order net amounts:", error)
    }
  }

  const fetchNxtOldPartCode = async () => {
    try {
      const data = await fetchNextOldPartCode()
      setInputValues(prev => ({ ...prev, OldpartCode: data.nxtOldPartCode }))
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error")
    }
  }

  const fetchNxtCustPartCode = async () => {
    try {
      const data = await fetchNextCustPartCode()
      setInputValues(prev => ({ ...prev, CustpartCode: data.nxtCustCode }))
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error")
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Add Card" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Add Card Details</h4>

                  {/* Input Fields at the Top */}
                  <Form>
                    <Row>
                      {/* Non-editable fields with color variation */}
                      <Col lg="3">
                        <FormGroup>
                          <Label for="cardNumber">Card Number</Label>
                          <Input
                            type="text"
                            id="cardNumber"
                            value={formData?.cgen || inputValues.cgencode}
                            onChange={handleInputChange}
                            readOnly
                            className="form-control-plaintext bg-light text-dark" // Light background with dark text
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="3">
                        <FormGroup>
                          <Label for="jobOrderNo">Job Order No</Label>
                          <InputGroup>
                            <Input
                              type="text"
                              id="jobOrderNo"
                              value={formData?.code || inputValues.code}
                              onChange={handleInputChange}
                            />
                            <Button
                              color="primary"
                              onClick={handleCardOpenModal}
                            >
                              <FaSearch />
                            </Button>
                          </InputGroup>
                        </FormGroup>
                      </Col>

                      {/* Editable fields */}
                      <Col lg="3">
                        <FormGroup>
                          <Label for="type">Type</Label>
                          <Select
                            id="type"
                            options={JobOrdrTypes.map(order => ({
                              value: order.jOrderType_Id,
                              label: `${order.dispName}`,
                            }))}
                            value={
                              formData.joborderid
                                ? {
                                    value: formData.joborderid,
                                    label: `${formData.jobordertypeen} ~ ${formData.jobordertypear}`,
                                  }
                                : null
                            }
                            onChange={selectedOption => {
                              if (selectedOption) {
                                setFormData(prev => ({
                                  ...prev,
                                  joborderid: selectedOption.value,
                                  jobordertypeen:
                                    selectedOption.label.split(" ~ ")[0], // Extract English type
                                  jobordertypear:
                                    selectedOption.label.split(" ~ ")[1], // Extract Arabic type
                                }))
                              } else {
                                // If cleared, reset the values
                                setFormData(prev => ({
                                  ...prev,
                                  joborderid: "",
                                  jobordertypeen: "",
                                  jobordertypear: "",
                                }))
                              }
                            }}
                            isClearable
                            placeholder="Select Type"
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="3">
                        <FormGroup>
                          <Label for="invoiceType">Invoice Type</Label>
                          <Input type="select" id="invoiceType">
                            <option value="">Select Invoice Type</option>
                            <option value="1">1. CASH - نقدي</option>
                            <option value="2">2. CREDIT - اجل</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Modal
                      isOpen={cardModalOpen}
                      toggle={() => setCardModalOpen(!cardModalOpen)}
                      size="lg"
                    >
                      <ModalHeader
                        toggle={() => setCardModalOpen(!cardModalOpen)}
                      >
                        Card Details
                      </ModalHeader>
                      <ModalBody
                        style={{ maxHeight: "80vh", overflow: "hidden" }}
                      >
                        {/* Filter Section */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                          {/* Filter Field Dropdown */}
                          <Input
                            type="select"
                            value={cardFilterField}
                            onChange={e => setCardFilterField(e.target.value)}
                            style={{ flex: 2 }}
                          >
                            <option value="CardId">Card Id</option>
                            <option value="CardCode">Card Code</option>
                          </Input>

                          {/* Filter Condition Dropdown */}
                          <Input
                            type="select"
                            value={cardFilterCondition}
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
                            value={cardFilterValue}
                            onChange={e => {
                              const value = e.target.value
                              setCardFilterValue(value)

                              fetchCardDtls(
                                1,
                                3,
                                null,
                                null,
                                1,
                                cardFilterField,
                                cardFilterCondition,
                                value
                              )
                            }}
                            style={{ flex: 3 }}
                          />
                        </div>

                        {/* Scrollable Table */}
                        {CardLoading ? (
                          <p>Loading...</p>
                        ) : (
                          <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                            <Table bordered responsive>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Job Order No</th>
                                  <th>Card No</th>
                                  <th>Opened On</th>
                                  <th>Status</th>
                                  <th>Recep Code</th>
                                  <th>Branch Name</th>
                                  <th>Car Make</th>
                                  <th>Car Model</th>
                                  <th>Car Colour</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cardData.length > 0 ? (
                                  cardData.map((item, index) => (
                                    <tr
                                      key={item.card_id}
                                      onClick={() => handleCardRowClick(item)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <td>
                                        {(CardPage - 1) * pageSize + index + 1}
                                      </td>
                                      <td>{item.code}</td>
                                      <td>{item.cgenNo}</td>
                                      <td>{item.openedon}</td>
                                      <td>{item.status}</td>
                                      <td>{item.recepcode}</td>
                                      <td>{item.branchName}</td>
                                      <td>{item.CarMake}</td>
                                      <td>{item.CarModel}</td>
                                      <td>{item.CarColour}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="11" className="text-center">
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
                            {Math.min(page * pageSize, CardTotalCount)} of{" "}
                            {CardTotalCount}
                          </div>
                          <Pagination
                            className="pagination-data"
                            current={page}
                            total={CardTotalCount}
                            pageSize={pageSize}
                            showSizeChanger={false}
                            onChange={handleCardPageChange}
                            showTitle={false}
                          />
                        </div>
                      </ModalBody>
                    </Modal>

                    <Row>
                      {/* Status Dropdown */}
                      <Col lg="3">
                        <FormGroup>
                          <Label for="type">Status</Label>
                          <Select
                            id="type"
                            options={JobOrdrStatus.map(status => ({
                              value: status.jOrder_StatId,
                              label: status.dispName,
                            }))}
                            value={
                              formData.statusid
                                ? {
                                    value: formData.statusid,
                                    label: `${formData.status} `,
                                  }
                                : null
                            }
                            onChange={selectedOption => {
                              if (selectedOption) {
                                setFormData(prev => ({
                                  ...prev,
                                  statusid: selectedOption.value,
                                  status: selectedOption.label,
                                }))
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  statusid: "",
                                  status: "",
                                }))
                              }
                            }}
                            isClearable
                            placeholder="Select Status"
                          />
                        </FormGroup>
                      </Col>

                      {/* Reference (Text Field) */}
                      <Col lg="3">
                        <FormGroup>
                          <Label for="reference">Reference</Label>
                          <Input
                            type="text"
                            id="reference"
                            placeholder="Enter Reference"
                          />
                        </FormGroup>
                      </Col>

                      {/* Created By Dropdown */}

                      <Col lg="3">
                        <FormGroup>
                          <Label for="createdBy">Created By (EN)</Label>
                          <div className="d-flex align-items-center">
                            <Input
                              type="text"
                              id="createdBy"
                              value={formData.createdby || ""} // ✅ Display createdby (label)
                              data-value={formData.empid || ""} // ✅ Store empid as data-value
                              readOnly // Prevent manual input
                            />
                            <Button
                              color="primary"
                              className="ms-2"
                              onClick={handleEmpOpenModal}
                            >
                              <FaSearch />
                            </Button>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Modal
                      isOpen={empModalOpen}
                      toggle={() => setEmpModalOpen(!empModalOpen)}
                      size="lg"
                    >
                      <ModalHeader
                        toggle={() => setEmpModalOpen(!empModalOpen)}
                      >
                        Employee Details
                      </ModalHeader>
                      <ModalBody
                        style={{ maxHeight: "80vh", overflow: "hidden" }}
                      >
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <Input
                            type="select"
                            value={empFilterField}
                            onChange={e => setEmpFilterField(e.target.value)}
                            style={{ flex: 2 }}
                          >
                            <option value="Emp_Code">Employee Code</option>
                            <option value="Emp_NameEn">
                              Employee Name (EN)
                            </option>
                          </Input>

                          <Input
                            type="select"
                            value={empFilterCondition}
                            onChange={e =>
                              setEmpFilterCondition(e.target.value)
                            }
                            style={{ flex: 2 }}
                          >
                            <option value="contains">Contains</option>
                            <option value="equals">Equals</option>
                          </Input>

                          <Input
                            type="text"
                            placeholder="Enter search value"
                            value={empFilterValue}
                            onChange={e => {
                              const value = e.target.value
                              setEmpFilterValue(value)
                              if (value.length >= 3) {
                                fetchCardEmployeeDtls(
                                  1,
                                  empFilterField,
                                  empFilterCondition,
                                  value
                                )
                              }
                            }}
                            style={{ flex: 3 }}
                          />
                        </div>

                        {empLoading ? (
                          <p>Loading...</p>
                        ) : (
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
                                  <th>Employee Active </th>
                                  <th>Employee Is Active User </th>
                                </tr>
                              </thead>
                              <tbody>
                                {empData.length > 0 ? (
                                  empData.map((item, index) => (
                                    <tr
                                      key={item.id}
                                      onClick={() => handleRowEmpClick(item)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <td>{(empPage - 1) * 10 + index + 1}</td>
                                      <td>{item.code}</td>
                                      <td>{item.mainCode}</td>
                                      <td>{item.nameEn}</td>
                                      <td>{item.nameAr}</td>
                                      <td>{item.designationEn}</td>
                                      <td>{item.designationAr}</td>
                                      <td>{item.isActive ? "Yes" : "No"}</td>
                                      <td>
                                        {item.isActiveUser ? "Yes" : "No"}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="3" className="text-center">
                                      No data found
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        )}

                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <div className="text-muted">
                            Showing {(page - 1) * pageSize + 1} to{" "}
                            {Math.min(page * pageSize, empTotalCount)} of{" "}
                            {empTotalCount}
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
                      </ModalBody>
                    </Modal>
                  </Form>

                  {/* Main Tabs */}
                  <ul className="nav nav-tabs mt-4">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 1 })}
                        onClick={() => setactiveTab(1)}
                      >
                        Seller Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 2 })}
                        onClick={() => setactiveTab(2)}
                      >
                        Company Details
                      </NavLink>
                    </NavItem>
                  </ul>

                  <TabContent activeTab={activeTab} className="mt-3">
                    {/* Seller Details Tab */}
                    <TabPane tabId={1}>
                      <Form>
                        <Row>
                          {/* Plate No Dropdown with Search Icon */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="plateNo">Plate No (EN)</Label>
                              <div className="d-flex align-items-center">
                                <Input
                                  type="text"
                                  id="plateNo"
                                  value={formData?.plateEn || ""}
                                  onChange={handleInputChange} // ✅ Editable
                                />
                                <Button
                                  color="primary"
                                  className="ms-2"
                                  onClick={handleOpenModal}
                                >
                                  <FaSearch />
                                </Button>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <Label for="nameEn">Name Plate Ar</Label>
                              <Input
                                type="text"
                                id="nameEn"
                                value={formData?.plateAr || ""}
                                onChange={handleInputChange} // ✅ Editable
                                placeholder="Enter Name Plate Ar"
                              />
                            </FormGroup>
                          </Col>

                          {/* Name EN (English Name) */}
                          {/* Name EN (English Name) */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="nameEn">Name (EN)</Label>
                              <Input
                                type="text"
                                id="nameEn"
                                value={formData?.nameEn || ""}
                                placeholder="Enter Name in English"
                                readOnly
                              />
                            </FormGroup>
                          </Col>

                          {/* Name AR (Arabic Name) */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="nameAr">Name (AR)</Label>
                              <Input
                                type="text"
                                id="nameAr"
                                value={formData?.nameAr || ""}
                                placeholder="أدخل الاسم بالعربية"
                                dir="rtl"
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        {/* Modal for Selecting Plate Details */}
                        <Modal
                          isOpen={modalOpen}
                          toggle={() => setModalOpen(!modalOpen)}
                          size="lg"
                        >
                          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                            Customer Details
                          </ModalHeader>
                          <ModalBody
                            style={{ maxHeight: "80vh", overflow: "hidden" }}
                          >
                            {/* Filter Section */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                              {/* Filter Field Dropdown */}
                              <Input
                                type="select"
                                value={filterField}
                                onChange={e => setFilterField(e.target.value)}
                                style={{ flex: 2 }}
                              >
                                <option value="CarPlateEn">
                                  Car Plate (EN)
                                </option>
                                <option value="CarPlateAr">
                                  Car Plate (AR)
                                </option>
                                <option value="OwnerNameEn">
                                  Owner Name (EN)
                                </option>
                                <option value="OwnerNameAr">
                                  Owner Name (AR)
                                </option>
                                <option value="OwnerContactNo">
                                  Owner Contact No
                                </option>
                                <option value="MakeNameEn">
                                  Make Name (EN)
                                </option>
                                <option value="MakeNameAr">
                                  Make Name (AR)
                                </option>
                                <option value="ModelNameEn">
                                  Model Name (EN)
                                </option>
                                <option value="ModelNameAr">
                                  Model Name (AR)
                                </option>
                              </Input>

                              {/* Filter Condition Dropdown */}
                              <Input
                                type="select"
                                value={filterCondition}
                                onChange={e =>
                                  setFilterCondition(e.target.value)
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
                                value={filterValue}
                                onChange={e => {
                                  const value = e.target.value
                                  setFilterValue(value)
                                  if (value.length >= 3) {
                                    fetchCardCustomerDtls(
                                      1,
                                      filterField,
                                      filterCondition,
                                      value
                                    )
                                  }
                                }}
                                style={{ flex: 3 }}
                              />
                            </div>

                            {/* Scrollable Table */}
                            {loading ? (
                              <p>Loading...</p>
                            ) : (
                              <div
                                style={{ maxHeight: "50vh", overflowY: "auto" }}
                              >
                                <Table bordered responsive>
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Owner Code</th>
                                      <th>Name (EN)</th>
                                      <th>Name (AR)</th>
                                      <th>Contact No</th>
                                      <th>Plate No (EN)</th>
                                      <th>Plate No (AR)</th>
                                      <th>Car Make</th>
                                      <th>Car Model</th>
                                      <th>Owner Name (EN)</th>
                                      <th>Owner Name (AR)</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.length > 0 ? (
                                      data.map((item, index) => (
                                        <tr
                                          key={item.cOwner_Id}
                                          onClick={() => handleRowClick(item)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <td>
                                            {(page - 1) * pageSize + index + 1}
                                          </td>
                                          <td>{item.code}</td>
                                          <td>{item.nameEn}</td>
                                          <td>{item.nameAr}</td>
                                          <td>{item.phone}</td>
                                          <td>{item.plateEn}</td>
                                          <td>{item.plateAr}</td>
                                          <td>{item.CarMakeEn}</td>
                                          <td>{item.ModelEn}</td>
                                          <td>{item.ownerEn}</td>
                                          <td>{item.ownerAr}</td>
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
                                {Math.min(page * pageSize, TotalCount)} of{" "}
                                {TotalCount}
                              </div>
                              <Pagination
                                className="pagination-data"
                                current={page}
                                total={TotalCount}
                                pageSize={pageSize}
                                showSizeChanger={false}
                                onChange={handlePageChange}
                                showTitle={false}
                              />
                            </div>
                          </ModalBody>
                        </Modal>

                        <Row>
                          {/* Address) */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="address">Address</Label>
                              <Input
                                type="text"
                                id="address"
                                placeholder="Enter Address"
                              />
                            </FormGroup>
                          </Col>
                          {/* Phone Number (Numeric Only) */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="contactNo">Contact No</Label>
                              <Input
                                type="text"
                                id="contactNo"
                                value={formData?.phone || ""}
                                placeholder="Enter Contact Number"
                                readOnly
                              />
                            </FormGroup>
                          </Col>

                          {/* Quotation Number Dropdown */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="quotationNumber">
                                Quotation Number
                              </Label>
                              <Input type="select" id="quotationNumber">
                                <option value="">
                                  Select Quotation Number
                                </option>
                                <option value="quote1">Quotation 1</option>
                                <option value="quote2">Quotation 2</option>
                                <option value="quote3">Quotation 3</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          {/* Notes (Text Area) */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="notes">Notes</Label>
                              <Input
                                type="textarea"
                                id="notes"
                                placeholder="Enter Notes"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          {/* Owner Name (English) */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="ownerNameEn">Owner Name (EN)</Label>
                              <Input
                                type="text"
                                id="ownerNameEn"
                                value={formData?.ownerEn || ""}
                                placeholder="Enter Owner Name (English)"
                              />
                            </FormGroup>
                          </Col>

                          {/* Owner Name (Arabic) */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="ownerNameAr">Owner Name (AR)</Label>
                              <Input
                                type="text"
                                id="ownerNameAr"
                                value={formData?.ownerAr || ""}
                                placeholder="أدخل اسم المالك"
                                dir="rtl"
                              />
                            </FormGroup>
                          </Col>

                          {/* Insurance Type Dropdown */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="insuranceType">Insurance Type</Label>
                              <Input type="select" id="insuranceType">
                                <option value="">Select Insurance Type</option>
                                <option value="comprehensive">
                                  Comprehensive
                                </option>
                                <option value="thirdParty">Third Party</option>
                              </Input>
                            </FormGroup>
                          </Col>

                          {/* Date of Expiry of Insurance */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="expiryDate">
                                Expiry Date of Insurance
                              </Label>
                              <Input type="date" id="expiryDate" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          {/* Item Model Dropdown */}
                          <Col lg="3">
                            <div className="mb-3">
                              <Label for="basicpill-group-input">
                                Item Model
                              </Label>
                              <div className="flex-grid-container">
                                <Select
                                  id="basicpill-group-input"
                                  options={ItemCarDet.map(model => ({
                                    value: model.model_Id,
                                    label: `${model.model_NameEn} ~ ${model.model_NameAr}`,
                                  }))}
                                  value={selectedCarModel} // Controlled value from state
                                  placeholder="Select Item Model"
                                  classNamePrefix="select2-selection"
                                  isClearable={true}
                                  onChange={handleModelChange}
                                />
                              </div>
                            </div>
                          </Col>

                          {/* Car Make - Auto-populated based on Car Model */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="carMake">Car Make</Label>
                              <Input
                                type="text"
                                id="carMake"
                                value={carMake} // Auto-populated
                                readOnly
                                placeholder="Auto-filled based on Car Model"
                              />
                            </FormGroup>
                          </Col>

                          {/* Kilometers - Numeric Input */}
                          <Col lg="2">
                            <FormGroup>
                              <Label for="kilometers">Kilometers</Label>
                              <Input
                                type="number"
                                id="kilometers"
                                name="kilometers" // Set a name so handleInputChange updates formData
                                placeholder="Enter Kilometers"
                                value={formData.kilometers || ""}
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </Col>

                          <Col lg="2">
                            <FormGroup>
                              <Label for="caryear">Car Year</Label>
                              <Select
                                options={Array.from(
                                  {
                                    length: new Date().getFullYear() - 1949 + 2,
                                  },
                                  (_, index) => {
                                    const year =
                                      new Date().getFullYear() + 1 - index
                                    return {
                                      value: year,
                                      label: year.toString(),
                                    }
                                  }
                                )}
                                placeholder="Select Year"
                                classNamePrefix="select2-selection"
                                isSearchable={true} // Enables searching
                                isClearable={true} // Allows clearing the selection
                                value={
                                  formData.caryear
                                    ? {
                                        value: formData.caryear,
                                        label: formData.caryear.toString(),
                                      }
                                    : null
                                }
                                onChange={selectedOption =>
                                  handleInputChange({
                                    target: {
                                      name: "caryear",
                                      value: selectedOption
                                        ? selectedOption.value
                                        : "",
                                    },
                                  })
                                }
                              />
                            </FormGroup>
                          </Col>

                          {/* VIN Code - Text Input */}
                          <Col lg="2">
                            <FormGroup>
                              <Label for="vinCode">VIN Code</Label>
                              <Input
                                type="text"
                                id="vinCode"
                                name="vincode" // This must match the key in formData
                                placeholder="Enter VIN Code"
                                value={formData.vincode || ""}
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="3">
                            <FormGroup>
                              <Label for="deposit">Deposit</Label>
                              <Input
                                type="number"
                                id="deposit"
                                placeholder="Enter Deposit"
                                min="0"
                              />
                            </FormGroup>
                          </Col>

                          {/* Colour - Text Input */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="colour">Colour</Label>
                              <Input
                                type="text"
                                id="colour"
                                placeholder="Enter Colour"
                              />
                            </FormGroup>
                          </Col>

                          <Col lg="3">
                            <FormGroup>
                              <Label for="engineType">Engine Type</Label>
                              <Input
                                type="text"
                                id="engineType"
                                name="engineType"
                                placeholder="Enter Engine Type"
                                value={formData.engineType || ""}
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </Col>

                          {/* Gear Type - Text Input */}
                          <Col lg="3">
                            <FormGroup>
                              <Label for="gearType">Gear Type</Label>
                              <Input
                                type="text"
                                id="gearType"
                                name="gearType"
                                placeholder="Enter Gear Type"
                                value={formData.gearType || ""}
                                onChange={handleInputChange}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>

                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-primary mr-2"
                          onClick={handleSaveCardMain}
                        >
                          Save
                        </button>
                        <button className="btn btn-secondary">Clear</button>
                      </div>
                    </TabPane>

                    {/* Company Details with Nested Tabs */}
                    <TabPane tabId={2}>
                      <ul className="nav nav-tabs mt-3">
                        <NavItem>
                          <NavLink
                            className={classnames({ active: subTab === 1 })}
                            onClick={() => setSubTab(1)}
                          >
                            Labour Details
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: subTab === 2 })}
                            onClick={() => setSubTab(2)}
                          >
                            Parts from Store
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            className={classnames({ active: subTab === 3 })}
                            onClick={() => setSubTab(3)}
                          >
                            Parts From Outside
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: subTab === 4 })}
                            onClick={() => setSubTab(4)}
                          >
                            Old Parts
                          </NavLink>
                        </NavItem>

                        <NavItem>
                          <NavLink
                            className={classnames({ active: subTab === 5 })}
                            onClick={() => setSubTab(5)}
                          >
                            Parts Brought by Customer
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: subTab === 6 })}
                            onClick={() => setSubTab(6)}
                          >
                            Card Summary
                          </NavLink>
                        </NavItem>
                      </ul>

                      {/* Nested Tab Content */}
                      <TabContent activeTab={subTab} className="mt-3">
                        <TabPane tabId={1}>
                          <Row>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="job">Job</Label>
                                <div className="d-flex align-items-center">
                                  <Input
                                    type="text"
                                    id="job"
                                    value={
                                      formData.labourGrpEn ||
                                      formData.labourGrpAr
                                        ? `${formData.labourGrpEn || ""} ~ ${
                                            formData.labourGrpAr || ""
                                          }`
                                        : ""
                                    }
                                    readOnly
                                  />
                                  <Input
                                    type="hidden"
                                    name="labourGrpid"
                                    value={formData.labourGrpid}
                                  />
                                  <Button
                                    color="primary"
                                    className="ms-2"
                                    onClick={handleLabourGrpOpenModal}
                                  >
                                    <FaSearch />
                                  </Button>
                                  <Button
                                    color="primary"
                                    className="ms-2"
                                    onClick={handleOtherJobOpenModal}
                                  >
                                    <FaSearch />
                                  </Button>
                                </div>
                              </FormGroup>
                            </Col>

                            <Modal
                              isOpen={LabourGrpModalOpen}
                              toggle={() =>
                                setLabourGrpModalOpen(!LabourGrpModalOpen)
                              }
                              size="lg"
                            >
                              <ModalHeader
                                toggle={() =>
                                  setLabourGrpModalOpen(!LabourGrpModalOpen)
                                }
                              >
                                Labour Group
                              </ModalHeader>

                              <ModalBody
                                style={{
                                  maxHeight: "80vh",
                                  overflow: "hidden",
                                }}
                              >
                                {/* 🔹 Filter Section */}
                                <div className="d-flex align-items-center gap-2 mb-3">
                                  <Input
                                    type="select"
                                    value={JobGrpFilterField}
                                    onChange={e =>
                                      setJobGrpFilterField(e.target.value)
                                    }
                                    style={{ flex: 2 }}
                                  >
                                    <option value="LGrp_Id">Job Id</option>
                                    <option value="LGrp_Code">Job Code</option>
                                    <option value="LGrp_DescAr">
                                      Job NameAr
                                    </option>
                                    <option value="LGrp_DescEn">
                                      Job NameEn
                                    </option>
                                  </Input>

                                  <Input
                                    type="select"
                                    value={JobGrpFilterCondition}
                                    onChange={e =>
                                      setJobGrpFilterCondition(e.target.value)
                                    }
                                    style={{ flex: 2 }}
                                  >
                                    <option value="contains">Contains</option>
                                    <option value="equals">Equals</option>
                                    <option value="starts with">
                                      Starts With
                                    </option>
                                    <option value="ends with">Ends With</option>
                                    <option value="not equals">
                                      Not Equals
                                    </option>
                                    <option value="not starts with">
                                      Not Starts With
                                    </option>
                                  </Input>

                                  <Input
                                    type="text"
                                    placeholder="Enter search value"
                                    value={JobGrpFilterValue}
                                    onChange={e => {
                                      const value = e.target.value
                                      setJobGrpFilterValue(value)
                                      GetCardlabourGrpJobs(
                                        0,
                                        0,
                                        JobGrpFilterField,
                                        JobGrpFilterCondition,
                                        value
                                      )
                                    }}
                                    style={{ flex: 3 }}
                                  />
                                </div>

                                {/* 🔹 First Table - Always Visible */}
                                <div
                                  style={{
                                    maxHeight:
                                      ShowChildTable || ShowChildDetTable
                                        ? "35vh"
                                        : "50vh",
                                    overflowY: "auto",
                                    borderBottom: "1px solid #ddd",
                                    paddingBottom: "10px",
                                    transition: "max-height 0.3s ease",
                                  }}
                                >
                                  {LabourGrpLoading ? (
                                    <p>Loading...</p>
                                  ) : (
                                    <Table bordered responsive>
                                      <thead>
                                        <tr>
                                          <th>#</th>
                                          <th>Job Code</th>
                                          <th>Job Name En</th>
                                          <th>Job Name Ar</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {LabourGrpData.length > 0 ? (
                                          LabourGrpData.map((item, index) => (
                                            <tr
                                              key={item.id}
                                              onClick={() =>
                                                handleLabourGrpRowClick(item)
                                              }
                                              style={{
                                                cursor: "pointer",
                                                backgroundColor:
                                                  selectedLabourGrp === item.id
                                                    ? "#d3f9d8"
                                                    : "", // Highlight logic
                                              }}
                                            >
                                              <td>{index + 1}</td>
                                              <td>{item.code}</td>
                                              <td>{item.descEn}</td>
                                              <td>{item.descAr}</td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td
                                              colSpan="4"
                                              className="text-center"
                                            >
                                              No data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </Table>
                                  )}
                                </div>

                                {/* 🔹 Second Table - Conditionally Visible */}
                                {ShowChildTable && (
                                  <div
                                    style={{
                                      maxHeight: "30vh",
                                      overflowY: "auto",
                                      marginTop: "10px",
                                      transition: "max-height 0.3s ease",
                                    }}
                                  >
                                    <h5>Child Labour Group</h5>
                                    <Table bordered responsive>
                                      <thead>
                                        <tr>
                                          <th>Job Code</th>
                                          <th>Job Name En</th>
                                          <th>Job Name Ar</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {LabourChildGrpData.length > 0 ? (
                                          LabourChildGrpData.map(
                                            (item, index) => (
                                              <tr
                                                key={index}
                                                onClick={() =>
                                                  handleChildRowClick(item)
                                                }
                                                style={{ cursor: "pointer" }} // Indicating clickable rows
                                              >
                                                <td>{item.code}</td>
                                                <td>{item.descEn}</td>
                                                <td>{item.descAr}</td>
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-center"
                                            >
                                              No additional data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                )}

                                {/* 🔹 Third Table - Conditionally Visible */}
                                {ShowChildDetTable && (
                                  <div
                                    style={{
                                      maxHeight: "30vh",
                                      overflowY: "auto",
                                      marginTop: "10px",
                                      transition: "max-height 0.3s ease",
                                    }}
                                  >
                                    <h5>Third Labour Group</h5>

                                    <Table bordered responsive>
                                      <thead>
                                        <tr>
                                          <th>Job Code</th>
                                          <th>Job Name En</th>
                                          <th>Job Name Ar</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {ChildDetGrpData.length > 0 ? (
                                          ChildDetGrpData.map((item, index) => (
                                            <tr
                                              key={index}
                                              onClick={() =>
                                                handleChildRowClick(item)
                                              }
                                              style={{ cursor: "pointer" }} // Indicating clickable rows
                                            >
                                              <td>{item.code}</td>
                                              <td>{item.descEn}</td>
                                              <td>{item.descAr}</td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="text-center"
                                            >
                                              No additional data found
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                )}
                              </ModalBody>
                            </Modal>

                            <Modal
                              isOpen={OtherJobModalOpen}
                              toggle={() =>
                                setOtherJobModalOpen(!OtherJobModalOpen)
                              }
                              size="lg"
                            >
                              <ModalHeader
                                toggle={() =>
                                  setOtherJobModalOpen(!OtherJobModalOpen)
                                }
                              >
                                Other Job Details
                              </ModalHeader>
                              <ModalBody
                                style={{
                                  maxHeight: "80vh",
                                  overflow: "hidden",
                                }}
                              >
                                {/* Filter Section */}
                                <div className="d-flex align-items-center gap-2 mb-3">
                                  {/* Filter Field Dropdown */}
                                  <Input
                                    type="select"
                                    value={OtherJobFilterField}
                                    onChange={e =>
                                      setOtherJobFilterCondition(e.target.value)
                                    }
                                    style={{ flex: 2 }}
                                  >
                                    <option value="LGrp_Id">Job Id</option>
                                    <option value="LGrp_Code">Job Code</option>
                                    <option value="LGrp_DescAr">
                                      Job NameAr
                                    </option>
                                    <option value="LGrp_DescEn">
                                      Job NameEn
                                    </option>
                                  </Input>

                                  {/* Filter Condition Dropdown */}
                                  <Input
                                    type="select"
                                    value={OtherJobFilterCondition}
                                    onChange={e =>
                                      setOtherJobFilterCondition(e.target.value)
                                    }
                                    style={{ flex: 2 }}
                                  >
                                    <option value="contains">Contains</option>
                                    <option value="equals">Equals</option>
                                    <option value="starts with">
                                      Starts With
                                    </option>
                                    <option value="ends with">Ends With</option>
                                  </Input>

                                  {/* Search Input */}
                                  <Input
                                    type="text"
                                    placeholder="Enter search value"
                                    value={OtherJobFilterValue}
                                    onChange={e => {
                                      const value = e.target.value
                                      setOtherJobFilterValue(value)
                                      if (value.length >= 1) {
                                        GetOtherJobs(
                                          OtherJobFilterField,
                                          OtherJobFilterCondition,
                                          value
                                        )
                                      }
                                    }}
                                    style={{ flex: 3 }}
                                  />
                                </div>

                                {/* Scrollable Table */}
                                {loading ? (
                                  <p>Loading...</p>
                                ) : (
                                  <div
                                    style={{
                                      maxHeight: "50vh",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <Table bordered responsive>
                                      <thead>
                                        <tr>
                                          <th>Job Code</th>
                                          <th>Name (EN)</th>
                                          <th>Name (AR)</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {OtherJobData.length > 0 ? (
                                          OtherJobData.map((item, index) => (
                                            <tr
                                              key={item.id}
                                              onClick={() =>
                                                handleChildDetRowClick(item)
                                              }
                                              style={{ cursor: "pointer" }}
                                            >
                                              <td>{item.code}</td>
                                              <td>{item.descEn}</td>
                                              <td>{item.descAr}</td>
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
                              </ModalBody>
                            </Modal>

                            {/* ✅ First Status Dropdown */}
                            {/* ✅ Status 1 (User selects this) */}
                            {/* ✅ Status 1 (User selects this) */}
                            {/* ✅ Status 1 (User selects this) */}
                            {/* ✅ Status 1 (User selects this) */}
                            <Col lg="3">
                              <FormGroup>
                                <Label for="status1">Status</Label>
                                <Input
                                  type="select"
                                  id="status1"
                                  name="labourStatusId"
                                  value={formData.labourStatusId || ""}
                                  onChange={e => {
                                    const selectedStatusId = e.target.value
                                    setFormData(prev => ({
                                      ...prev,
                                      labourStatusId: selectedStatusId,
                                      status2: "", // Reset Status 2 before fetching new one
                                      status2Name: "", // Reset display name
                                    }))

                                    if (selectedStatusId) {
                                      GetLabourStatusDetails(
                                        1,
                                        selectedStatusId
                                      ) // Fetch Status 2
                                    }
                                  }}
                                >
                                  <option value="">Select Status</option>
                                  {LabourStatusHead.map(status => (
                                    <option
                                      key={status.labStat_Id}
                                      value={status.labStat_Id}
                                    >
                                      {status.dispName}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>

                            {/* ✅ Status 2 (Auto-updated, stores `lbStatDet_Id` but shows `dispName`) */}
                            <Col lg="3">
                              <FormGroup>
                                <Label for="status2">Status 2</Label>
                                <Input
                                  type="text"
                                  id="status2"
                                  name="status2Name"
                                  value={formData.status2Name || ""}
                                  readOnly // User cannot change it manually
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="mechGroup">Mechanic Group</Label>
                                <Select
                                  id="mechGroup"
                                  options={MechanicGroup.map(group => ({
                                    value: group.mechGrp_Id,
                                    label: group.dispName,
                                  }))}
                                  value={
                                    formData.mechGroupId
                                      ? {
                                          value: formData.mechGroupId,
                                          label: formData.mechGroupName,
                                        }
                                      : null
                                  }
                                  onChange={selectedOption => {
                                    if (selectedOption) {
                                      setFormData(prev => ({
                                        ...prev,
                                        mechGroupId: selectedOption.value,
                                        mechGroupName: selectedOption.label,
                                      }))
                                    } else {
                                      setFormData(prev => ({
                                        ...prev,
                                        mechGroupId: "",
                                        mechGroupName: "",
                                      }))
                                    }
                                  }}
                                  isClearable
                                  placeholder="Select Mechanic Group"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            {/* ✅ Mechanic Dropdown */}
                            <Col lg="3">
                              <FormGroup>
                                <Label for="mech">Mechanic</Label>
                                <Input type="select" id="mech">
                                  <option value="">Select Mechanic</option>
                                </Input>
                              </FormGroup>
                            </Col>

                            {/* ✅ Mechanic Code Input */}
                            <Col lg="3">
                              <FormGroup>
                                <Label for="mechCode">Mechanic Code</Label>
                                <Input
                                  type="text"
                                  id="mechCode"
                                  value={inputValues.LabourDetCode}
                                  placeholder="Enter Mechanic Code"
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            {/* ✅ Mitchel Time Input */}
                            <Col lg="3">
                              <FormGroup>
                                <Label for="mitchelTime">Mitchel Time</Label>
                                <Input
                                  type="number"
                                  id="mitchelTime"
                                  placeholder="Enter Mitchel Time"
                                  value={formData.mitchelTime}
                                  step="0.1" // Allows decimal input like 1.5, 2.5
                                  min="0"
                                  onChange={e => {
                                    const mitchelTime = e.target.value
                                    if (/^\d*\.?\d*$/.test(mitchelTime)) {
                                      // Ensures numeric + decimal values
                                      setFormData(prev => ({
                                        ...prev,
                                        mitchelTime,
                                        convTime: (
                                          parseFloat(mitchelTime) * 60
                                        ).toFixed(2), // Convert to minutes
                                      }))
                                    }
                                  }}
                                />
                              </FormGroup>
                            </Col>

                            {/* ✅ Quantity Input */}
                            <Col lg="3">
                              <FormGroup>
                                <Label for="qty">Quantity</Label>
                                <Input
                                  type="number"
                                  id="qty"
                                  placeholder="Enter Quantity"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="2">
                              <FormGroup>
                                <Label for="price">Price</Label>
                                <Input
                                  type="number"
                                  id="price"
                                  placeholder="Enter Price"
                                  value={formData.price}
                                  onChange={e => {
                                    const price = e.target.value
                                    setFormData(prev => ({ ...prev, price }))
                                    calculateNetAmount(
                                      price,
                                      formData.vatPercentage
                                    )
                                  }}
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="skillLevel">Skill Level</Label>
                                <Input
                                  type="select"
                                  id="skillLevel"
                                  value={formData.skillLevel}
                                  onChange={e =>
                                    setFormData({
                                      ...formData,
                                      skillLevel: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select Skill Level</option>
                                  {["A", "B", "C", "D", "E", "F"].map(level => (
                                    <option key={level} value={level}>
                                      {level}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="discApplied">
                                  Discount Applied
                                </Label>
                                <Input
                                  type="text"
                                  id="discApplied"
                                  placeholder="Enter Discount"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="vatPercentage">VAT %</Label>
                                <Input
                                  type="select"
                                  id="vatPercentage"
                                  value={formData.vatPercentage}
                                  onChange={e => {
                                    const vatPercentage = e.target.value
                                    setFormData(prev => ({
                                      ...prev,
                                      vatPercentage,
                                    }))
                                    calculateNetAmount(
                                      formData.price,
                                      vatPercentage
                                    )
                                  }}
                                >
                                  <option value="">Select VAT %</option>
                                  <option value="5">5%</option>
                                  <option value="15">15%</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col lg="2">
                              <FormGroup>
                                <Label for="vatAmount">VAT Amount</Label>
                                <Input
                                  type="text"
                                  id="vatAmount"
                                  value={formData.vatAmount}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="convTime">Conv. Time</Label>
                                <Input
                                  type="text"
                                  id="convTime"
                                  placeholder="Converted Conv. Time"
                                  value={formData.convTime}
                                  readOnly // Makes it non-editable
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <div className="d-flex align-items-center justify-content-between w-100">
                            {/* Net Amount Field */}
                            <div>
                              <label className="mb-0">Net Amount</label>
                              <input
                                type="number"
                                className="form-control"
                                value={formData.netAmount}
                                readOnly
                              />
                            </div>

                            {/* Right Side - Buttons */}
                            <div>
                              <button
                                className="btn btn-primary mr-2"
                                onClick={handleAddUpdateLabourDetails}
                              >
                                Add/Update
                              </button>
                              <button className="btn btn-secondary">
                                Clear
                              </button>
                            </div>
                          </div>

                          {/* labour Details Grid */}
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
                                      <th>Job Name</th>
                                      <th>Mechanic Group</th>
                                      <th>Mechanic Name</th>
                                      <th>Price</th>
                                      <th>Total Amount</th>
                                      <th>Total Disc%</th>
                                      <th>VAT %</th>
                                      <th>VAT Amt</th>
                                      <th>Net Amt</th>
                                      <th>Status</th>
                                      <th>Status Desc</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {mechanicDetails.map((item, index) => (
                                      <tr
                                        key={index}
                                        // onClick={() => handleRowClick(item)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <td>{index + 1}</td>
                                        <td>{item.jobName}</td>
                                        <td>{item.mechanicGroup}</td>
                                        <td>{item.mechanicName}</td>
                                        <td>{item.price}</td>
                                        <td>{item.price}</td>
                                        <td>{item.totalDisc}</td>
                                        <td>{item.vatPerc}</td>
                                        <td>{item.vatAmt}</td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.status}</td>
                                        <td>{item.statusDesc}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </Col>
                          </Row>

                          {/* Parts from Store  */}
                        </TabPane>
                        <TabPane tabId={2}>
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
                                      <th>Item Code </th>
                                      <th>Part No</th>
                                      <th>Name Ar </th>
                                      <th>Name En</th>
                                      <th>Qty</th>
                                      <th>Sales Price </th>
                                      <th>Vat Amount </th>
                                      <th>Total Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {StorePartDetails.map((item, index) => (
                                      <tr
                                        key={index}
                                        // onClick={() => handleRowClick(item)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <td>{item.OldPartItemCode}</td>
                                        <td>{item.OldPartItemNameEn}</td>
                                        <td>{item.OldPartItemNameAr}</td>
                                        <td>{item.OldPartOem}</td>
                                        <td>{item.OldPartNetSales}</td>
                                        <td>{item.OldPartPrice}</td>
                                        <td>{item.OldPartVatAmt}</td>
                                        <td>{item.OldPartNetSalesPrice}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </Col>
                          </Row>
                          {/* Add Parts from Outsdie Form Here */}
                        </TabPane>
                        <TabPane tabId={3}>
                          <Row>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="partNumber">Part Number</Label>
                                <Input
                                  type="text"
                                  id="partNumber"
                                  placeholder="Enter Part Number"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="invoiceNumber">
                                  Invoice Number
                                </Label>
                                <Input
                                  type="text"
                                  id="invoiceNumber"
                                  placeholder="Enter Invoice Number"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="nameEn">Name (English)</Label>
                                <Input
                                  type="text"
                                  id="nameEn"
                                  placeholder="Enter Name in English"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="nameAr">Name (Arabic)</Label>
                                <Input
                                  type="text"
                                  id="nameAr"
                                  placeholder="Enter Name in Arabic"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="qty">Quantity (Qty)</Label>
                                <Input
                                  type="number"
                                  id="qty"
                                  placeholder="Enter Quantity"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="branch">Branch</Label>
                                <Input
                                  type="text"
                                  id="branch"
                                  placeholder="Enter Branch"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="price">Price</Label>
                                <Input
                                  type="number"
                                  id="price"
                                  placeholder="Enter Price"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="netAmount">Net Amount</Label>
                                <Input
                                  type="text"
                                  id="netAmount"
                                  placeholder="Net Amount"
                                  readOnly
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="align-items-end">
                            <Col lg="3">
                              <FormGroup>
                                <Label for="vatPercentage">VAT %</Label>
                                <Input type="select" id="vatPercentage">
                                  <option value="">Select VAT %</option>
                                  <option value="5">5%</option>
                                  <option value="15">15%</option>
                                </Input>
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="vatAmount">VAT Amount</Label>
                                <Input
                                  type="text"
                                  id="vatAmount"
                                  placeholder="VAT Amount"
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            {/* Right-Side Buttons */}
                            <Col lg="6" className="text-end">
                              <Button color="primary" className="me-2">
                                Add
                              </Button>
                              <Button color="danger" className="me-2">
                                Return
                              </Button>
                              <Button color="secondary">Clear</Button>
                            </Col>
                          </Row>

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
                                    <th>Invoice No </th>
                                    <th>Part No</th>
                                    <th>Name Ar </th>
                                    <th>Name En</th>
                                    <th>Qty</th>
                                    <th>Sales Price </th>
                                    <th>Vat % </th>
                                    <th>Vat Amount</th>
                                    <th>Total Amount </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {OutsidePartDetails.map((item, index) => (
                                    <tr
                                      key={index}
                                      // onClick={() => handleRowClick(item)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <td>{item.OutsideSalesCode}</td>
                                      <td>{item.OutsidePartCode}</td>
                                      <td>{item.OutsidePartNameAr}</td>
                                      <td>{item.OutsidePartNameEn}</td>
                                      <td>{item.OutsidePartQty}</td>
                                      <td>{item.OutsidePartTotal}</td>
                                      <td>{item.OldPartVatAmt}</td>
                                      <td>{item.OutsidePartVATPerc}</td>
                                      <td>{item.OutsidePartTotal}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Col>
                        </TabPane>

                        <TabPane tabId={4}>
                          <Row>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="code">Code</Label>
                                <Input
                                  type="text"
                                  id="code"
                                  placeholder="Enter Code"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="lastcode">Last Code</Label>
                                <Input
                                  type="text"
                                  id="lastcode"
                                  value={inputValues.OldpartCode || ""}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="OldPartNameEn">
                                  Name (English)
                                </Label>
                                <Input
                                  type="text"
                                  name="OldPartNameEn" // Ensure name matches the formData key
                                  value={formData.OldPartNameEn || ""}
                                  onChange={handleInputChange}
                                  placeholder="Enter Name in English"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="nameAr">Name (Arabic)</Label>
                                <Input
                                  type="text"
                                  name="OldPartNameAr"
                                  value={formData.OldPartNameAr || ""}
                                  onChange={handleInputChange}
                                  placeholder="Enter Name in Arabic"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="partNumber">Part Number</Label>
                                <Input
                                  type="text"
                                  name="OldPartNumber"
                                  value={formData.OldPartNumber || ""}
                                  onChange={handleInputChange}
                                  placeholder="Enter Part Number"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="qty">Quantity</Label>
                                <Input
                                  type="number"
                                  name="OldPartQty"
                                  value={formData.OldPartQty || 1}
                                  onChange={handleInputChange}
                                  placeholder="Enter Quantity"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="price">Price</Label>
                                <Input
                                  type="number"
                                  name="OldPartPrice" // Corrected here, no extra quote
                                  value={formData.OldPartPrice}
                                  onChange={handleInputChange}
                                  placeholder="Enter Price"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="vatPercentage">VAT %</Label>
                                <Input
                                  type="select"
                                  name="OldPartVatPercentage"
                                  value={formData.OldPartVatPercentage}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select VAT %</option>
                                  <option value="5">5%</option>
                                  <option value="15">15%</option>
                                </Input>
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="price">Net Amount </Label>
                                <Input
                                  type="number"
                                  name="OldPartNetAmount" // Corrected here, no extra quote
                                  value={(
                                    (parseFloat(formData.OldPartPrice) || 0) *
                                      (parseFloat(formData.OldPartQty) || 1) +
                                    ((parseFloat(formData.OldPartPrice) || 0) *
                                      (parseFloat(formData.OldPartQty) || 1) *
                                      (parseFloat(
                                        formData.OldPartVatPercentage
                                      ) || 0)) /
                                      100
                                  ).toFixed(2)}
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="1">
                              <FormGroup>
                                <Label for="vatAmount">VAT Amount</Label>
                                <Input
                                  type="number"
                                  name="OldPartVatAmount"
                                  readOnly
                                  placeholder="Calculated VAT Amount"
                                  value={(
                                    ((parseFloat(formData.OldPartPrice) || 0) *
                                      (parseFloat(formData.OldPartQty) || 1) *
                                      (parseFloat(
                                        formData.OldPartVatPercentage
                                      ) || 0)) /
                                    100
                                  ).toFixed(2)}
                                />

                                <Col
                                  lg=""
                                  className="d-flex justify-content-end mt-2"
                                >
                                  <Button
                                    color="primary"
                                    className="me-2"
                                    onClick={handleSaveOldPart}
                                  >
                                    Add
                                  </Button>

                                  <Button color="danger" className="me-2">
                                    Return
                                  </Button>
                                  <Button color="secondary">Clear</Button>
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>

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
                                    <th>Code </th>
                                    <th>Name Ar </th>
                                    <th>Name En</th>
                                    <th>Qty</th>
                                    <th> Price </th>
                                    <th>Vat % </th>
                                    <th>Vat Amount</th>
                                    <th>Net Amount </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {OldPartsDetails.map((item, index) => (
                                    <tr
                                      key={index}
                                      // onClick={() => handleRowClick(item)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <td>{item.oldCode}</td>
                                      <td>{item.oldPartNameAr}</td>
                                      <td>{item.oldPartNameEn}</td>
                                      <td>{item.OutsidePartNameEn}</td>
                                      <td>{item.oldQty}</td>
                                      <td>{item.oldRate}</td>
                                      <td>{item.oldVatPer}</td>
                                      <td>{item.oldVatAmount}</td>
                                      <td>{item.oldNetAmount}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Col>
                        </TabPane>
                        <TabPane tabId={5}>
                          <h5>Parts Brought by Customer Content</h5>

                          <Row>
                            <Col lg="2">
                              <FormGroup>
                                <Label for="code">Code</Label>
                                <Input
                                  type="text"
                                  id="code"
                                  placeholder="Enter Code"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="NextCode">Next Code</Label>
                                <Input
                                  type="text"
                                  id="custcode"
                                  value={formData.CustPartCode} // Corrected value binding to formData
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="2">
                              <FormGroup>
                                <Label for="partNumber">Part Number</Label>
                                <Input
                                  type="text"
                                  id="partNumber"
                                  placeholder="Enter Part Number"
                                  value={formData.CustPartPartNo}
                                  onChange={e =>
                                    setFormData({
                                      ...formData,
                                      CustPartPartNo: e.target.value,
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="nameEn">Name (English)</Label>
                                <Input
                                  type="text"
                                  id="nameEn"
                                  placeholder="Enter Name (English)"
                                  value={formData.CustPartNameEn}
                                  onChange={e =>
                                    setFormData({
                                      ...formData,
                                      CustPartNameEn: e.target.value,
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="nameAr">Name (Arabic)</Label>
                                <Input
                                  type="text"
                                  id="nameAr"
                                  placeholder="Enter Name (Arabic)"
                                  value={formData.CustPartNameAr}
                                  onChange={e =>
                                    setFormData({
                                      ...formData,
                                      CustPartNameAr: e.target.value,
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row className="align-items-end">
                            <Col lg="3">
                              <FormGroup>
                                <Label for="qty">Quantity (Qty)</Label>
                                <Input
                                  type="number"
                                  id="qty"
                                  placeholder="Enter Quantity"
                                  value={formData.CustPartQty}
                                  onChange={e =>
                                    setFormData({
                                      ...formData,
                                      CustPartQty: e.target.value,
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="price">Price</Label>
                                <Input
                                  type="number"
                                  id="price"
                                  placeholder="Enter Price"
                                  value={formData.CustPartPrice}
                                  onChange={e =>
                                    setFormData({
                                      ...formData,
                                      CustPartPrice: e.target.value,
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="netAmount">Net Amount</Label>
                                <Input
                                  type="text"
                                  id="netAmount"
                                  placeholder="Net Amount"
                                  value={formData.CustPartNetAmount} // Corrected value binding
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3" className="d-flex justify-content-end">
                              <Button
                                color="primary"
                                className="me-2"
                                onClick={handleSaveCustPart}
                              >
                                Add
                              </Button>
                              <Button color="warning" className="me-2">
                                Return
                              </Button>
                              <Button color="danger">Clear Fields</Button>
                            </Col>
                          </Row>

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
                                    <th>Code </th>
                                    <th>Name Ar </th>
                                    <th>Name En</th>
                                    <th>Qty</th>
                                    <th> Price </th>
                                    <th>Total Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {CusPartDetails.map((item, index) => (
                                    <tr
                                      key={index}
                                      // onClick={() => handleRowClick(item)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <td>{item.CustPartCode}</td>
                                      <td>{item.CustPartPartNameEn}</td>
                                      <td>{item.CustPartPartNameAr}</td>
                                      <td>{item.CustPartQty}</td>
                                      <td>{item.CustPartNetAmt}</td>
                                      <td>{item.CustPartNetAmt}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Col>
                        </TabPane>
                        <TabPane tabId={6}>
                          {/* Row 1 */}
                          <Row>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="labourCharges">
                                  Labour Charges
                                </Label>
                                <Input
                                  type="number"
                                  id="labourCharges"
                                  value={parseFloat(
                                    formData.SummaryLabourCharge || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="amountFromDos">
                                  Amount from DOS
                                </Label>
                                <Input
                                  type="number"
                                  id="amountFromDos"
                                  value={parseFloat(
                                    formData.SummaryDosNet || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="labourDiscAmt">
                                  Labour Discount Amount
                                </Label>
                                <Input
                                  type="number"
                                  id="labourDiscAmt"
                                  inputMode="decimal" // Ensures proper numeric input
                                  pattern="[0-9]*" // Restricts input to numbers only
                                  style={{ appearance: "textfield" }} // Removes arrows for most browsers
                                  value={parseFloat(
                                    formData.SummaryLabourDiscAmt || 0
                                  ).toFixed(2)}
                                  onChange={handleLabourDiscountChange}
                                  onWheel={e => e.target.blur()} // Prevents accidental value change on scroll
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="oldPartsNetAmt">
                                  Old Parts Net Amount
                                </Label>
                                <Input
                                  type="number"
                                  id="oldPartsNetAmt"
                                  value={parseFloat(
                                    formData.SummaryOldPartNet || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          {/* Row 2 */}
                          <Row>
                            <Col lg="3">
                              <FormGroup>
                                <Label for="labourVatAmount">
                                  Labour VAT Amount
                                </Label>
                                <Input
                                  type="number"
                                  id="labourVatAmount"
                                  value={parseFloat(
                                    formData.SummaryLabourVatNetAmt || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="customerPartNetAmount">
                                  Customer Part Net Amount
                                </Label>
                                <Input
                                  type="number"
                                  id="customerPartNetAmount"
                                  value={parseFloat(
                                    formData.SummaryCustPartNet || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="labourNetAmount">
                                  Labour Net Amount
                                </Label>
                                <Input
                                  type="number"
                                  id="labourNetAmount"
                                  value={parseFloat(
                                    formData.SummaryLabourNet || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="3">
                              <FormGroup>
                                <Label for="parkingCharge">
                                  Parking Charge
                                </Label>
                                <Input
                                  type="number"
                                  id="parkingCharge"
                                  value={parseFloat(
                                    formData.SummaryParkingCharge || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          {/* Row 3 */}
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <Label for="storePartNetAmount">
                                  Store Part Net Amount
                                </Label>
                                <Input
                                  type="number"
                                  id="storePartNetAmount"
                                  value={parseFloat(
                                    formData.SummaryStorePartNet || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup>
                                <Label for="depositAmount">Deposit</Label>
                                <Input
                                  type="number"
                                  id="depositAmount"
                                  value={parseFloat(
                                    formData.SummaryDepositNet || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup>
                                <Label for="outsidePartNetAmount">
                                  Outside Part Net Amount
                                </Label>
                                <Input
                                  type="number"
                                  id="outsidePartNetAmount"
                                  value={parseFloat(
                                    formData.SummaryOutSidePartNet || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          {/* Row 4 - New Fields */}
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <Label for="warrantyPeriod">
                                  Warranty Period (months)
                                </Label>
                                <Input
                                  type="number"
                                  id="warrantyPeriod"
                                  value={formData.SummaryWarrantyPeriod || ""}
                                  onChange={e =>
                                    setFormData({
                                      ...formData,
                                      SummaryWarrantyPeriod: e.target.value,
                                    })
                                  }
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup>
                                <Label for="grossAmount">Gross Amount</Label>
                                <Input
                                  type="number"
                                  id="grossAmount"
                                  value={parseFloat(
                                    formData.SummaryGrossAmount || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup>
                                <Label for="netAmount">Net Amount</Label>
                                <Input
                                  type="number"
                                  id="netAmount"
                                  value={parseFloat(
                                    formData.SummaryNetAmount || 0
                                  ).toFixed(2)}
                                  readOnly
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CardAdd
