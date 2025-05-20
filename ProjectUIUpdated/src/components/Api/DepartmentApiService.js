import apiClient from "../Api/ApiClient"

export const fetchDepartment = async (filters, fieldMapping) => {
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
    const url = `api/GetDepartment?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

export const fetchNextDepartmentCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtDepartmentCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Vendor  Group code:', error);
        throw error;
    }
};

export const SaveDepartment = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveDepartment', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Department Group :', error.response?.data || error.message);
        throw error;
    }
};



export const fetchDepartmentById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetDepartment_Id?Dept_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch  Vendor Group ById:", error);
      throw error;
    }
  };


  export const fetchBusiness = async () => {
    try {
        // Call API without parameters
        const response = await apiClient.get("api/GetBusiness");

        return response.data; // Return the API response data
    } catch (error) {
        console.error("Error fetching business data:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });

        throw error; // Re-throw for further handling
    }
};



export const fetchBusinessAll = async (filters, fieldMapping) => {
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
    const url = `api/GetBusinessAll?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

export const fetchNextBusinessCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtBusinessCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Vendor  Group code:', error);
        throw error;
    }
};

export const SaveBusiness = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveBusiness', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Business  :', error.response?.data || error.message);
        throw error;
    }
};



export const fetchBusinessById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetBusiness_Id?Bus_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetch  Business  ById:", error);
      throw error;
    }
  };
