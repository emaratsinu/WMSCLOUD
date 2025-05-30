import axios from "axios";
import BASE_URL from "../../config";

const getAuthHeader = () => {
  const tokenData = JSON.parse(localStorage.getItem("authUser") || "{}");
  return {
    Authorization: `Bearer ${tokenData.accessToken}`,
  };
};

export const getBusinesses = async (filter) => {
  const response = await axios.post(`${BASE_URL}/api/Business/get`, filter, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const saveBusiness = async (business) => {
  const response = await axios.post(`${BASE_URL}/api/Business/save`, business, {
    headers: getAuthHeader(),
  });
  return response.data;
};
