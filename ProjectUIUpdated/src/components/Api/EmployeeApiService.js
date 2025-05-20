import apiClient from "../Api/ApiClient"


export const fetchCardEmployee = async (
    pageNumber = 1, 
    pageSize = 10, 
    filterField = "", 
    filterCondition = "", 
    filterValue = ""
) => {
    try {
        const response = await apiClient.get(`/api/GetCardEmployeePagination`, {
            params: { 
                pageNumber: Number(pageNumber),  // ✅ Ensure it's a number
                pageSize: Number(pageSize),      // ✅ Ensure it's a number
                filterField: filterField || null, // ✅ Send `null` if empty
                filterCondition: filterCondition || null,
                filterValue: filterValue || null
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching Card Customer:", error.response?.data || error.message);
        throw error;
    }
};

