import apiClient from "../Api/ApiClient"

export const fetchNextSaleCode = async () => {

    
    try {
        const response = await apiClient.get(`/api/GetNxtSaleCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Sales code:', error);
        throw error;
    }
};


export const fetchCustomer  = async () => {
   
    try {
        const response = await apiClient.get(`/api/GetCustomerList`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching Customer :', error);
        throw error;
    }
};


export const fetchEmployees  = async () => {
   
    try {
        const response = await apiClient.get(`/api/Employee`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching Employee :', error);
        throw error;
    }
};



export const saveLogSrl = async (serialNo, tableFlag, formUID, sysName, readBy) => {
    try {

      
      // Constructing the payload as required by the API
      const payload = {
        serialNo,  // Serial Number
        tableFlag, // Table Flag
        formUID,   // Form UID
        sysName,   // System Name
        readBy     // Read By (User)
      };
     // console.log("Payload Data:", JSON.stringify(payload, null, 2));

      // Sending API request
      const response = await apiClient.post('/api/SaveLogPendingSrl', payload);
  
      // Returning the response data
      return response.data;
    } catch (error) {
      console.error('Error saving Log srl:', error.response?.data || error.message);
      throw error;
    }
  };
  



export const FetchParentChldSrls = async (serialNo, resType = 0, level = 0) => {
    try {

       
        const response = await apiClient.get(`/api/Sales/GetParentChildSerials`, {
            params: { serialNo, resType, level }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching serial details:', error);
        throw error;
    }
};




export const FetchCheckSrls = async ({
    SerialNo,
    FlagToCheck = 0,
    PaytypeID = null,
    CustID = null,
    JobCardID = null,
    InvID = null,
    SalesType = "",
    ToBrID = null,
    VndrID = null,
    SalesMechID = null,
    SalesMechGrpID = null
}) => {
    try {
        const requestBody = {
            SerialNo,
            FlagToCheck,
            PaytypeID,
            CustID,
            JobCardID,
            InvID,
            SalesType,
            ToBrID,
            VndrID,
            SalesMechID,
            SalesMechGrpID
        };

        const response = await apiClient.post(`/api/Sales/Check_SrlStatuss`, requestBody);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching serial details:', error);
        throw error;
    }
};



export const saveSuspectedSrl  = async (payload) => {

    alert(56);
   
    try {

       
        
        const response = await apiClient.post('/api/SaveSuspectedSrl', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  name :', error.response?.data || error.message);
        throw error;
    }
};



export const fetchVatDet = async (id ) => {
 
   
   
    try {
        const response = await apiClient.get(`/api/GetSalesVatDetails?itemcode=${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching Employee :', error);
        throw error;
    }
};



export const fetchSalesList  = async () => {
   
    try {
        const response = await apiClient.get(`/api/GetSalesList`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching sales list :', error);
        throw error;
    }
};



export const saveInvoice  = async (payload) => {
   
    try {

        

       
        
        const response = await apiClient.post('/api/Sales/api/SaveSalesinvoice', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving item  name :', error.response?.data || error.message);
        throw error;
    }
};



export const fetchInvoiceSrlsById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetSalesinvoiceSrlDtls?Sa_No=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch invoice srls ById:", error);
      throw error;
    }
  };



  export const fetchCardInvNo = async () => {
    try {
      const response = await apiClient.get(`/api/GetCardInvNo`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch Card No :", error);
      throw error;
    }
  };













