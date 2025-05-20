import apiClient from "../Api/ApiClient"
export const fetchVendorGroup = async (filters, fieldMapping) => {
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
    const url = `api/GetVendorGroups?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};


export const fetchNextVendorGroupCode = async () => {
    try {
        const response = await apiClient.get(`/api/GetNextVendorGrpCode`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Vendor  Group code:', error);
        throw error;
    }
};

export const SaveVendorGroup = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveVendorGroup', payload);
        return response.data; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Vendor Group :', error.response?.data || error.message);
        throw error;
    }
};



export const fetchVendorGroupById = async (id) => {
    try {
        const response = await apiClient.get(`/api/GetVendorGroupById?VendorG_Id=${id}`);
        return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
        console.error("Error in fetch  Vendor Group ById:", error);
        throw error;
    }
};




export const fetchVendorLocation = async (filters, fieldMapping) => {
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
    const url = `api/GetVendorLocation?${params.toString()}`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

//api to fetch vendo list to bind table in vendor page
export const fetchVendors = async () => {
    try {
        // Construct the request URL
        const url = `api/GetVendorDet`;

        // Make the API request
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching Branch data:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};

//fetch next vendor number based on the type id

export const fetchNextVendorNumber = async (vendorType) => {
    try {
        const response = await apiClient.get(`/api/GetNextVendorNumber?vendorType=${vendorType}`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Type code:', error);
        throw error;
    }
};

//api to save the vendor details
export const saveVendorRecord = async (payload) => {
    try {
        const response = await apiClient.post('/api/SaveVendor', payload);
        return response; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};

//api to call the file location api from vendor page
export const fetchVendorLocationFromVendorPage = async () => {
    // Construct the URL with correct query parameters
    const url = `api/GetVendorLocation?filterField=null&filterCondition=null&filterValue=null`;

    try {
        // Call the API using the constructed URL
        const response = await apiClient.get(url);
        return response.data; // Assuming response.data contains the required data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for higher-level handling
    }
};

//api to fetch vendor records based on id
export const fetchVendorRecordsById = async (id) => {
    try {
        const response = await apiClient.get(`/api/GetVendor_byid?vendorId=${id}`);
        return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
        console.error("Error in fetch currency ById:", error);
        throw error;
    }
};





