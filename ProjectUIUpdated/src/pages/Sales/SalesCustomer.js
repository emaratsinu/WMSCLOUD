import React, { useState, useMemo, useEffect ,useCallback} from "react"
import Select from "react-select";
import TableContainer1 from "../../components/Common/TableContainer1";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Master/ownstyle.css"
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners"; // Importing the spinner
import { Modal } from "react-bootstrap";
import { Eye } from "lucide-react"; // Importing Lucide eye icon


import {
  fetchNextSaleCode, fetchCustomer, fetchEmployees, FetchParentChldSrls, FetchCheckSrls, saveSuspectedSrl, saveLogSrl, fetchVatDet,fetchSalesList,saveInvoice,fetchInvoiceSrlsById

} from "../../components/Api/SalesApiService";
import { Card, CardBody, Col, Container, Form, FormGroup, Input, Button, Label, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";

import classnames from "classnames"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const SalesCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Customer, setCustomer] = useState([]);
  const [notes, setNotes] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [loadingView, setLoadingView] = useState(false); // Loader
  const [viewLoadingRow, setViewLoadingRow] = useState(null);


  const [Sales , setSales] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [Salesman, setSalesman] = useState([]);
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [Paytype, setPaytype] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [isBarcodeValid, setIsBarcodeValid] = useState(true); // Default to true
  const [filters, setFilters] = useState({
      filterField: "Name (En)",
      filterCondition: "contains",
      filterValue: "",
    });




  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [minDueDate, setMinDueDate] = useState("");

  const [inputValues, setInputValues] = useState({
    code: "", namecode: "", Vat_id: "", Vat_Code: "", Vat_NameEn: "", Vat_NameAr: "", Vat_Per: "",cardcode:"",cardno:"",
  });


  const columns = useMemo(
    () => [
      {
        header: "Invoice No",
        accessorKey: "invNo",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Inv Date",
        accessorKey: "invDate",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Tot Qty",
        accessorKey: "totQty",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Type",
        accessorKey: "payType",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Customer",
        accessorKey: "customer",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Sales Man",
        accessorKey: "salesMan",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Created By",
        accessorKey: "createdBy",
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
              onViewClick(row.original);
            }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            disabled={viewLoadingRow === row.original.invNo} // Disable if loading
          >
            {viewLoadingRow === row.original.invNo ? (
              <ClipLoader size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </button>
        ),
      },
    ],
    [viewLoadingRow]
  );

  

  //meta title

  const [ItemVendor, setItemVendor] = useState([]);
  const [selectedVendors, setselectedVendors] = useState(null);
  const [activeTab, setactiveTab] = useState(1)
  const [passedSteps, setPassedSteps] = useState([1])
  const [invoiceItems, setInvoiceItems] = useState([]);

  useEffect(() => {

    console.log("Updated Invoice Items:", invoiceItems);
  }, [invoiceItems]);

  
  useEffect(() => {

    fetchNextCode();
    fetchTime();
    fetchCus();
    
    fetchSalesMan();
    fetchSales();
  }, []);

 
  
  const handleRowClick = (item) => {
    console.log("Clicked Row Data:", item);
    setSelectedItem(item);
    setShowModal(true);
  };
  


  function toggleTab(tab) {
    if (activeTab === tab) {
      setactiveTab(0); // Reset to a different value first
      setTimeout(() => setactiveTab(tab), 10); // Then set it back after a short delay
    } else {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps);
      }
    }
  }
  
  


  const fetchTime = async () => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    setInvoiceDate(today);
    setMinDueDate(today);
  }


  const fetchvat = async (id) => {
    try {
      const data = await fetchVatDet(id); // Fetch data for the given item ID

      // Update state with VAT details
      setInputValues({
        Vat_id: data.id,
        Vat_Code: data.code,
        Vat_NameEn: data.nameEn,
        Vat_NameAr: data.nameAr,
        Vat_Per: data.taxPerc,
      });

      return data.taxPerc; // Return the VAT percentage directly
    } catch (error) {
      console.error("Error fetching VAT details:", error);
      alert("An error occurred while fetching VAT details.");
      return 0; // Return 0 in case of an error
    }
  };


  const fetchCardNo = async (id) => {
    try {
      const data = await fetchVatDet(id); // Fetch data for the given item ID

      // Update state with VAT details
      setInputValues({
        Vat_id: data.id,
        Vat_Code: data.code,
        Vat_NameEn: data.nameEn,
        Vat_NameAr: data.nameAr,
        Vat_Per: data.taxPerc,
      });

      return data.taxPerc; // Return the VAT percentage directly
    } catch (error) {
      console.error("Error fetching VAT details:", error);
      alert("An error occurred while fetching VAT details.");
      return 0; // Return 0 in case of an error
    }
  };
 

  const onViewClick = async (rowData) => {
    setViewLoadingRow(rowData.invNo); // Show loader for the specific row

    try {
        console.log("View button clicked for:", rowData);
        setShowSaveButton(false);

        const invoiceData = await fetchInvoiceSrlsById(rowData.invNo);
        console.log("Fetched invoice data:", invoiceData);

        const invoiceArray = Array.isArray(invoiceData) ? invoiceData : [invoiceData];

        if (invoiceArray.length > 0) {
            const firstRecord = invoiceArray[0];

            const formatDate = (dateStr) => dateStr ? dateStr.split("T")[0] : "";
            const saDetType = firstRecord.saDet_Type || "R";

            setNotes(firstRecord.sa_Notes || "");
            setDeliveryNotes(firstRecord.sa_DeliveryNotes || "");
            setDueDate(formatDate(firstRecord.sa_DueDate));
            setInvoiceDate(formatDate(firstRecord.sa_Date));

            let updatedInvoiceItems = [];

            for (const serial of invoiceArray) {
                const serialNo = serial.serial_No;

                const requestData = {
                    SerialNo: serialNo,
                    FlagToCheck: 5,
                    PaytypeID: 1,
                    CustID: null,
                    JobCardID: null,
                    InvID: null,
                    SalesType: saDetType,
                    ToBrID: null,
                    VndrID: null,
                    SalesMechID: null,
                    SalesMechGrpID: null
                };

                const response = await FetchCheckSrls(requestData);
                console.log("Fetched serial response:", response);

                if (response && Array.isArray(response.serialStatus)) {
                    for (const serialInfo of response.serialStatus) {
                        const unitdetid = serialInfo.unitDetId;
                        const itemcode = serialInfo.itemNo;
                        const price = serialInfo.currSp;
                        const avgCost = serialInfo.avgCost;
                        const vatPerc = await fetchvat(itemcode);

                        const existingItemIndex = updatedInvoiceItems.findIndex(item => item.unitdetid === unitdetid);

                        if (existingItemIndex !== -1) {
                            updatedInvoiceItems[existingItemIndex].serialNumbers.push(serialInfo.serial_No);
                            updatedInvoiceItems[existingItemIndex].quantity = updatedInvoiceItems[existingItemIndex].serialNumbers.length;
                            updatedInvoiceItems[existingItemIndex].actualPrice = updatedInvoiceItems[existingItemIndex].price * updatedInvoiceItems[existingItemIndex].quantity;
                            updatedInvoiceItems[existingItemIndex].vat = (updatedInvoiceItems[existingItemIndex].actualPrice * vatPerc) / 100;
                            updatedInvoiceItems[existingItemIndex].netamt = updatedInvoiceItems[existingItemIndex].actualPrice + updatedInvoiceItems[existingItemIndex].vat;
                            updatedInvoiceItems[existingItemIndex].totalcost = avgCost * updatedInvoiceItems[existingItemIndex].quantity;
                        } else {
                            const actualPrice = price * 1;
                            const vat = (actualPrice * vatPerc) / 100;
                            const netAmount = actualPrice + vat;
                            const totalCost = avgCost * 1;

                            updatedInvoiceItems.push({
                                code: serialInfo.serial_No,
                                itemNo: serialInfo.itemId,
                                itemName: serialInfo.nameFull,
                                quantity: 1,
                                stockCode: serialInfo.stockCode,
                                partNo: serialInfo.partNo,
                                location: serialInfo.loc,
                                currentStock: serialInfo.currStock,
                                unit: serialInfo.unit,
                                factor: serialInfo.factor,
                                itemTaxCode: serialInfo.stockCode,
                                totalcost: totalCost,
                                type: saDetType,
                                unitdetid: serialInfo.unitDetId,
                                serialNumbers: [serialInfo.serial_No],
                                price: price,
                                vatPerc: vatPerc,
                                actualPrice: actualPrice,
                                vat: vat,
                                netamt: netAmount
                            });
                        }
                    }
                } else {
                    console.warn("No valid serialStatus data found in response.");
                }
            }

            setInvoiceItems(updatedInvoiceItems);
        } else {
            console.warn("No serial details found for this invoice.");
        }

        toggleTab(1);

        setInputValues((prev) => ({
            ...prev,
            code: rowData.invNo
        }));
    } catch (error) {
        console.error("Error fetching invoice serial details:", error);
    } finally {
        setViewLoadingRow(null); // Hide loader after processing
    }
};










  const fetchNextCode = async () => {

    try {

      const data = await fetchNextSaleCode();
      setInputValues((prev) => ({ ...prev, code: data.nxtSalesCode }));
    } catch (error) {
      Swal.fire("Error", "Failed to fetch the next code.", "error");
    }
  };


  const fetchCus = async () => {

    try {
      const ItemCustomerData = await fetchCustomer();
      if (ItemCustomerData) setCustomer(ItemCustomerData);
    } catch (error) {
      console.error("Error fetching item  Units :", error);
    }
  };



  const fetchSalesMan = async () => {

    try {
      const SalesmanData = await fetchEmployees();
      if (SalesmanData) setSalesman(SalesmanData);
    } catch (error) {
      console.error("Error fetching item  Units :", error);
    }
  };


  


  const fetchSales = async () => {
    setLoading(true);
    try {
      const fieldMapping = {
        invNo: "sa_No",
        invDate: "sa_Date",
        payType: "payType_NameEn",
        totQty: "sa_TotQty",
        totAmt: "sa_TotAmt",
        customer: "customerName",
        salesMan: "salesmanName",
        createdBy: "createdByName",
      };
  
      const response = await fetchSalesList(filters, fieldMapping);
  
      if (response && Array.isArray(response)) {
        const transformedData = response.map((item) => ({
          invNo: item.sa_No, // Invoice No
          invDate: item.sa_Date, // Invoice Date
          payType: item.payType_NameEn, // Payment Type
          totQty: item.sa_TotQty, // Total Quantity
          totAmt: item.sa_TotAmt, // Total Amount
          customer: item.customerName, // Customer Name
          salesMan: item.salesmanName, // Salesman Name
          createdBy: item.createdByName, // Created By Name
        }));

        console.log("data",transformedData)
  
        setData(transformedData);
      } else {
        console.error("No sales data received from API");
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };
  



  const ProcessSerial = async (
    serial,
    branchId,
    formUID,
    userDetails,
    custOrPayId,
    jobCardId,
    invID,
    salesType,
    mechId,
    mechGrpId,
    createFromPLQuotation,
    tableFlag
  ) => {
    try {
      // Default values
      const resType = 0;
      const level = 2;

      // Fetch parent-child serials
      const parentChildData = await FetchParentChldSrls(serial, resType, level);

      if (!parentChildData || parentChildData.length === 0) {
        console.error("Error: No parent-child data found.");
        return { CurrRowId: 0, error: "No parent-child data found" };
      }

      // Filter records where serial_Level is not 0
      const filteredData = parentChildData.filter(item => item.serial_Level !== 0);

      if (filteredData.length > 0) {
        for (const serialItem of filteredData) {
          // Find if serial exists in parentChildData itself
          const existingSerial = parentChildData.find(row => row.serial_No === serialItem.serial_No);

          if (!existingSerial) continue;

          // Retrieve parent row (assuming it exists in parentChildData)
          const parentRow = parentChildData.find(row => row.SlNo === existingSerial.SlNo);
          if (!parentRow) continue;

          const CurrRowID = parentRow.SlNo;
          const Msg =
            serialItem.serial_Level > 0
              ? "Big serial already entered.\r\n.وقد أدخلت المسلسل الاكبر بالفعل"
              : "Small serial already entered.\r\n.وقد أدخلت بالفعل المسلسل الاصغر";

          alert(Msg); // Show error message
          return { CurrRowId: CurrRowID, error: Msg };
        }
      }

      // Handle TableFlag logic
      let PaytypeID = "null",
        CustomerID = "null",
        JobCardId = "null",
        InvoiceID = "null",
        ToBrID = "null",
        VendorID = "null",
        SalesType = "null",
        SaMechId = "null",
        SaMechGrpId = "null";

      if (tableFlag === "Sales") {
        PaytypeID = custOrPayId;
        SalesType = `'${salesType}'`;
        createFromPLQuotation = createFromPLQuotation === "true"; // Convert to boolean
      } else if (tableFlag === "SalesRet") {
        CustomerID = custOrPayId;
        JobCardId = jobCardId;
        InvoiceID = invID;
        SalesType = `'${salesType}'`;
        SaMechId = mechId;
        SaMechGrpId = mechGrpId;
      } else if (tableFlag === "TrOut") {
        ToBrID = custOrPayId;
      } else if (tableFlag === "PRet") {
        VendorID = custOrPayId;
        InvoiceID = jobCardId;
      }

      // Log the transaction details
      console.log("Processing Serial - Transaction Details:", {
        serial,
        branchId,
        formUID,
        userDetails,
        tableFlag,
        PaytypeID,
        CustomerID,
        JobCardId,
        InvoiceID,
        ToBrID,
        VendorID,
        SalesType,
        SaMechId,
        SaMechGrpId,
      });

      return { CurrRowId: 1, error: null }; // Success response
    } catch (error) {
      console.error("Error processing serial:", error);
      return { CurrRowId: 0, error: error.message };
    }
  };



  const saveSalesInvoice = async () => {
   
  
    console.log("Invoice Items before saving:", invoiceItems);

    // Remove items with quantity === 0
    const validInvoiceItems = invoiceItems.filter(item => item.quantity > 0);

    if (validInvoiceItems.length === 0) {
        alert("Error: All items have zero quantity. Please add valid items.");
        console.error("Error: No valid items in invoice.");
        return;
    }

    if (!inputValues.code) {
        console.error("Error: Invoice code (sa_No) is missing.");
        return;
    }

     if(!dueDate){
   
           Swal.fire({
               title: "Error!",
               text: "due date  is not selected",
               icon: "error",
               confirmButtonText: "OK"
             });
           return;
   
   
       }


    if (!selectedCustomer) {
        alert("Error: Customer is not selected.");
        return;
    }

    try {
        const payload = {
            sa_Id: 0,
            sa_No: inputValues.code,
            sa_Date: invoiceDate,
            sa_DueDate: dueDate,
            sa_CustID: selectedCustomer.value,
            sa_InvType: "S",
            sa_SalesType: "R",
            sa_PaytypeID: 1,
            sa_CardNo: null,
            sa_CardAmt: 0,
            sa_CardType: null,
            sa_AuthCode: "0",
            sa_TotQty: validInvoiceItems.reduce((sum, item) => sum + item.quantity, 0),
            sa_TotAmt: validInvoiceItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0),
            sa_DiscAmt: 0,
            sa_VATAmt: validInvoiceItems.reduce((sum, item) => sum + item.vat, 0),
            sa_TotCost: validInvoiceItems.reduce((sum, item) => sum + item.totalcost, 0),
            sa_OrderID: null,
            sa_PickingID: null,
            sa_SalesmanID: 1,
            sa_DeliveryNotes: deliveryNotes || null,
            sa_Notes: notes || null,
            sa_PayDate: new Date().toISOString(),
            sa_CreatedBy: 1,
            sa_JobCardId: null,
            sa_BrId: 3,
            sa_RetAmt: 0,
            sa_DepositAmt: validInvoiceItems.reduce((sum, item) => sum + item.netamt, 0),
            updateMainOnly: false,

            salesDetail: validInvoiceItems.map((item, index) => ({
                saDet_Id: 0,
                saDet_RowNo: index + 1,
                saDet_MainId: 0,
                saDet_UnitDetID: item.unitdetid,
                saDet_Type: 'B',
                saDet_Qty: item.quantity,
                saDet_Price: item.price * item.quantity,
                saDet_ActualPrice: item.price * item.quantity,
                saDet_DiscPerc: 0,
                saDet_TotCost: item.totalcost,
                saDet_VATPerc: item.vatPerc,
                saDet_ItemTaxCode: 1001
            })),

            serialDetail: validInvoiceItems.flatMap(item =>
                item.serialNumbers.map(serialNo => ({
                    trans_Id: 0,
                    trans_TableId: 0,
                    trans_Flag: 0,
                    trans_PriceId: 0,
                    trans_SerialId: 0,
                    trans_UnitDetId: item.unitdetid,
                    trans_SrlNo: serialNo
                }))
            )
        };

        console.log("Payload being sent:", payload);

        // Call API to save invoice
        const response = await saveInvoice(payload);

        if (response.success) {
          Swal.fire({
                         title: "Success!",
                         text: "Invoice saved successfully!",
                         icon: "success",
                         confirmButtonText: "OK"
                       });
            setInvoiceItems([]); // Clear invoice items after saving

            setDueDate(""); 
            setSelectedCustomer("");
            setSerialNumber("");
            setSelectedSalesman("");

        } else {
            alert("Error saving invoice: " + response.message);
        }
    } catch (error) {
        console.error("Error saving sales invoice:", error);
    }
};

  

  const tableFlag = 5;
  const callCheckSerialStatus = async (
    serialNo,
    tableFlag,
    payTypeID,
    customerID,
    jobCardID,
    invoiceID,
    salesType,
    toBrID,
    vendorID,
    saMechID,
    saMechGrpID
  ) => {
    try {
      const requestData = {
        SerialNo: serialNo,
        FlagToCheck: tableFlag,
        PaytypeID: payTypeID,
        CustID: customerID,
        JobCardID: jobCardID,
        InvID: invoiceID,
        SalesType: salesType,
        ToBrID: toBrID,
        VndrID: vendorID,
        SalesMechID: saMechID,
        SalesMechGrpID: saMechGrpID
      };

      const response = await FetchCheckSrls(requestData);

      if (
        !response ||
        !response.serialStatus ||
        !response.transactionStatus ||
        response.transactionStatus.length === 0 ||
        response.transactionStatus[0]?.finalStatus === -1
      ) {
        try {
          const payload = {
            Susp_ID: 0,
            Susp_SerialNo: serialNo,
            Susp_TxnDet: "sxs",
            Susp_InvNo: 0,
            Susp_ErrMsg: "No txn info",
            Susp_SysName: "System",
            Susp_BrID: 3,
            Susp_EnteredBy: 1
          };

          await saveSuspectedSrl(payload);
        } catch (error) {
          console.error("Error logging suspected serial:", error);
        }

        alert("Unknown Status. The system returned no transaction information for this serial.\nالنظام لم تحصل على أية معلومات المعاملات لهذا المسلسل. يرجى الاتصال بالمسؤول");
        return null;
      }

      const finalStatus = response.transactionStatus[0]?.finalStatus ?? -1;

      if (finalStatus !== 1) {
        alert(`Transaction Status: ${finalStatus}. Please check with administrator.`);
        return null;
      }

      console.log("Serial Status:", response.serialStatus);
      console.log("Transaction Status:", response.transactionStatus);

      // Ensure serialInfo is always an array
      const serialInfoArray = Array.isArray(response.serialStatus) ? response.serialStatus : [response.serialStatus];

      let serials = [serialNo];
      if (response.parentChildSerials && response.parentChildSerials.length > 0) {
        serials = serials.concat(response.parentChildSerials.map(s => s.Serial_No));
      }

      for (const sNo of serials) {
        try {
          const logResponse = await saveLogSrl(sNo, tableFlag, "SomeFormIdentifier", "System", "admin");

          console.log("API Response:", logResponse);

          if (!logResponse.success) {
            alert(`Serial number ${sNo} or its related parent/child serial is present in another pending invoice.`);
            return false;
          }
        } catch (error) {
          console.error("Error in saveLogSrl:", error);

          if (error.response) {
            console.error("Server Error Details:", error.response.data);
            alert(`Server Error: ${error.response.data.statusMessage || "An unknown error occurred."}`);
          } else {
            alert(`Unexpected Error: ${error.message}`);
          }

          return false;
        }
      }

      // Store all updated invoice items
      const updatedInvoiceItems = [];

      for (const serialInfo of serialInfoArray) {
        const currSpCol = tableFlag === "PRet" ? "Cp" : "CurrSp";

        if (serialInfo[currSpCol] <= 0) {
          alert("Price must be greater than zero.");
          return null;
        }

        if (tableFlag === "Sales" && serialInfo["AvgCost"] <= 0) {
          alert("Cost price must be greater than zero.");
          return null;
        }

        const itemcode = serialInfo.itemNo;
       
       const unitdetid=serialInfo.unitDetId
        // Fetch VAT details for each item


        // Fetch VAT percentage using `fetchvat`
        const vatPerc = await fetchvat(itemcode); // Now returns taxPerc directly
        console.log(`Fetched VAT Percentage for item ${itemcode}:`, vatPerc);

        const price = serialInfo.currSp;
        const vat = (price * vatPerc) / 100; // Calculate VAT amount
        const total = price + vat; // Calculate total price including VAT







        // Add each item to invoice
        setInvoiceItems((prevItems) => {
          const existingIndex = prevItems.findIndex(item => item.unitdetid === unitdetid);

          if (existingIndex !== -1) {
            alert("update");

            // **Item exists, increase quantity and update total**
            const updatedItems = [...prevItems];
            updatedItems[existingIndex].quantity += 1;

            // **Recalculate VAT based on new quantity**
            updatedItems[existingIndex].vat = (updatedItems[existingIndex].price * updatedItems[existingIndex].vatPerc) / 100 * updatedItems[existingIndex].quantity;

            // **Recalculate total**
            updatedItems[existingIndex].total = updatedItems[existingIndex].quantity * updatedItems[existingIndex].price + updatedItems[existingIndex].vat;

            // **Update net amount**
            updatedItems[existingIndex].netamt = updatedItems[existingIndex].total;

            updatedItems[existingIndex].totalcost = updatedItems[existingIndex].quantity * updatedItems[existingIndex].totalcost;

            updatedItems[existingIndex].serialNumbers.push(serialInfo.serial_No);

            return updatedItems;
          } else {

            alert("insert");
            // **Item does not exist, add new row**
            return [
              ...prevItems,
              {
                code: serialInfo.serial_No,
                itemNo: serialInfo.itemId,
                itemName: serialInfo.nameFull,
                quantity: 1, // Default quantity
                price: serialInfo.currSp, // Current selling price
                vat: vat, // VAT amount
                total: total, // Total price including VAT
                stockCode: serialInfo.stockCode,
                partNo: serialInfo.partNo,
                location: serialInfo.loc,
                currentStock: serialInfo.currStock,
                unit: serialInfo.unit,
                factor: serialInfo.factor,
                actualPrice: serialInfo.actualSp,
                vatPerc: vatPerc, // VAT percentage
                itemTaxCode: serialInfo.stockCode,
                totalcost: serialInfo.avgCost,
                netamt: total,
                type: 'R',
                unitdetid:serialInfo.unitDetId,
                serialNumbers: [serialInfo.serial_No], 
              }
            ];
          }
        });
      }

      // Update the invoice state with all serials
      setInvoiceItems(prevItems => [...prevItems, ...updatedInvoiceItems]);

      console.log("srls ",invoiceItems)
      return response;
    } catch (error) {
      console.error("Error calling Check_SrlStatus API:", error);
      return null;
    }
  };

  const IdentifyBarcodeBus = (barcode) => {


    let serialNo = "";

    if (!barcode || barcode.trim() === "") {
      return { isValid: false, serialNo: "" };
    }

    // Check if barcode starts with a prefix like [003]
    const prefixMatch = barcode.match(/^\[\d{3}\]/); // Matches [003], [001], etc.

    if (!prefixMatch) {
      // Extract BusCode: If barcode contains "[" and "]" and length > 4, take the first 5 characters
      let busCode = (barcode.includes("[") && barcode.includes("]") && barcode.length > 4)
        ? barcode.substring(0, 5)
        : barcode;

      serialNo = barcode.replace(busCode, "");
      return { isValid: false, serialNo };
    }

    // Remove prefix like [003] to extract serial number
    serialNo = barcode.replace(prefixMatch[0], "");

    return { isValid: true, serialNo };
  };

  const handleKeyPress = async (e) => {  // Made the function async
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission

      const trimmedSerial = serialNumber.trim().replace(/\*/g, ""); // Trim & remove '*'

      const ITEMCODE_LENGTH = 5;

      if (!trimmedSerial.length) {
        setIsBarcodeValid(false);
        return;
      }

      // Check if barcode contains '-'
      if (!trimmedSerial.includes("-")) {
        alert("Serial Number not valid");
        setIsBarcodeValid(false);
        return;
      }

      // Identify barcode using IdentifyBarcodeBus
      const { isValid, serialNo } = IdentifyBarcodeBus(trimmedSerial);

      console.log("Index of '-':", trimmedSerial.indexOf("-"));
      console.log("ITEMCODE_LENGTH:", ITEMCODE_LENGTH);

      if (!isValid) {
        alert("Suspicious serial number");
        setIsBarcodeValid(false);
        return; // Later implement saving of suspected serial number
      }

      // Check if '-' is at the correct position
      if (!trimmedSerial.indexOf("-") == ITEMCODE_LENGTH) {  // Fixed comparison
        alert("Invalid serial number format");
        setIsBarcodeValid(false);
        return;
      }

      if (!selectedCustomer) {
        alert("Please select a customer.\nالرجاء اختيار الزبون");
        return false;
      }

      try {


        const result = await ProcessSerial(
          serialNo,
          1, // Hardcoded AppLogin.CurrentBranchID = 1
          '18976_FrmSales_1840852', // Hardcoded base.___FormUID = '18976_FrmSales_1840852'
          '1' + '(00001)Admin', // Hardcoded UserID, EmployeeCode, EmployeeNameEn
          1, // Hardcoded CustOrPayId = 1
          null, // Hardcoded JobCardId = null
          null, // Hardcoded InvID = null
          'R', // Hardcoded SalesType = 'R'
          null, // Hardcoded strMechId = null
          null, // Hardcoded strMechGrpId = null
          null  // Hardcoded this._CreateFromPLQuotation = null
        );

        console.log("Valid Serial Number:", serialNo);
        setIsBarcodeValid(true);

        const TableFlag = 5;
        const PaytypeID = 1;
        const CustomerID = null;
        const JobCardId = null;
        const InvoiceID = null;
        const SalesType = 'R';
        const ToBrID = null;
        const VendorID = null;
        const SaMechId = null;
        const SaMechGrpId = null;

        await callCheckSerialStatus(
          serialNo,
          TableFlag,  // Assuming you have a state or value for TableFlag
          PaytypeID,
          CustomerID,
          JobCardId,
          InvoiceID,
          SalesType,
          ToBrID,
          VendorID,
          SaMechId,
          SaMechGrpId
        );












      } catch (error) {
        console.error("Error processing serial:", error);
        alert("An error occurred while processing the serial number.");
      }
    }
  };
  const handleQuantityChange = (index, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].quantity = value;
    updatedItems[index].total = value * updatedItems[index].price;
    setInvoiceItems(updatedItems);
  };

  const handlePriceChange = (index, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].price = value;
    updatedItems[index].total = updatedItems[index].quantity * value;
    setInvoiceItems(updatedItems);
  };


  const handleCheckboxChange = (event) => {
    console.log("Before Update:", selectedItem);
  
    if (!event.target.checked) {
      setSelectedItem((prev) => {
        if (!prev || prev.quantity <= 0) return prev; // Prevent negative values
  
        // Reduce quantity by 1
        const newQuantity = Math.max(prev.quantity - 1, 0);

        const avgCost = prev.totalcost / prev.quantity ;
        const updatedTotalCost = avgCost * newQuantity; // Proportional reduction
  
        // Ensure calculations are numbers
        const updatedItem = {
          ...prev,
          quantity: newQuantity,
          netamt: (prev.actualPrice * newQuantity)+(prev.vatPerc / 100) * prev.price * newQuantity,  // No .toFixed()
          totalcost: updatedTotalCost,
          vat: (prev.vatPerc / 100) * prev.price * newQuantity,
          serialNumbers: prev.serialNumbers.slice(0, newQuantity), // Adjust serial numbers
        };
  
        console.log("After Update:", updatedItem);
  
        // Update invoiceItems list
        setInvoiceItems((prevItems) =>
          prevItems.map((item) =>
            item.itemNo === updatedItem.itemNo ? updatedItem : item
          )
        );
  
        return updatedItem;
      });
    }
  };
  
  
  











  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>


          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4"> Sales Customer </h4>
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
                            <span className="number">1.</span> Sales To  Customer
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
                            //disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Sales List
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
                                  <Input
                                    type="text"
                                    id="basicpill-itemcode-input1"
                                    className="form-control"
                                    value={inputValues.code}
                                    readOnly
                                    style={{ backgroundColor: "#f0f0f0", color: "#333", cursor: "not-allowed" }}
                                  />
                                </div>
                              </Col>

                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="invoiceDate">Invoice Date</Label>
                                  <Input
                                    type="date"
                                    id="invoiceDate"
                                    className="form-control noneditinp"
                                    value={invoiceDate}
                                    readOnly
                                    style={{ backgroundColor: "#f0f0f0", color: "#333", cursor: "not-allowed" }}
                                  />
                                </div>
                              </Col>

                              {/* Due Date */}
                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="dueDate">Invoice Due Date</Label>
                                  <Input
                                    type="date"
                                    id="dueDate"
                                    className="form-control"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    min={minDueDate}
                                  />
                                </div>
                              </Col>

                              <Col lg="3">
                                <div className="mb-3">
                                  <Label for="vendorSelect">Picking List</Label>
                                  <Select
                                    options={ItemVendor.map((vendor) => ({
                                      value: vendor.vendor_Id,
                                      label: `${vendor.vendor_Code} ~ ${vendor.vendor_NameEn} ~ ${vendor.vendor_NameAr}`,
                                    }))}
                                    placeholder="Select Picking List"
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    onChange={(selected) => setselectedVendors(selected)}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="4">
                                <div className="mb-3">
                                  <Label>Customer</Label>
                                  <Select
                                    options={Customer.map((customer) => ({
                                      value: customer.cust_Code,
                                      label: `${customer.cust_Code} ~ ${customer.cust_BrRelCode} ~ ${customer.cust_NameEn}~${customer.cust_NameAr}`,
                                    }))}
                                    placeholder="Select Customer"
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    onChange={(selected) => setSelectedCustomer(selected)}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="mb-3">
                                  <Label>Sales Man</Label>
                                  <Select
                                    options={Salesman.map((salesman) => ({
                                      value: salesman.emp_Id,
                                      label: `${salesman.emp_Code} ~ ${salesman.emp_MainCode} ~ ${salesman.emp_NameEn} ~ ${salesman.emp_NameAr}`

                                    }))}
                                    placeholder="Select Sales Man"
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    onChange={(selected) => setSelectedSalesman(selected)}
                                  />
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="mb-3">
                                  <Label>Pay Type</Label>
                                  <Select
                                    options={[
                                      { value: "cash", label: "Cash" },
                                      { value: "credit", label: "Credit" },
                                      { value: "cash-credit", label: "Cash-Credit" }
                                    ]}
                                    placeholder="Select Pay Type"
                                    classNamePrefix="select2-selection"
                                    isClearable
                                    onChange={(selected) => setPaytype(selected)}
                                  />
                                </div>
                              </Col>

                            </Row>

                            <Row>
                            <Col lg="4">
  <div className="mb-3">
    <Label for="notes">Notes</Label>
    <Input
      type="text"
      id="notes"
      className="form-control"
      placeholder="Enter Notes"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
    />
  </div>
</Col>

<Col lg="4">
  <div className="mb-3">
    <Label for="deliveryNotes">Delivery Notes</Label>
    <Input
      type="text"
      id="deliveryNotes"
      className="form-control"
      placeholder="Enter Delivery Notes"
      value={deliveryNotes}
      onChange={(e) => setDeliveryNotes(e.target.value)}
    />
  </div>
</Col>


                              <Col lg="4">
                                <div className="mb-3">
                                  <Label for="serialNumber">Serial Number</Label>
                                  <Input
                                    type="text"
                                    id="serialNumber"
                                    className={`form-control ${!isBarcodeValid ? "is-invalid" : ""}`}
                                    placeholder="Enter Serial Number"
                                    value={serialNumber}
                                    onChange={(e) => setSerialNumber(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                  />
                                  {!isBarcodeValid && <div className="invalid-feedback">Invalid Serial Number</div>}
                                </div>
                              </Col>
                            </Row>

                            {/* Invoice Grid */}
                            <Row>
  <Col lg="12">
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table className="table table-bordered table-striped" style={{ width: "100%", tableLayout: "auto", minWidth: "1800px", whiteSpace: "nowrap" }}>
        <thead className="table-light" style={{ position: "sticky", top: 0, zIndex: 2, background: "#fff" }}>
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
         <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>

              <td>{index + 1}</td>
              <td>{item.itemNo}</td>
              <td>{item.partNo}</td>
              <td style={{ minWidth: "200px" }}>{item.itemName}</td>
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
            <td colSpan="6" className="text-end"><strong>Totals:</strong></td>
            <td><strong>{invoiceItems.reduce((sum, item) => sum + (item.quantity || 0), 0)}</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>{invoiceItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>{invoiceItems.reduce((sum, item) => sum + (item.vat || 0), 0).toFixed(2)}</strong></td>
            <td><strong>{invoiceItems.reduce((sum, item) => sum + (item.netamt || 0), 0).toFixed(2)}</strong></td>
            <td><strong>{invoiceItems.reduce((sum, item) => sum + (item.totalcost || 0), 0).toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </Col>
</Row>



                                


{showSaveButton && (
  <button type="button" className="btn btn-success" onClick={saveSalesInvoice}>
    <i className="fas fa-save"></i> Save Invoice
  </button>
)}





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
          {selectedItem.serialNumbers?.map((serial, index) => {
            // Calculate the individual cost per serial based on avg cost
            const avgCost =
              selectedItem.totalcost / selectedItem.serialNumbers.length || 0;

            return (
              <tr key={serial}>
                <td>{index + 1}</td>
                <td>{serial}</td>
                <td>{serial}</td>
                <td>{selectedItem.unit}</td>
                <td>{selectedItem.price}</td>
                <td>{avgCost}</td> {/* Show individual serial cost */}
                <td>
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={(e) => handleCheckboxChange(e, serial)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    



                          </Form>
                        </TabPane>


                        <TabPane tabId={2}>
                          <div className="page-content">
                            <div className="container-fluid">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Sales Invoices </h4>

                              </div>

                              {loading ? (
  <div className="text-center my-5">
    <ClipLoader color="#007bff" size={50} />
    <p>Loading data, please wait...</p>
  </div>
) : (
  <TableContainer1
    columns={columns}
    data={data || []}
    isGlobalFilter={true}
    isPagination={true}
    SearchPlaceholder="Search for Sales Invoice ..."
    pagination="pagination"
    paginationWrapper="dataTables_paginate paging_simple_numbers"
    tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
    loading={loading}
    getRowProps={(row) => ({
      onClick: (e) => {
        const button = e.target.closest("button");
        if (!button) {
          e.preventDefault(); // Prevent default row click
          e.stopPropagation(); // Stop event bubbling
        }
      },
      style: { cursor: "default" }, // Set default cursor to avoid clickable look
    })}
  />
)}



        
                            
                            </div>
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
                          className={activeTab === 2 ? "next disabled" : "next"}
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}


export default SalesCustomer
