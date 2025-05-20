import apiClient from "../Api/ApiClient"


export const fetchNextItemCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Type code:', error);
        throw error;
    }
};


export const fetchItemDlts = async (id ) => {
  
    try {
        const response = await apiClient.get(`/api/GetItemDtls_ById?Item_Id=${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching Item Details  :', error);
        throw error;
    }
};


export const fetchNextItemNameCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemNameCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Name  code:', error);
        throw error;
    }
};


export const fetchItemName  = async () => {
   
    try {
        const response = await apiClient.get(`/api/GetItemNames`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching item names:', error);
        throw error;
    }
};


export const fetchItemPrefix  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetItemPrefix`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching item prefix :', error);
        throw error;
    }
};


export const fetchItemVat  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetItemTax`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item tax  :', error);
        throw error;
    }
};


export const fetchItemOems  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetItemOEM`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item oem  :', error);
        throw error;
    }
};

export const saveItemName  = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveItemName', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  name :', error.response?.data || error.message);
        throw error;
    }
};

export const fetchNextItemOemCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemOemCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item oem  code:', error);
        throw error;
    }
};

export const saveOem = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveItemOem', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  oem :', error.response?.data || error.message);
        throw error;
    }
}; 


export const fetchPartCode  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetItemPartCode`);
        return response.data;
    } catch (error) {
        console.error('Error fetching part code   :', error);
        throw error;
    }
}; 



export const savePartCode = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveItemPartCode', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  oem :', error.response?.data || error.message);
        throw error;
    }
}; 


export const fetchNextPartCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemPartCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item Part  code:', error);
        throw error;
    }
};

export const fetchItemGroup  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetItemGroup`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item group    :', error);
        throw error;
    }
}; 



export const fetchNextGrpCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemGroupCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item grp  code:', error);
        throw error;
    }
};



export const saveItemGroup = async (payload) => {
    try {
       
        const response = await apiClient.post('/api/SaveItemGroup', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  oem :', error.response?.data || error.message);
        throw error;
    }
}; 



export const fetchItemManufacture  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetVendor`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item Manfacture     :', error);
        throw error;
    }
}; 


export const fetchItemCountry  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetCountries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item Country     :', error);
        throw error;
    }
}; 


export const fetchNextCountryCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNxtCountryCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item Country  code:', error);
        throw error;
    }
};


export const saveItemCountry = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveCountry', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  Country :', error.response?.data || error.message);
        throw error;
    }
}; 



export const fetchItemList = async (pageNumber = 1, pageSize = 10) => {
    try {
        // Pass pageNumber and pageSize as query parameters
        const response = await apiClient.get(`/api/GetAllItemList`, {
            params: { pageNumber, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching item list:', error);
        throw error;
    }
};



export const fetchItemUnit = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetItemUnitfil`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item unit     :', error);
        throw error;
    }
}; 


export const fetchNextUnitCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemUnitCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item unit  code:', error);
        throw error;
    }
};

export const fetchNextUnitRowNo = async () => {

    try {
        const response = await apiClient.get(`/api/GetNxtItemUnitRowno`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item row  No:', error);
        throw error;
    }
};


export const saveItemUnit = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveItemUnit', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  Unit :', error.response?.data || error.message);
        throw error;
    }
};



export const fetchCarMakeById = async (model_MakeId) => {
    if (!model_MakeId) {
        console.error("Error: Model ID is missing!");
        return null; // Return null if no model_Id is provided
    }

    try {
        const response = await apiClient.get(`/api/GetCarMakeById?Make_Id=${model_MakeId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Car Make:", error);
        throw error;
    }
};



export const fetchItemLocation= async () => {
    
    try {
        const response = await apiClient.get(`/api/GetItemLocation`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item Location     :', error);
        throw error;
    }
}; 


export const SaveItemName = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveItemName', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  name  :', error.response?.data || error.message);
        throw error;
    }
}; 


export const fetchNextItemnameCode = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemNameCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item grp  code:', error);
        throw error;
    }
};


export const fetchItemNameById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetItemName_id?ItemN_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch Item Name  ById:", error);
      throw error;
    }
  };


  export const fetchItemOemById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetItemOem_id?ItemOEM=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch Item Name  ById:", error);
      throw error;
    }
  };


  export const fetchUnitById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetUnitById?Unit_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch Item unit  ById:", error);
      throw error;
    }
  };


  export const fetchItemGroupById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetItemGroup_Byid?ItemG_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch Item Name  ById:", error);
      throw error;
    }
  };



  export const SaveItemMain = async (payload, itemId) => {
    try {
      // Send the request with item_id as a query parameter
      const response = await apiClient.post(`/api/SaveMainItem?itemId=${itemId}`, payload);
  
      return response.data;
    } catch (error) {
      console.error("Error in SaveItemMain:", error);
  
      if (error.response) {
        console.error("API Error Response:", error.response);
        console.error("Error Response Data:", error.response.data);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Request Error:", error.message);
      }
  
      throw error;
    }
  };



export const fetchNextVendorRowNo = async () => {

    try {
        const response = await apiClient.get(`/api/GetNxtItemVendorRowno`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item vendor  row  No:', error);
        throw error;
    }
};



export const fetchNextCarDetRowNo = async () => {

    try {
        const response = await apiClient.get(`/api/GetNxtItemCarDetRowno`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item  car det row  No:', error);
        throw error;
    }
};



export const fetchNextLocationDetRowNo = async () => {

    try {
        const response = await apiClient.get(`/api/GetNextItemLocationDetRowNo`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next  item  loaction  det row  No:', error);
        throw error;
    }
};

export const fetchNextItemPrfxCode = async (id) => {
    try {
        const response = await apiClient.get(`/api/GetNextItemPrfxCode_Byid`, {
            params: { id }, // Better practice for query parameters
        });
        return response.data; // Assuming the API returns the next prefix code here
    } catch (error) {
        console.error('Error fetching next item prefix code:', error);
        throw error;
    }
};



export const fetchItemCarDetails  = async () => {
    
    try {
        const response = await apiClient.get(`/api/GetCarDetails`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item Country     :', error);
        throw error;
    }
}; 


export const uploadFile = async (file, itemCode) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("itemCode", itemCode); // Send the item code
  
      const response = await apiClient.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; // Return API response
    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Handle errors in UI
    }
  };
  








