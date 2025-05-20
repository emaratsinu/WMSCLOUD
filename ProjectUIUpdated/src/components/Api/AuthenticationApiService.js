import apiClient from "../Api/ApiClient"




export const userAuthenticate  = (username,password) =>  apiClient.post('/Authenticate', { username: username,password: password})
    



export const retrieveAllCarMakeData = async (filters, fieldMapping) => {
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
    const url = `api/GetCarMake?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextCarMakeCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNxtCarMakeCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next car make code:', error);
        throw error;
    }
};

export const saveCarMake = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveCarmake', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving car make:', error.response?.data || error.message);
        throw error;
    }
};



export const fetchCarMakeById = async (id) => {
    try {
      const response = await apiClient.get(`/api/GetCarMakeById?Make_Id=${id}`);
      return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
      console.error("Error in fetchCarMakeById:", error);
      throw error;
    }
  };
  