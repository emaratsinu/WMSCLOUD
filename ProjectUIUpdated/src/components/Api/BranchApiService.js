import apiClient from "../Api/ApiClient"


export const fetchDepartment = async (filters, fieldMapping) => {
    try {
        // Destructure filters safely with defaults
        const { filterField, filterCondition, filterValue } = filters;

        // Validate if filterField exists in fieldMapping
        if (!fieldMapping[filterField]) {
            console.error("Invalid filterField:", filterField);
            throw new Error("Invalid filter field specified.");
        }

        // Map the filter field to the database field
        const mappedFilterField = fieldMapping[filterField];

        // Construct query parameters
        const params = new URLSearchParams({
            filterField: mappedFilterField,
            filterCondition: filterCondition || "=", // Default condition
            filterValue: filterValue || "", // Default value
        });

        // Construct the request URL
        const url = `api/GetDepartment?${params.toString()}`;

        console.log("API Request URL:", url); // Debugging log

        // Call API
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching Department data:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
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


export const fetchBranches = async () => {
    try {
        // Construct the request URL
        const url = `api/Branch`;

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

//api to bind branch area values
export const fetchBranchArea = async () => {
    try {
        const response = await apiClient.get(`/api/GetBranchArea`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Type code:', error);
        throw error;
    }
};
//api to bind branch type values
export const fetchBranchType = async () => {
    try {
        const response = await apiClient.get(`/api/GetBranchType`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Type code:', error);
        throw error;
    }
};

//api to save the branch add details
export const saveBranchRecord = async (payload) => {
    try {
        const response = await apiClient.post('/api/Branch/SaveBranch', payload);
        return response; // Return the data from the API response
    } catch (error) {
        console.error('Error saving Currency make:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchNextBranchNumber = async () => {
    try {
        const response = await apiClient.get(`/api/GetNextBranchNumber`);
        return response.data; // Assuming the response contains `nxtCarmakeCode`
    } catch (error) {
        console.error('Error fetching next Branch Type code:', error);
        throw error;
    }
};

export const fetchBranchRecords = async (id) => {
    try {
        const response = await apiClient.get(`/api/GetBranch?branchID=${id}`);
        return response.data; // Assuming the API response has the data in `response.data`
    } catch (error) {
        console.error("Error in fetch currency ById:", error);
        throw error;
    }
};

