import apiClient from "../Api/ApiClient"
export const retrieveAllCurrencyData = async (filters, fieldMapping) => {
    const { filterField, filterCondition, filterValue } = filters;

    // Map the filter field to its corresponding database field using fieldMapping
    const mappedFilterField = fieldMapping[filterField] || filterField;

    // Use URLSearchParams for better handling of query parameters
    const params = new URLSearchParams({
        filterField: mappedFilterField,
        filterCondition: filterCondition,
        filterValue: filterValue,
    });

    // Construct the URL with query parameters
    const url = `api/GetCurrency?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextCurrencyCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtCurrencyCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Currency code:', error);
        throw error;
    }
};

export const saveCurrency = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveCurrency', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};



export const fetchCurrencyById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetCurrency_id?Curr_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch currency ById:", error);
      throw error;
    }
  };





  export const retrieveAllPayTypeData = async (filters, fieldMapping) => {
    const { filterField, filterCondition, filterValue } = filters;

    // Map the filter field to its corresponding database field using fieldMapping
    const mappedFilterField = fieldMapping[filterField] || filterField;

    // Use URLSearchParams for better handling of query parameters
    const params = new URLSearchParams({
        filterField: mappedFilterField,
        filterCondition: filterCondition,
        filterValue: filterValue,
    });

    // Construct the URL with query parameters
    const url = `api/GetPayType?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextPaytypeCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtCarPayCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Currency code:', error);
        throw error;
    }
};

export const savepaytype = async (payload) => {
    try {
        const response = await apiClient.post('/api/SavePayType', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};



export const fetchPaytypeById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetPayTypeById?PayType_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch currency ById:", error);
      throw error;
    }
  };




  export const retrieveAllCountryData = async (filters, fieldMapping) => {
    const { filterField, filterCondition, filterValue } = filters;

    // Map the filter field to its corresponding database field using fieldMapping
    const mappedFilterField = fieldMapping[filterField] || filterField;

    // Use URLSearchParams for better handling of query parameters
    const params = new URLSearchParams({
        filterField: mappedFilterField,
        filterCondition: filterCondition,
        filterValue: filterValue,
    });

    // Construct the URL with query parameters
    const url = `api/GetCountryList?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextCountryCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtCountryCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Currency code:', error);
        throw error;
    }
};

export const saveCountry = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveCountry', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};



export const fetchCountryById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetCountry_id?Country_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch currency ById:", error);
      throw error;
    }
  };
  



  export const retrieveAllDesignationData = async (filters, fieldMapping) => {
    const { filterField, filterCondition, filterValue } = filters;

    // Map the filter field to its corresponding database field using fieldMapping
    const mappedFilterField = fieldMapping[filterField] || filterField;

    // Use URLSearchParams for better handling of query parameters
    const params = new URLSearchParams({
        filterField: mappedFilterField,
        filterCondition: filterCondition,
        filterValue: filterValue,
    });

    // Construct the URL with query parameters
    const url = `api/GetDesignation?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextDesignationCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetDesignationNextCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Currency code:', error);
        throw error;
    }
};

export const saveDesignation = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveDesignation', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};



export const fetchDesignationById = async (id) => {
    try {
      const response = await apiClient.get(`/api/Designation_id?Desig_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch currency ById:", error);
      throw error;
    }
  };
  



  export const retrieveAllCarModelData = async (filters, fieldMapping) => {
    const { filterField, filterCondition, filterValue } = filters;

    // Map the filter field to its corresponding database field using fieldMapping
    const mappedFilterField = fieldMapping[filterField] || filterField;

    // Use URLSearchParams for better handling of query parameters
    const params = new URLSearchParams({
        filterField: mappedFilterField,
        filterCondition: filterCondition,
        filterValue: filterValue,
    });

    // Construct the URL with query parameters
    const url = `api/GetCarModel?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextCarModelCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtCarModelCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Currency code:', error);
        throw error;
    }
};


export const fetchCarMakes = async () => {
    try {
        const response = await apiClient.get(`/api/GetCarMake`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Currency code:', error);
        throw error;
    }
};

export const saveCarModel = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveCarModel', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};



export const fetchCarModelById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetCarModelById?Model_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch currency ById:", error);
      throw error;
    }
  };

  export const retrieveAllBranchTypeData = async (filters, fieldMapping) => {
    const { filterField, filterCondition, filterValue } = filters;

    // Map the filter field to its corresponding database field using fieldMapping
    const mappedFilterField = fieldMapping[filterField] || filterField;

    // Use URLSearchParams for better handling of query parameters
    const params = new URLSearchParams({
        filterField: mappedFilterField,
        filterCondition: filterCondition,
        filterValue: filterValue,
    });

    // Construct the URL with query parameters
    const url = `api/GetBranchTypes?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextBranchTypeCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtBranchTypeCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Type code:', error);
        throw error;
    }
};

export const saveBranchType = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveBranchType', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};

  


export const fetchBranchTypeById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetBranchType_Id?BrType_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch currency ById:", error);
      throw error;
    }
  };
  export const retrieveAllBranchAreaData = async (filters, fieldMapping) => {
    const { filterField, filterCondition, filterValue } = filters;

    // Map the filter field to its corresponding database field using fieldMapping
    const mappedFilterField = fieldMapping[filterField] || filterField;

    // Use URLSearchParams for better handling of query parameters
    const params = new URLSearchParams({
        filterField: mappedFilterField,
        filterCondition: filterCondition,
        filterValue: filterValue,
    });

    // Construct the URL with query parameters
    const url = `api/GetBranchArea?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextBranchAreaCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtBranchAreaCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Type code:', error);
        throw error;
    }
};

export const saveBranchArea = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveBranchArea', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};



export const fetchBranchAreaById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetBranchArea_Id?Area_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch currency ById:", error);
      throw error;
    }
  };
  



  