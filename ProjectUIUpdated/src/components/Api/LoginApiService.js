import apiClient from "../Api/ApiClient"

export const UserLoginCheck = async (payload) => {
    console.log("Payload:", payload);
    try {
        
        
        // Axios automatically parses the JSON response
        const response = await apiClient.post('/api/Auth/login', payload);
        const data = response.data;
        console.log("API Response:", data);
        
        return data;
        

        // // Check if login failed (employeeCode is null)
        // if (!data.employeeCode) {
        //     throw new Error("Invalid username or password");
        // }

        // return data; // Return the valid user data
    } catch (error) {
        console.error("Error in login:", error.message);
        throw error;
    }
};
