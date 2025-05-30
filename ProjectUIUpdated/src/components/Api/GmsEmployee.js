import axios from "axios";
import BASE_URL from "../../config";

const getAuthHeader = () => {
  const tokenData = JSON.parse(localStorage.getItem("authUser") || "{}");
  return {
    Authorization: `Bearer ${tokenData.accessToken}`
  };
};


export const getEmployees = async (filter) => {
  const response = await axios.post(`${BASE_URL}/api/Employee/get`, filter, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const saveEmployee = async (employee) => {
  const response = await axios.post(`${BASE_URL}/api/Employee/save`, employee, {
    headers: getAuthHeader(),
  });
  return response.data;
};
