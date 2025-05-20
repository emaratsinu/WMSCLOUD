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
import "../Master/ownstyle.css"
import { Spinner } from "react-bootstrap";


import { fetchNextItemCode,fetchItemName,fetchItemPrefix ,fetchItemVat,  fetchItemOems,fetchNextItemNameCode,saveItemName,
    fetchNextItemOemCode, saveOem,fetchPartCode, savePartCode, fetchNextPartCode,fetchItemGroup,fetchNextGrpCode, saveItemGroup,fetchItemManufacture,
    fetchItemCountry,fetchNextCountryCode,saveItemCountry,fetchItemList,fetchItemUnit,fetchNextUnitCode,saveItemUnit,fetchCarMakeById,
    fetchItemLocation,SaveItemMain,fetchNextUnitRowNo,fetchNextCarDetRowNo,fetchNextVendorRowNo,fetchNextItemPrfxCode,fetchItemCarDetails,fetchNextLocationDetRowNo,uploadFile,fetchItemDlts
} from "../../components/Api/itemApiService";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Container, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, Button, Modal } from "reactstrap";

import classnames from "classnames"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"
//import { inputCSS } from 'react-select/dist/declarations/src/components/Input';


const ItemAdd = () => {

  const [errors, setErrors] = useState({});

  const [carDetails, setCarDetails] = useState([
    { selectedCarModel: null, fromYear: "", toYear: "", carMake: "" },
  ]);
  // Ensures a new reference

  const [carGridData, setCarGridData] = useState([]);
  
  const [loadingItemId, setLoadingItemId] = useState(null);
      const [itemname, setitemname] = useState([]);
      const [ItemPrefix, setItemPrefix] = useState([]);
      const [ItemVat, setItemVat] = useState([]);
      const [ItemCarDet, setCarDet] = useState([]);
      const [ItemOem, setItemOem] = useState([]);
      const [ItemPart, setItemPart] = useState([]);
      const [ItemGroup, setItemGroup] = useState([]);
      const [ItemManfacture, setItemManfacture] = useState([]);
      const [ItemCountry, setItemCountry] = useState([]);
      const [ItemUnit,setItemUnit]=useState([]);
      const [ItemLocation,setItemLocation]=useState([]);
      const [TotalCount, setTotalCount] = useState(0); // 
      
      const [uploadedFileName, setUploadedFileName] = useState("");
      const [ItemVendor, setItemVendor]=useState([]);
      const [selectedFiles, setselectedFiles] = useState([]);
      const [selectedRow, setSelectedRow] = useState(null);  // Store clicked row data
     // recent saved  show in dropdown  
      const [selectedItem, setSelectedItem] = useState(null); 
      const [selectedVat, setSelectedVat] = useState(null); 
      const [selectedOems, setSelectedOems] = useState(null);
      const [selectedParts, setSelectedParts] = useState(null);
      const [selectedGroups, setSelectedGroups] = useState(null);
      const [selectedCountries, setSelectedCountries] = useState(null);
      const [selectedVendors, setselectedVendors] = useState(null);
      const [selectedLocations, setSelectedLocations] = useState(null);
      const [selectedCarModel, setSelectedCarModel] = useState(null);
      const [selectedItemPrefix, setSelectedItemPrefix] = useState(null);
      const [selectedManufacture, setSelectedManufacture] = useState(null);
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

const [inputValues, setInputValues] = useState({ id:"",code: "", namecode: "", ItemNameEn: "", itemNameAr: "", itemNameId: "", oemcode: "", oemNo: "", partCode: "", partCodeName: "", partType: "", grpcode: "", grpNameEn: "", grpNameAr: "", countryCode: "", countryNameEn: "", countryNameAr: "", unitcode: "", unitNameEN: "", unitNameAr: "", vendorcode: "", vendorNameEn: "", vendorNameAr: "", timefix: "", DesEn: "", DesAr: "", MaxQty: "", MinQty: "",
   ManfPartNo: "", AgentPrice: "", EcoOrdrQty: "", ManfBar1: "", Manf2Bar2: "", Notes: "",Quality:"",UnitRowNo:"",VendorRowNo:"",CarDetNo:"", ItemPrefixId:"", FromYear:"",ToYear:"",LocationDetNo:"",});

      useEffect(() => {
        fetchNextCode();
        fetchItemname();
        fetchItemprefix();
        fetchItemtax();
        fetchItemOem();
        fetchPrtCode();
        fetchItemGrp();
        fetchItemManf();
        fetchCountry();
        fetchAndSetItemList(pageNumber,pageSize);
        fetchUnit();
       
        fetchLocation();
        fetchNextUnitRow();
        fetchNextVendorRow();
        fetchNextCarDetRow();
        fetchNextlocDetRow();
        fetchItemCardet();
       
      }, []);

      useEffect(() => {
        if (carGridData.length > 0) {
          const updatedCarDetails = carGridData.map((data) => ({
            selectedCarModel: {
              value: data.modelId,
              label: `${data.modelEn} ~ ${data.modelAr}`,
            },
            fromYear: data.yearFrom || "",
            toYear: data.yearTo || "",
            carMake: data.makeEn || "",
          }));
          
          setCarDetails(updatedCarDetails);
          console.log("Updated carDetails:", updatedCarDetails);
        }
      }, [carGridData]); // Runs when carGridData changes
      

      const [showInputFields, setShowInputFields] = useState(false);

      const handleDropdownChange = (index, field, selectedOption) => {
        setCarDetails((prevDetails) => {
          const updatedDetails = [...prevDetails];
      
          updatedDetails[index] = {
            ...updatedDetails[index],
            [field]: selectedOption,
            carMake: selectedOption ? findCarMake(selectedOption.makeId) : "", // Fetch Car Make using makeId
          };
      
          return updatedDetails;
        });
      };
      

      const findCarMake = (makeId) => {
        const foundMake = ItemCarDet.find((item) => item.model_MakeId === makeId);
        return foundMake ? `${foundMake.make_NameEn} ~ ${foundMake.make_NameAr}` : "";
      };
      
    
      // Handle input changes
      const handleInputcarChange = (index, field, event) => {
        const { value } = event.target;
        setCarDetails((prevDetails) => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = {
                ...updatedDetails[index],
                [field]: value,
            };
            return updatedDetails;
        });
    };
    
    
      // Add a new row
      const addcarRow = () => {
        setCarDetails([...carDetails, { selectedCarModel: null, fromYear: "", toYear: "", carMake: "" }]);
      };
    
      // Remove a row
      const removecarRow = (index) => {
        const updatedCarDetails = carDetails.filter((_, i) => i !== index);
        setCarDetails(updatedCarDetails);
      };
    
       const fetchItemOem = async () => {
        
       
          try {
            const ItemOemData = await fetchItemOems();
            if (ItemOemData) setItemOem(ItemOemData);
          } catch (error) {
            console.error("Error fetching item name  options:", error);
          }
        };


        const handleViewEditClick = async (id) => {
          setLoadingItemId(id); // Show loader before fetching
      
          try {
              const response = await fetchItemDlts(id);
              console.log("API Response:", response);
      
              if (response && response.length > 0) {
                  const itemDetails = response[0];
                  console.log("Item Details:", itemDetails);
      
                  setInputValues((prev) => ({
                      ...prev,
                      id: itemDetails.item_Id,
                      code: itemDetails.item_Code || "",
                      DesEn: itemDetails.item_DescEn || "",
                      DesAr: itemDetails.item_DescAr || "",
                      MaxQty: itemDetails.item_MaxPackingQty || "",
                      MinQty: itemDetails.item_MinPackingQty || "",
                      ManfPartNo: itemDetails.item_MfrPartNo || "",
                      AgentPrice: itemDetails.item_AgentPrice || "",
                      EcoOrdrQty: itemDetails.item_EcoOrderQty || "",
                      Quality: itemDetails.item_Quality || "",
                      ManfBar1: itemDetails.item_Barcode1 || "",
                      Manf2Bar2: itemDetails.item_Barcode2 || "",
                      Notes: itemDetails.item_Notes || "",
                  }));
      
                  setSelectedItem({
                      value: itemDetails.item_NameId,
                      label: `${itemDetails.itemN_NameEn} ~ ${itemDetails.itemN_NameAr}`,
                  });
      
                  setSelectedItemPrefix({
                      value: itemDetails.item_PrefixId,
                      label: itemDetails.item_PrefixCode,
                  });
      
                  setSelectedGroups({
                      value: itemDetails.item_GroupId,
                      label: `${itemDetails.item_GroupEn} ~ ${itemDetails.item_GroupAr}`,
                  });
      
                  setSelectedParts({
                      value: itemDetails.item_PartCodeId,
                      label: itemDetails.partC_Partcode,
                  });
                  setSelectedVat({
                    value: itemDetails.taxMastCode,
                    label: `${itemDetails.taxMastCode} ~ ${itemDetails.taxNameEn} ~ ${itemDetails.taxNameAr} ~ ${itemDetails.taxPerc}`,
                });
      
                  setSelectedManufacture({
                      value: itemDetails.item_MfrId,
                      label: `${itemDetails.item_ManufacturerEn} ~ ${itemDetails.item_ManufacturerAr}`,
                  });
      
                  setSelectedCountries({
                      value: itemDetails.item_CountryId,
                      label: itemDetails.item_Country,
                  });
      
                  const oemIds = [
                      itemDetails.item_OemId1,
                      itemDetails.item_OemId2,
                      itemDetails.item_OemId3,
                      itemDetails.item_OemId4,
                      itemDetails.item_OemId5,
                      itemDetails.item_OemId6,
                  ].filter(Boolean);
      
                  setSelectedOems(
                      oemIds.map((oemId) => {
                          const matchedOem = ItemOem.find((item) => item.oeM_Id === oemId);
                          return matchedOem ? { value: matchedOem.oeM_Id, label: matchedOem.oeM_Number } : null;
                      }).filter(Boolean)
                  );
      
                  // ✅ Process car details for grid binding
                  const modelIds = itemDetails.model_IDs ? itemDetails.model_IDs.split(", ") : [];
                  const modelYears = itemDetails.model_Years ? itemDetails.model_Years.split(", ") : [];
                  const modelNamesEn = itemDetails.model_Names_En ? itemDetails.model_Names_En.split(", ") : [];
                  const modelNamesAr = itemDetails.model_Names_Ar ? itemDetails.model_Names_Ar.split(", ") : [];
                  const makeIds = itemDetails.make_Ids ? itemDetails.make_Ids.split(", ") : [];
                  const makeNamesEn = itemDetails.make_Names_En ? itemDetails.make_Names_En.split(", ") : [];
                  const makeNamesAr = itemDetails.make_Names_Ar ? itemDetails.make_Names_Ar.split(", ") : [];
      
                  const carGridData = modelIds.map((modelId, index) => ({
                      modelId: modelId || "",
                      makeId: makeIds[index] || "",
                      makeEn: makeNamesEn[index] || "",
                      makeAr: makeNamesAr[index] || "",
                      modelEn: modelNamesEn[index] || "",
                      modelAr: modelNamesAr[index] || "",
                      yearFrom: modelYears[index] ? modelYears[index].split("-")[0] : "",
                      yearTo: modelYears[index] ? modelYears[index].split("-")[1] : "",
                  }));
      
                  console.log("Final Car Grid Data:", carGridData);
      
                  // ✅ Update car grid state
                  setCarGridData(carGridData);
      
                  // ✅ Update car details state properly
                  setCarDetails(
                      carGridData.map((data) => ({
                          selectedCarModel: {
                              value: data.modelId,
                              label: `${data.modelEn} ~ ${data.modelAr}`,
                          },
                          fromYear: data.yearFrom || "",
                          toYear: data.yearTo || "",
                          carMake: data.makeEn || "",
                      }))
                  );
      
                  console.log("Updated Car Details:", carDetails);
              }
          } catch (error) {
              console.error("Error fetching item details:", error);
          } finally {
              setLoadingItemId(null); // ✅ Hide loader after all data is processed
              toggleTab(1); // ✅ Switch tab after everything is loaded
          }
      };
      
      
        
        


        const fetchItemname = async () => {
       
            try {
              const ItemnameData = await fetchItemName();
              if (ItemnameData) setitemname(ItemnameData);
            } catch (error) {
              console.error("Error fetching item name  options:", error);
            }
          };

        const fetchItemtax = async () => {
       
            try {
              const ItemVatData = await fetchItemVat();
              if (ItemVatData) setItemVat(ItemVatData);
            } catch (error) {
              console.error("Error fetching item vat  options:", error);
            }
          };




          const fetchItemCardet = async () => {
       
            try {
              const ItemCarData = await fetchItemCarDetails();
              if (ItemCarData) setCarDet(ItemCarData);
            } catch (error) {
              console.error("Error fetching item vat  options:", error);
            }
          };
          const fetchPrtCode = async () => {
       
            try {
              const ItemPartData = await fetchPartCode();
              if (ItemPartData) setItemPart(ItemPartData);
            } catch (error) {
              console.error("Error fetching item Part Code   options:", error);
            }
          };
        const fetchItemprefix  = async () => {
       
            try {
              const ItemPrefixData = await fetchItemPrefix();
              if (ItemPrefixData) setItemPrefix(ItemPrefixData);
            } catch (error) {
              console.error("Error fetching item name  options:", error);
            }
          };

          const fetchItemGrp = async () => {
       
            try {
              const ItemGroupData = await fetchItemGroup();
              if (ItemGroupData) setItemGroup(ItemGroupData);
            } catch (error) {
              console.error("Error fetching item group  options:", error);
            }
          };
        

          const fetchItemManf = async () => {
       
            try {
              const ItemManfactureData = await fetchItemManufacture();
              if (ItemManfactureData) setItemManfacture(ItemManfactureData);
            } catch (error) {
              console.error("Error fetching item Manfacture  options:", error);
            }
          };

          const fetchCountry = async () => {
       
            try {
              const ItemCountryData = await fetchItemCountry();
              if (ItemCountryData) setItemCountry(ItemCountryData);
            } catch (error) {
              console.error("Error fetching item Manfacture  options:", error);
            }
          };
          const fetchCarMake = async (model_MakeId, index) => {
            try {
                const carMakeData = await fetchCarMakeById(model_MakeId); // Fetch data using model_MakeId
        
                if (carMakeData) {
                    const updatedCarDetails = [...carDetails];
                    updatedCarDetails[index].carMake = `${carMakeData.make_NameEn} ~ ${carMakeData.make_NameAr}`; // Bind data
                    setCarDetails(updatedCarDetails);
                }
            } catch (error) {
                console.error("Error fetching Car Make:", error);
            }
        };
        
          const fetchLocation= async () => {
       
            try {
              const ItemLocationData = await fetchItemLocation();
              if (ItemLocationData) setItemLocation(ItemLocationData);
            } catch (error) {
              console.error("Error fetching item  Units :", error);
            }
          };
    
    const fetchNextCode = async () => {
       
        try {
          const data = await fetchNextItemCode();
          setInputValues((prev) => ({ ...prev, code: data.nextNumber }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };



      const fetchNextUnitRow= async () => {
       
        try {
          const data = await fetchNextUnitRowNo();
          setInputValues((prev) => ({ ...prev, UnitRowNo: data.nxtItemUnitRowNo }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };


      const fetchNextVendorRow= async () => {
       
        try {
          const data = await fetchNextVendorRowNo();
          setInputValues((prev) => ({ ...prev, VendorRowNo: data.nxtItemVendorRowNo }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };


      const fetchNextCarDetRow= async () => {
       
        try {
          const data = await fetchNextCarDetRowNo();
          setInputValues((prev) => ({ ...prev, CarDetNo: data.nxtItemCarDetRowNo }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };
      

      const fetchNextlocDetRow= async () => {
       
        try {
          const data = await fetchNextLocationDetRowNo();
          setInputValues((prev) => ({ ...prev, LocationDetNo: data.nextLocationRowNo }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };







      const fetchNextgrpcode = async () => {
       
        try {
          const data = await fetchNextGrpCode();
          setInputValues((prev) => ({ ...prev, grpcode: data.nextNumberGrp }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };


      const fetchNextpartCode = async () => {
       
        try {
          const data = await fetchNextPartCode();
          setInputValues((prev) => ({ ...prev, partCode: data.nextPartCode }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };


      const fetchNextItemnameCode = async () => {
      
       
        try {
          const data = await fetchNextItemNameCode();
          setInputValues((prev) => ({ ...prev, namecode: data.nxtItemNameCode }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };

      const fetchNextOemCode = async () => {
       
        try {
          const data = await fetchNextItemOemCode();
          setInputValues((prev) => ({ ...prev, oemcode: data.nextNumberOem }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };


      const fetchNextCountrycode = async () => {
       
        try {
          const data = await fetchNextCountryCode();
          setInputValues((prev) => ({ ...prev, countryCode: data.nxtCountryCode }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      };


      const fetchNextUnitcode = async () => {
       
        try {
          const data = await fetchNextUnitCode();
          setInputValues((prev) => ({ ...prev, unitcode: data.nextUnitCode }));
        } catch (error) {
          Swal.fire("Error", "Failed to fetch the next code.", "error");
        }
      }; 
     
      



      const handleSave = async () => {
        if (!inputValues.itemNameAr || !inputValues.ItemNameEn) {
          Swal.fire("Error", "Both Name (En) and Name (Ar) are required.", "error");
          return;
        }
      
        try {
          const payload = {
            ItemN_Id: inputValues.itemNameId || 0,
            ItemN_Code: inputValues.namecode,
            ItemN_NameEn: inputValues.ItemNameEn,
            ItemN_NameAr: inputValues.itemNameAr,
            ItemN_CreatedBy: 169,
          };
      
          const response = await saveItemName(payload);
      
          if (response && response.success) {
            Swal.fire("Saved", "Item name saved successfully!", "success");
      
            const newItem = {
              itemN_Id: response.itemN_Id, // Ensure response contains new ID
              itemN_NameEn: inputValues.ItemNameEn,
              itemN_NameAr: inputValues.itemNameAr,
            };
      
            // Add new item to the dropdown list
            setitemname((prev) => [...prev, newItem]);
      
            // Automatically select the newly added item
            setSelectedItem({
              value: newItem.itemN_Id,
              label: `${newItem.itemN_NameEn} ~ ${newItem.itemN_NameAr}`,
            });
      
            // Clear input fields
            setInputValues({ itemNameId: null, namecode: "", ItemNameEn: "", itemNameAr: "" });
      
            // Fetch next item code if necessary
            fetchNextItemnameCode();
      
            // Close the modal
            tog_varyingModal();
          } else {
            Swal.fire("Error", response.statusMessage || "Failed to save Item name.", "error");
          }
        } catch (error) {
          console.error("Error saving item name:", error);
          Swal.fire("Error", "An unexpected error occurred.", "error");
        }
      };
      
        const handleCancel = () => {
          setShowInputFields(false);
          setInputValues({ id: null, code: "", NameEn: "", NameAr: "" }); // Reset values when cancel
        };

        const handleSaveOem = async () => {
          if (!inputValues.oemNo) {
            Swal.fire("Error", "OEM Number is required.", "error");
            return;
          }
        
          try {
            const payload = {
              OEM_Code: inputValues.oemcode,
              OEM_Number: inputValues.oemNo,
              OEM_CreatedBy: 169,
            };
        
            const response = await saveOem(payload);
        
            if (response && response.success) {
              Swal.fire("Saved", "OEM Number saved successfully!", "success");
        
              const newOem = {
                oeM_Id: response.oeM_Id, // Ensure response contains new ID
                oeM_Number: inputValues.oemNo,
              };
        
              // Add new item to the dropdown list
              setItemOem((prev) => [...prev, newOem]);
        
              // Automatically select the newly added OEM Number (multi-select)
              setSelectedOems((prev) => [
                ...(prev || []), // Keep previous selections
                { value: newOem.oeM_Id, label: newOem.oeM_Number },
              ]);
        
              // Clear input fields
              setInputValues({ oemcode: null, oemNo: "" });
        
              // Fetch next OEM code if necessary
              fetchNextOemCode();
        
              // Close the modal
              toggleOemNoModal();
            } else {
              Swal.fire("Error", response.statusMessage || "Failed to save OEM Number.", "error");
            }
          } catch (error) {
            console.error("Error saving OEM Number:", error);
            Swal.fire("Error", "An unexpected error occurred.", "error");
          }
        };
        

        const handleSavePartCode = async () => {
          if (!inputValues.partCodeName || !inputValues.partType) {
            Swal.fire("Error", "Part Code and Part Type are required.", "error");
            return;
          }
        
          try {
            const payload = {
              PartC_Id: 0,
              PartC_Code: inputValues.partCode,
              PartC_Partcode: inputValues.partCodeName,
              PartC_Type: inputValues.partType,
            };
        
            const response = await savePartCode(payload);
        
            if (response && response.success) {
              Swal.fire("Saved", "Part code saved successfully!", "success");
        
              const newPart = {
                id: response.partC_Id, // Ensure response contains new ID
                partCode: inputValues.partCodeName,
              };
        
              // Add new item to the dropdown list
              setItemPart((prev) => [...prev, newPart]);
        
              // Automatically select the newly added Part Code (multi-select)
              setSelectedParts((prev) => [
                ...(prev || []), // Keep previous selections
                { value: newPart.id, label: newPart.partCode },
              ]);
        
              // Clear input fields
              setInputValues({ partCode: "", partCodeName: "", partType: "" });
        
              // Fetch next part code if necessary
              fetchNextpartCode();
        
              // Close the modal
              togglePartModal();
            } else {
              Swal.fire("Error", response.statusMessage || "Failed to save part code.", "error");
            }
          } catch (error) {
            console.error("Error saving part code:", error);
            Swal.fire("Error", "An unexpected error occurred.", "error");
          }
        };
        
        
      
        const handleSaveGroup = async () => {
          if (!inputValues.grpNameEn || !inputValues.grpNameAr) {
            Swal.fire("Error", "Name En and Name Ar are required.", "error");
            return;
          }
        
          try {
            const payload = {
              ItemG_Code: inputValues.grpcode,
              ItemG_NameEn: inputValues.grpNameEn,
              ItemG_NameAr: inputValues.grpNameAr,
              ItemG_CreatedBy: 169,
            };
        
            const response = await saveItemGroup(payload);
        
            if (response && response.success) {
              Swal.fire("Saved", "Group saved successfully!", "success");
        
              const newGroup = {
                itemG_Id: response.itemG_Id, // Ensure response contains new ID
                itemG_NameEn: inputValues.grpNameEn,
                itemG_NameAr: inputValues.grpNameAr,
              };
        
              // Add new item to the dropdown list
              setItemGroup((prev) => [...prev, newGroup]);
        
              // Automatically select the newly added Group (multi-select)
              setSelectedGroups((prev) => [
                ...(prev || []), // Keep previous selections
                { value: newGroup.itemG_Id, label: `${newGroup.itemG_NameEn} ~ ${newGroup.itemG_NameAr}` },
              ]);
        
              // Clear input fields
              setInputValues({ grpNameEn: "", grpNameAr: "" });
        
              // Fetch next group code if necessary
              fetchNextgrpcode();
        
              // Close the modal
              toggleGroupModal();
            } else {
              Swal.fire("Error", response.statusMessage || "Failed to save group.", "error");
            }
          } catch (error) {
            console.error("Error saving group:", error);
            Swal.fire("Error", "An unexpected error occurred.", "error");
          }
        };
        


        const handleSaveUnit = async () => {
            // Validate required fields
            if (!inputValues.unitNameEN || !inputValues.unitNameAr) {
                Swal.fire("Error", "Name En  and Name Ar are Required .", "error");
                return;
            }
        
           
        
            try {
                // Prepare the payload
                const payload = {
                    
                    Unit_Code: inputValues.unitcode,
                    Unit_NameEn: inputValues.unitNameEN,
                    Unit_NameAr: inputValues.unitNameAr ,
                   
                   
                };
        
                // Call the service method to save the part code
                const response = await saveItemUnit(payload);
        
                // Handle success or failure response
                if (response && response.success) {
                    Swal.fire("Saved", "Unit saved successfully!", "success");
                    setShowInputFields(false);
                    fetchNextUnitcode();
                     setInputValues({  unitNameEN: "", unitNameAr: "" });
                   


                } else {
                    Swal.fire(
                        "Error",
                        response.statusMessage || "Failed to save unit code.",
                        "error"
                    );
                }
            } catch (error) {
                // Log and show error message
                console.error("Error saving unit code:", error);
                Swal.fire("Error", "An unexpected error occurred.", "error");
            }
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


          const handleSaveCountry = async () => {
            if (!inputValues.countryNameEn || !inputValues.countryNameAr) {
              Swal.fire("Error", "Name En and Name Ar are required.", "error");
              return;
            }
          
            try {
              const payload = {
                Country_Id: 0,
                Country_Code: inputValues.countryCode,
                Country_NameEn: inputValues.countryNameEn,
                Country_NameAr: inputValues.countryNameAr,
              };
          
              const response = await saveItemCountry(payload);
          
              if (response && response.success) {
                Swal.fire("Saved", "Country saved successfully!", "success");
          
                const newCountry = {
                  country_Id: response.country_Id, // Ensure response contains new ID
                  country_NameEn: inputValues.countryNameEn,
                  country_NameAr: inputValues.countryNameAr,
                };
          
                // Add new item to the dropdown list
                setItemCountry((prev) => [...prev, newCountry]);
          
                // Automatically select the newly added Country (multi-select)
                setSelectedCountries((prev) => [
                  ...(prev || []), // Keep previous selections
                  { value: newCountry.country_Id, label: `${newCountry.country_NameEn} ~ ${newCountry.country_NameAr}` },
                ]);
          
                // Clear input fields
                setInputValues({ countryNameEn: "", countryNameAr: "" });
          
                // Fetch next country code if necessary
                fetchNextCountrycode();
          
                // Close the modal
                toggleCountryModal();
              } else {
                Swal.fire("Error", response.statusMessage || "Failed to save country.", "error");
              }
            } catch (error) {
              console.error("Error saving country:", error);
              Swal.fire("Error", "An unexpected error occurred.", "error");
            }
          };
          





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

    const tog_varyingModal = () => {

        fetchNextItemnameCode();

        
        setVaryingModal(!varyingModal);
    };
    const toggleOemNoModal = () => {

        fetchNextOemCode();
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




      const fetchAndSetItemList = async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetchItemList(page, pageSize);
            console.log("API Response:", response);
    
            let items = [];
    
            // Check response structure and extract data correctly
            if (response && Array.isArray(response.data)) {
                items = response.data;  // Normal case
            } else if (response && Array.isArray(response.items)) {
                items = response.items;  // API returned "items" instead of "data"
            } else if (Array.isArray(response)) {
                items = response;  // Direct array case
            } else {
                console.error("Invalid data structure received from API", response);
                return;
            }
    
            const transformedData = items.map((item) => ({
                id: item.item_Id,
                code: item.item_Code,
                nameEn: item.itemN_NameEn,
                nameAr: item.itemN_NameAr,
                group: item.itemG_NameEn,
                manf: item.vendor_NameEn,
            }));
    
            setData(transformedData);
            setTotalCount(response.totalCount ?? 0);  // Ensure totalCount is handled
        } catch (error) {
            console.error("Error fetching item list:", error);
        } finally {
            setLoading(false);
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


      const fetchUnit= async () => {
       
        try {
          const ItemUnitData = await fetchItemUnit();
          if (ItemUnitData) setItemUnit(ItemUnitData);
        } catch (error) {
          console.error("Error fetching item  Units :", error);
        }
       // fetchUnit();
      };


      const getUnitNameById = (unitCode) => {
        const unit = ItemUnit.find((u) => u.unit_Code === unitCode);
        return unit ? unit.unit_NameEn : "";
      };
    
      // Handle unit change (If first row changes, update UnitUp too)
      const handleUnitChange = (id, value) => {
        setUnitRows((prevRows) => {
          return prevRows.map((row, index) => {
            if (row.id === id) {
              const updatedRow = { ...row, unit: value };
              if (index === 0) updatedRow.unitUp = value; // Update UnitUp if first row
              return updatedRow;
            }
            return row;
          });
        });
      };
    
      // Add a new row with UnitUp set to previous row's Unit
      const addRow = () => {
        const lastRow = unitRows[unitRows.length - 1];
        const newRow = {
          id: unitRows.length + 1,
          unit: "", // Let user choose
          unitUp: lastRow.unit, // 🔹 Use previous row's Unit as UnitUp
          factor: "", // Editable
          isFactorEditable: true,
        };
        setUnitRows([...unitRows, newRow]);
      };
    
      // Remove a row (except first)
      const removeRow = (id) => {
        if (unitRows.length > 1) {
          setUnitRows(unitRows.filter((row) => row.id !== id));
        }
      };
    
      // Handle factor change
      const handleFactorChange = (id, value) => {
        if (!isNaN(value) && value >= 1) {
          setUnitRows((prevRows) =>
            prevRows.map((row) =>
              row.id === id ? { ...row, factor: value } : row
            )
          );
        }
      };
    
    
    
      
 
   
      const [modal_center, setmodal_center] = useState(false);

    const [activeTab, setactiveTab] = useState(1)
    const [activeTabVartical, setoggleTabVertical] = useState(1)

    const [passedSteps, setPassedSteps] = useState([1])
    const [passedStepsVertical, setPassedStepsVertical] = useState([1])

    function toggleTab(tab) {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab]
            if (tab >= 1 && tab <= 3) {
                setactiveTab(tab)
                setPassedSteps(modifiedSteps)
            }
        }
    }


    const validateForm = (values) => {
      let errors = {};
      let isValid = true;
    
      // Check if required fields are empty
      if (!selectedItemPrefix?.value) {
        errors.selectedItemPrefix = "Item Prefix is required.";
        isValid = false;
      }
    
      if (!selectedItem?.value) {
        errors.selectedItem = "Item Name is required.";
        isValid = false;
      }
    
      if (!values?.DesEn?.trim()) {
        errors.DesEn = "Item Description (English) is required.";
        isValid = false;
      }
    
      if (!values?.DesAr?.trim()) {
        errors.DesAr = "Item Description (Arabic) is required.";
        isValid = false;
      }
    
      if (!selectedManufacture?.value) {
        errors.selectedManufacture = "Manufacturer is required.";
        isValid = false;
      }
    
      if (!selectedGroups?.value) {
        errors.selectedGroups = "Group selection is required.";
        isValid = false;
      }
    
      if (!selectedCountries?.value) {
        errors.selectedCountries = "Country selection is required.";
        isValid = false;
      }
    
      if (!selectedParts?.value) {
        errors.selectedParts = "Part Code is required.";
        isValid = false;
      }
    
     
    
     
    
     
    
      if (!selectedVendors?.value) {
        errors.selectedVendors = "Vendor selection is required.";
        isValid = false;
      }
    
      if (!selectedCarModel?.value) {
        errors.selectedCarModel = "Car Model selection is required.";
        isValid = false;
      }
    
      if (!selectedLocations?.value) {
        errors.selectedLocations = "Location selection is required.";
        isValid = false;
      }
    
      // Set errors
      setErrors(errors);
      
      return isValid;
    };
    


    const handleIsActiveChange = (id, isChecked) => {
     
      setUnitRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isActive: isChecked } : row
        )
      );
    };
    
    
    

   
    const handleSaveItem = async () => {

     
      
      try {


        if (!selectedItemPrefix || !selectedItemPrefix.value) {
          Swal.fire("Validation Error", "Please select an Item Prefix.", "warning");
          return;
      }
      if (!selectedItem || !selectedItem.value) {
          Swal.fire("Validation Error", "Please select an Item Name.", "warning");
          return;
      }
      if (!selectedManufacture || !selectedManufacture.value) {
          Swal.fire("Validation Error", "Please select a Manufacturer.", "warning");
          return;
      }
      if (!selectedGroups || !selectedGroups.value) {
          Swal.fire("Validation Error", "Please select a Group.", "warning");
          return;
      }

        // Fetch the next item prefix code after validation passes
        const prefix_id = selectedItemPrefix.value;
        const data = await fetchNextItemPrfxCode(prefix_id);
        
        // Ensure the state is updated with the new prefix code before proceeding
        setInputValues((prev) => {
          const updatedValues = {
            ...prev,
            ItemPrefixId: data.nextItemPrfxCode, // Update the ItemPrefixId here
          };
    
          // After updating the state, continue to save the item
          saveItem(updatedValues);
    
          return updatedValues;
        });
      } catch (error) {
        console.error("Error during save operation: ", error);
        Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
      }
    };

    //const filePaths = selectedFiles.map((f) => f.name); // Extract the file names
  
    const filePaths = uploadedFileName ? uploadedFileName : "";
    //alert(filePaths);
  //  const itemPhotoPath = filePaths.length > 0 ? filePaths.join(", ") : "";
    
    // Function to save the item once the state is updated
    const saveItem = async (updatedValues) => {
      try{
      alert(updatedValues.id);
      const itemId = updatedValues.id || 0;
  
      // ✅ Step 1: Generate unit details with proper row numbers
      const baseUnitRowNo = parseInt(updatedValues.UnitRowNo, 10) || 0;
      const unitDetailsWithRowNo = unitRows.map((row, index) => ({
          unitDet_RowNo: (baseUnitRowNo + index).toString(), // Ensure numeric row numbers
          unitDet_UnitId: row.id,
          unitDet_Factor: row.factor,
          unitDet_FinalFactor: row.factor,
          unitDet_IsActive: row.isActive,
      }));
  
      // ✅ Step 2: Assign ParentRowNo for units
      const unitDetails = unitDetailsWithRowNo.map((unitDetail, index) => ({
          ...unitDetail,
          unitDet_ParentRowNo: index === 0 ? unitDetail.unitDet_RowNo : unitDetailsWithRowNo[index - 1].unitDet_RowNo,
          unitDet_ItemId: 0,
          unitDet_UpdatedOn: new Date().toISOString(),
      }));
  
      // ✅ Step 3: Process Car Details with Correct Row Numbers
      const baseCarRowNo = parseInt(updatedValues.CarDetNo, 10) || 0;
      const carDetailsPayload = carDetails.map((car, index) => ({
          itemCar_RowNo: (baseCarRowNo + index).toString().padStart(10, '0'), // Maintain leading zeros
          itemCar_ItemId: 0,
          itemCar_ModelId: car.selectedCarModel?.value || null,
          itemCar_YearFrom: parseInt(car.fromYear, 10) || null,
          itemCar_YearTo: parseInt(car.toYear, 10) || null,
          itemCar_IsActive: true,
          itemCar_CreatedBy: 169,
          itemCar_CreatedOn: new Date().toISOString(),
          itemCar_UpdatedOn: new Date().toISOString(),
      }));
  
      // ✅ Construct Final Payload
      const payload = {
          item: {
              item_Code: updatedValues.code,
              item_OemId1: selectedOems[0]?.value || null,
              item_OemId2: selectedOems[1]?.value || null,
              item_OemId3: selectedOems[2]?.value || null,
              item_OemId4: selectedOems[3]?.value || null,
              item_OemId5: selectedOems[4]?.value || null,
              item_OemId6: selectedOems[5]?.value || null,
              item_PrefixId: selectedItemPrefix.value,
              item_PrefixCode: updatedValues.ItemPrefixId,
              item_NameId: selectedItem.value,
              item_DescEn: updatedValues.DesEn,
              item_DescAr: updatedValues.DesAr,
              item_AgentPrice: updatedValues.AgentPrice,
              item_EcoOrderQty: updatedValues.EcoOrdrQty,
              item_MfrId: selectedManufacture.value,
              item_GroupId: selectedGroups.value,
              item_CountryId: selectedCountries.value,
              item_MfrPartNo: updatedValues.ManfPartNo,
              item_PartCodeId: selectedParts.value,
              item_IsActive: true,
              item_NeedExpDate: true,
              item_PhotoPath: filePaths,
              item_MinPackingQty: updatedValues.MinQty,
              item_MaxPackingQty: updatedValues.MaxQty,
              item_Barcode1: updatedValues.ManfBar1,
              item_Barcode2: updatedValues.Manf2Bar2,
              item_Notes: updatedValues.Notes,
              item_CreatedBy: 169,
              item_CreatedOn: new Date().toISOString(),
              item_UpdatedBy: 169,
              item_UpdatedOn: new Date().toISOString(),
              item_Quality: updatedValues.Quality,
              item_TimeFix: updatedValues.timefix,
              item_isOriginal: true,
          },
  
          unitDetails,
  
          vendorDetails: [
              {
                  itemVendor_RowNo: updatedValues.VendorRowNo,
                  itemVendor_ItemId: 0,
                  itemVendor_VendorId: 1,
                  itemVendor_CreatedBy: 169,
                  itemVendor_UpdatedOn: new Date().toISOString(),
              },
          ],
  
          carDetails: carDetailsPayload, // ✅ Insert multiple car details
  
          locationDetails: [
              {
                  locDet_RowNo: updatedValues.LocationDetNo,
                  locDet_ItemId: 0,
                  locDet_LocId: selectedLocations.value,
                  locDet_BrId: 2,
                  locDet_CreatedBy: 169,
                  locDet_CreatedOn: new Date().toISOString(),
              },
          ],
  
          vatDetails: [
              {
                  itemCode: updatedValues.code,
                  taxMastCode: selectedVat.taxMastCode,
                  taxPerc: selectedVat.taxPerc,
              },
          ],
      };
  
      console.log("🔹 Sending payload:", JSON.stringify(payload, null, 2));
      console.log("🔹 Item ID:", itemId);
  
      // ✅ Save the item
      const response = await SaveItemMain(payload, itemId);
  
      if (response && response.success) {
          Swal.fire("Success", "Item saved successfully!", "success");

          resetForm();
  
       
      } else {
          Swal.fire("Error", response.statusMessage || "Failed to save item.", "error");
      }


    } catch (error) {
      console.error("Error while saving item:", error);
      Swal.fire("Error", "An error occurred while saving the item.", "error");
  }
  };


  const resetForm = () => {
    setSelectedItem("");
    setSelectedItemPrefix("");
    setSelectedVat("");
    setSelectedOems([]);
    setSelectedManufacture("");
    setSelectedGroups("");
    setSelectedCountries("");
    setSelectedParts("");
    setSelectedLocations("");
    setCarDetails([]);
    setUnitRows([]);
    setUploadedFileName("");
    setInputValues({
        code: "",
        DesEn: "",
        DesAr: "",
        AgentPrice: "",
        EcoOrdrQty: "",
        MinQty: "",
        MaxQty: "",
        ManfPartNo: "",
        ManfBar1: "",
        Manf2Bar2: "",
        Notes: "",
        Quality: "",
        timefix: "",
        ItemPrefixId: "",
        LocationDetNo: "",
        VendorRowNo: "",
        CarDetNo: "",
        UnitRowNo: "",
    });
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
                                    <h4 className="card-title mb-4">Items </h4>
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
                                                       // disabled={!(passedSteps || []).includes(1)}
                                                    >
                                                        <span className="number">1.</span> Item Add
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
                                                        <span className="number">2.</span> Item 
                                                        Picture
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem
                                                    className={classnames({ current: activeTab === 3 })}
                                                >
                                                    <NavLink
                                                        className={classnames({ active: activeTab === 3 })}
                                                        onClick={() => {
                                                            setactiveTab(3)
                                                        }}
                                                     //   disabled={!(passedSteps || []).includes(3)}
                                                    >
                                                        <span className="number">3.</span> Item List
                                                    </NavLink>
                                                </NavItem>
                                               
                                            </ul>
                                        </div>
                                        <div className="content clearfix">
                                            <TabContent activeTab={activeTab} className="body">
                                                <TabPane tabId={1}>
                                                    <Form>
                                                    <Row>

  {/* Non-editable Item Code */}
  <Col lg="3">
    <div className="mb-3">
      <Label for="basicpill-itemcode-input">Item Code</Label>
      <Input
        type="text"
        className="form-control noneditinp" // Removed the dot before the class name
        id="basicpill-itemcode-input"
        value={inputValues.code}
                 
        readOnly // Makes the field non-editable
      />
    </div>
  </Col>

  {/* Dropdown for Item Name */}
  <Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-input">Item Name</Label>
    <div className="flex-grid-container">
      <Select
        options={itemname.map((item) => ({
          value: item.itemN_Id,
          label: `${item.itemN_NameEn} ~ ${item.itemN_NameAr}`,
        }))}
        value={selectedItem} 
        placeholder="Select Item Name"
        classNamePrefix="select2-selection"
        isClearable={true}
        onChange={(selected) => setSelectedItem(selected)}
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




  {/* Dropdown for Item Prefix */}
  <Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-itemprefix-input">Item Prefix</Label>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "8px" }}>
    <Select
  options={ItemPrefix.map((itemprfx) => ({
    value: itemprfx.prefix_Id,
    label: `${itemprfx.prefix_Code}`,
  }))}
  value={selectedItemPrefix}
  placeholder="Select Item Prefix"
  classNamePrefix="select2-selection"
  isClearable={true} // Allows clearing the selection
  onChange={selectedOption => setSelectedItemPrefix(selectedOption)} // Set selected value
/>
    </div>
  </div>
</Col>

  {/* Time For Fix */}
  <Col lg="3">
    <div className="mb-2">
      <Label for="basicpill-timeforfix-input">Time For Fix</Label>
      <Input
        type="text"
        className="form-control"
        id="timefix"
        placeholder="Time For Fix"
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
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={tog_varyingModal}>
      Close
    </button>
    <button type="button" className="btn btn-primary" onClick={handleSave}>
      Save
    </button>
  </div>
</Modal>

      



                                                        <Row>
                                                            <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-phoneno-input3">
                                                                        Descr En
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="DesEn"
                                                                        value={inputValues.DesEn || ''}
                                                                        placeholder="Descr En."
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-email-input4">
                                                                        Descr Ar
                                                                    </Label>
                                                                    <Input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="DesAr"
                                                                        value={inputValues.DesAr || ''}
                                                                        placeholder="Descr Ar"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                                </Col>

                                                                <Col lg="3">
    <div className="mb-3">
        <Label for="basicpill-phoneno-input3">Max.Packing Qty</Label>
        <Input
            type="text"
            className="form-control"
            id="MaxQty"
            value={inputValues.MaxQty || ''}
            placeholder="Max.Packing Qty."
            onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {  // Allow only numbers (no decimals, no negative values)
                    handleInputChange(e);
                }
            }}
        />
        {inputValues.MaxQty && !/^\d+$/.test(inputValues.MaxQty) && (
            <span className="text-danger">Please enter a valid integer</span>
        )}
    </div>
</Col>


<Col lg="3">
    <div className="mb-3">
        <Label for="basicpill-phoneno-input3">Min.Pack Qty</Label>
        <Input
            type="text"
            className="form-control"
            id="MinQty"
            value={inputValues.MinQty || ''}
            placeholder="Min. Pack Qty."
            onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {  // Allow only numbers (no decimals, no negatives)
                    handleInputChange(e);
                }
            }}
        />
        {inputValues.MinQty && !/^\d+$/.test(inputValues.MinQty) && (
            <span className="text-danger">Please enter a valid integer</span>
        )}
    </div>
</Col>

                                                        </Row>
                                                        <Row>
  {/* VAT Details Dropdown */}
  <Col lg="6">
  <div className="mb-3">
    <Label for="vat-details-dropdown">Vat Details</Label>
    <Select
      options={ItemVat.map((itemvat) => ({
        value: itemvat.id,
        label: `${itemvat.code} ~ ${itemvat.nameEn} ~ ${itemvat.nameAr} ~ ${itemvat.taxPerc}`,
        //itemCode: itemvat.code, // Store item code
        taxMastCode: itemvat.code, // Store tax master code
        taxPerc: itemvat.taxPerc, // Store tax percentage
      }))}
      onChange={(selectedOption) => {
        setSelectedVat(selectedOption); // Store selected VAT details
      }}
      placeholder="Select VAT Details"
      classNamePrefix="select2-selection"
      isClearable={true} // Allows clearing the selection
    />
  </div>
</Col>
  {/* Part No/OEM No Dropdown with Multiple Selection */}
  <Col lg="6">
  <div className="mb-3">
    <Label for="part-oem-dropdown">Part No/OEM No</Label>
    <div className="flex-grid-container">
      <Select
        id="part-oem-dropdown"
        options={ItemOem.map((itemoem) => ({
          value: itemoem.oeM_Id,
          label: `${itemoem.oeM_Number}`,
        }))}
        value={selectedOems}
        placeholder="Select Part No/OEM No"
        classNamePrefix="select2-selection"
        isMulti={true}
        isClearable={true}
        onChange={(selected) => {
          if (selected.length <= 6) {
            setSelectedOems(selected);
          }
        }}
      />
      <i
        className="fas fa-save icon-button"
        title="Save Part No/OEM No"
        onClick={() => {
          toggleOemNoModal();
          setModal_1("@fat");
        }}
      ></i>
    </div>
  </div>
</Col>


</Row>


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
    <button type="button" className="btn btn-primary" onClick={handleSaveOem}> 
      Save
    </button>
  </div>
</Modal>



                                                        <Row>


                                                        <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="Manf.Part No">
                                                                        Manf.Part No
                                                                    </Label>
                                                                    <input
                                                                        id="ManfPartNo"
                                                                        className="form-control"
                                                                        value={inputValues.ManfPartNo || ''}
                                                                        placeholder=" Manf.Part No"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-partcode-input">Part Code</Label>
    <div className="flex-grid-container">
      <Select
        id="basicpill-partcode-input"
        options={ItemPart.map((part) => ({
          value: part.id,
          label: `${part.partCode}`,
        }))}
        value={selectedParts}
        placeholder="Select Part Code"
        classNamePrefix="select2-selection"
        isClearable={true}
        onChange={(selected) => setSelectedParts(selected)}
      />
      <i
        className="fas fa-save icon-button"
        title="Save Part Code"
        onClick={() => {
          togglePartModal();
          setModal_1("@fat");
        }}
      ></i>
    </div>
  </div>
</Col>



<Modal isOpen={isPartModalOpen} toggle={togglePartModal}>
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">Add New Part Code</h5>
    <button type="button" className="btn-close" onClick={togglePartModal}></button>
  </div>
  <div className="modal-body">
    <form>
      <div className="mb-3">
        <label htmlFor="partno-code" className="col-form-label">Code:</label>
        <input
          type="text"
          className="form-control"
          id="partCode"
          value={inputValues.partCode}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="partCodeName" className="col-form-label">Part Code:</label>
        <input
          type="text"
          className="form-control"
          id="partCodeName"
          value={inputValues.partCodeName}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="qualityType" className="col-form-label">Quality Type:</label>
        <select
          id="partType"
          className="form-control"
          value={inputValues.partType}
          onChange={handleInputChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </form>
  </div>
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={togglePartModal}>
      Close
    </button>
    <button type="button" className="btn btn-primary" onClick={handleSavePartCode}>
      Save
    </button>
  </div>
</Modal>


                                                            <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-address-input1">
                                                                        Agent Price
                                                                    </Label>
                                                                    <input
                                                                        id="AgentPrice"
                                                                        className="form-control"
                                                                        value={inputValues.AgentPrice || ''}
                                                                        placeholder="Agent Price"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg="3">
    <div className="mb-3">
        <Label for="basicpill-address-input1">Eco.Order Qty</Label>
        <input
            id="EcoOrdrQty"
            className="form-control"
            value={inputValues.EcoOrdrQty || ''}
            placeholder="Eco.Order Qty"
            onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {  // Only allows numbers
                    handleInputChange(e);
                }
            }}
        />
        {inputValues.EcoOrdrQty && !/^\d+$/.test(inputValues.EcoOrdrQty) && (
            <span className="text-danger">Please enter a valid integer</span>
        )}
    </div>
</Col>

                                                        </Row>



                                                        <Row>
                                                        <Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-group-input">Group</Label>
    <div className="flex-grid-container">
      <Select
        id="basicpill-group-input"
        options={ItemGroup.map((group) => ({
          value: group.itemG_Id,
          label: `${group.itemG_NameEn} ~ ${group.itemG_NameAr}`,
        }))}
        value={selectedGroups}
        placeholder="Select Group"
        classNamePrefix="select2-selection"
        isClearable={true}
        onChange={(selected) => setSelectedGroups(selected)}
      />
      <i
        className="fas fa-save icon-button"
        title="Save Group"
        onClick={() => {
          toggleGroupModal();
          setModal_1("@group");
        }}
      ></i>
    </div>
  </div>
</Col>





<Modal isOpen={isGroupModalOpen} toggle={toggleGroupModal}>
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">New Item Group</h5>
    <button type="button" className="btn-close" onClick={toggleGroupModal}></button>
  </div>
  <div className="modal-body">
    <form>
      <div className="mb-3">
        <label htmlFor="namecode" className="col-form-label"> Code:</label>
        <input
          type="text"
          className="form-control"
          id="grpcode"
          value={inputValues.grpcode}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ItemNameEn" className="col-form-label">Name En:</label>
        <input
          type="text"
          className="form-control"
          id="grpNameEn" // Match id with state key
          value={inputValues.grpNameEn} // Controlled value
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemNameAr" className="col-form-label">Name Ar:</label>
        <input
          type="text"
          className="form-control"
          id="grpNameAr" // Match id with state key
          value={inputValues.grpNameAr} // Controlled value
          onChange={handleInputChange}
        />
      </div>
    </form>
  </div>
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={toggleGroupModal}>
      Close
    </button>
    <button type="button" className="btn btn-primary" onClick={handleSaveGroup}>
      Save
    </button>
  </div>
</Modal>


                                                            <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-address-input1">
                                                                        Quality
                                                                    </Label>
                                                                    <input
                                                                        id="Quality"
                                                                        className="form-control"
                                                                        value={inputValues.Quality || ''}

                                                                        placeholder="Quality "
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-address-input1">
                                                                        Manf.Barcode 1
                                                                    </Label>
                                                                    <input
                                                                        id="ManfBar1"
                                                                        className="form-control"
                                                                        value={inputValues.ManfBar1 || ''}

                                                                        placeholder="Manf.Barcode 1"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-address-input1">
                                                                        Manf.Barcode 2
                                                                    </Label>
                                                                    <input
                                                                        id="Manf2Bar2"
                                                                        className="form-control"
                                                                        value={inputValues.Manf2Bar2 || ''}

                                                                        placeholder="Manf.Barcode 2 "
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>


                                                        <Row>
                                                        <Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-manufacture-input">Manufacture</Label>
    <Select
  options={ItemManfacture.map((manufacture) => ({
    value: manufacture.vendor_Id,
    label: `${manufacture.vendor_NameEn} ~ ${manufacture.vendor_NameAr}`,
  }))}
  placeholder="Select Manufacture"
  classNamePrefix="select2-selection"
  isClearable={true} // Allows clearing the selection
  onChange={selectedOption => setSelectedManufacture(selectedOption)} // Store the selected manufacture
/>

  </div>
</Col>

<Col lg="3">
  <div className="mb-3">
    <Label for="basicpill-quality-input">Country</Label>
    <div className="flex-grid-container">
      <Select
        id="basicpill-quality-input"
        options={ItemCountry.map((country) => ({
          value: country.country_Id,
          label: `${country.country_NameEn} ~ ${country.country_NameAr}`,
        }))}
        value={selectedCountries}
        placeholder="Select Country"
        classNamePrefix="select2-selection"
        isClearable={true}
        onChange={(selected) => setSelectedCountries(selected)}
      />
      <i
        className="fas fa-save icon-button"
        title="Save Country"
        onClick={() => {
          toggleCountryModal();
          setModal_1("@country");
        }}
      ></i>
    </div>
  </div>
</Col>



<Modal isOpen={isCountryModalOpen} toggle={toggleCountryModal}>
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">New Country</h5>
    <button type="button" className="btn-close" onClick={toggleCountryModal}></button>
  </div>
  <div className="modal-body">
    <form>
      <div className="mb-3">
        <label htmlFor="namecode" className="col-form-label"> Code:</label>
        <input
          type="text"
          className="form-control"
          id="countryCode"
          value={inputValues.countryCode}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ItemNameEn" className="col-form-label">Name En:</label>
        <input
          type="text"
          className="form-control"
          id="countryNameEn" // Match id with state key
          value={inputValues.countryNameEn} // Controlled value
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="itemNameAr" className="col-form-label">Name Ar:</label>
        <input
          type="text"
          className="form-control"
          id="countryNameAr" // Match id with state key
          value={inputValues.countryNameAr} // Controlled value
          onChange={handleInputChange}
        />
      </div>
    </form>
  </div>
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={toggleCountryModal}>
      Close
    </button>
    <button type="button" className="btn btn-primary" onClick={handleSaveCountry}>
      Save
    </button>
  </div>
</Modal>



                                                            <Col lg="3">
                                                                <div className="mb-3">
                                                                    <Label for="basicpill-address-input1">
                                                                        Notes
                                                                    </Label>
                                                                    <input
                                                                        id="Notes"
                                                                        className="form-control"
                                                                        value={inputValues.Notes || ''}

                                                                        placeholder="Notes "
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </Col>

                                                            <Col lg="3">
  <div className="mb-4">
    <Label for="basicpill-manufacture-input">Location</Label>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Select
        options={ItemLocation.map((location) => ({
          value: location.itemLoc_Id,
          label: `${location.itemLoc_Code} `,
        }))}

        value={selectedLocations}


        placeholder="Select location "
        classNamePrefix="select2-selection"
        isClearable={true} // Allows clearing the selection
        onChange={(selected) => setSelectedLocations(selected)}
        styles={{
          container: (provided) => ({
            ...provided,
            flex: 1, // Ensures the dropdown takes the remaining space
          }),
        }}
      />
      
    </div>
  </div>
</Col>
                                                           
                                                        </Row>

                                                        

                                                        <div>
  <h5 className="mb-3">Car Details</h5>
  <div className="table-responsive">
    <Table bordered className="car-details-table">
      <thead className="table-light text-center">
        <tr>
          <th style={{ width: "30%" }}>Car Model</th>
          <th style={{ width: "15%" }}>From Year</th>
          <th style={{ width: "15%" }}>To Year</th>
          <th style={{ width: "30%" }}>Car Make</th>
          <th style={{ width: "10%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {carDetails.map((row, index) => (
          <tr key={index}>
            {/* Car Model Dropdown */}
            <td>
              <Select
                options={ItemCarDet.map((model) => ({
                  value: model.
                  model_Id
                  ,
                  label: `${model.model_NameEn} ~ ${model.model_NameAr}`,
                  makeId: model.model_MakeId,

                }))}
                value={
                  row.selectedCarModel
                    ? {
                        value: row.selectedCarModel.value,
                        label: row.selectedCarModel.label,
                        makeId: row.selectedCarModel.makeId, // Keep makeId for fetching car make
                      }
                    : null
                }
                
                placeholder="Select Model"
                classNamePrefix="select2-selection"
                isClearable
                onChange={(selected) => handleDropdownChange(index, "selectedCarModel", selected)}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "38px",
                    borderRadius: "5px",
                    borderColor: "#ccc",
                    zIndex: 1,
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 1050,
                    position: "absolute",
                    width: "100%",
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
                menuPortalTarget={document.body}
              />
            </td>

            {/* From Year Input */}
            <td>
              <input
                type="text"
                className="form-control text-center"
                value={row.fromYear || ""}
                maxLength="4"
                placeholder="YYYY"
                onChange={(e) => handleInputcarChange(index, "fromYear", e)}
              />
            </td>

            {/* To Year Input */}
            <td>
              <input
                type="text"
                className="form-control text-center"
                value={row.toYear || ""}
                maxLength="4"
                placeholder="YYYY"
                onChange={(e) => handleInputcarChange(index, "toYear", e)}
              />
            </td>

            {/* Car Make Field (Auto-filled) */}
            <td>
              <input
                type="text"
                className="form-control bg-light text-center"
                value={row.carMake || ""}
                placeholder="Car Make"
                disabled
              />
            </td>

            {/* Actions (Add & Remove Rows) */}
            <td className="text-center">
              {index === carDetails.length - 1 ? (
                <Button color="success" size="sm" className="rounded-circle" onClick={addcarRow}>
                  ➕
                </Button>
              ) : (
                <Button color="danger" size="sm" className="rounded-circle" onClick={() => removecarRow(index)}>
                  ❌
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
</div>









                                                    </Form>
                                                </TabPane>
                                                <TabPane tabId={2}>
 
                                                <div className="container mt-4">
      <h3 className="mb-3">Unit Control</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>Unit</th>
              <th>UnitUp</th>
              <th>Factor</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {unitRows.map((row) => (
              <tr key={row.id}>
                {/* Unit Selection */}
                <td>
                  <select
                    className="form-select"
                    value={row.unit}
                    onChange={(e) => handleUnitChange(row.id, e.target.value)}
                  >
                    <option value="">Select Unit</option>
                    {ItemUnit.map((unit) => (
                      <option key={unit.unit_Id} value={unit.unit_Code}>
                        {unit.unit_NameEn}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Unit Up (Read-Only) */}
                <td>
                  <input
                    type="text"
                    className="form-control bg-light"
                    value={getUnitNameById(row.unitUp)}
                    readOnly
                  />
                </td>

                {/* Factor Input */}
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={row.factor}
                    onChange={(e) => handleFactorChange(row.id, e.target.value)}
                    disabled={!row.isFactorEditable}
                  />
                </td>


                  {/* Is Active Checkbox */}
                  <td className="text-center">
  <div className="custom-checkbox">
    <input
      type="checkbox"
      checked={row.isActive}
      onChange={(e) => handleIsActiveChange(row.id, e.target.checked)}
    />
  </div>
</td>


                {/* Remove Button */}
                <td className="text-center">
                  {row.id > 1 && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeRow(row.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-2" onClick={addRow}>
        <FaPlus /> Add Row
      </button>
    </div>
      


    
      
           

    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Forms" breadcrumbItem="Form File Upload" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <h6 className="card-title">Dropzone</h6>
                <CardSubtitle className="mb-3">
                  DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews.
                </CardSubtitle>
                <Form>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      handleAcceptedFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone">
                        <div
                          className="dz-message needsclick mt-2"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="dropzone-previews mt-3" id="file-previews">
                    {selectedFiles.map((f, i) => {
                      return (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={`${i}-file`}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={f.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Form>

                <div className="text-center mt-4">
                  <button type="button" className="btn btn-primary">
                    Send Files
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>


       
      </Container>
    </div>


    <div className="text-center mt-4">
      <button
        className="btn btn-success"
        onClick={handleSaveItem} // Handle save logic here
      >
        <FaSave /> Save
      </button>
    </div>
 
</TabPane>

<TabPane tabId={3}>
  <div>
    {/* Header Section */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="mb-0">Item List</h4>
    </div>

    {/* Table Section */}
    <div className="table-responsive">
      <table className="table table-bordered table-striped dt-responsive nowrap w-100">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Code</th>
            <th>Name (En)</th>
            <th>Name (Ar)</th>
            <th>Manufacture</th>
            <th>Group</th>
            <th>Action</th> {/* Single Action column */}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.code}</td>
                <td>{item.nameEn}</td>
                <td>{item.nameAr}</td>
                <td>{item.manf}</td>
                <td>{item.group}</td>
                <td className="text-center">
                  {loadingItemId === item.id ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <i
                      className="fas fa-eye text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleViewEditClick(item.id)}
                      title="View/Edit Item"
                    ></i>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination Section */}
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="text-muted">
        Showing {(current - 1) * size + 1} to{" "}
        {Math.min(current * size, TotalCount)} of {TotalCount}
      </div>
      <Pagination
        className="pagination-data"
        current={pageNumber}
        total={TotalCount}
        pageSize={pageSize}
        showSizeChanger={false} // Hide page size changer
        onChange={handlePageChange}
        showTitle={false} // Optional: removes default title tooltips
      />
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
                                                    className={activeTab === 3 ? "next disabled" : "next"}
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

export default ItemAdd
