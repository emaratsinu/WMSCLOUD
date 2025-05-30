// import axios from "axios"
// import { SetupInterceptors } from "./SetupInterceptors"

// let apiClient = axios.create({
//   baseURL: "http://localhost:5289",
//   //baseURL: "http://213.199.62.80:93",
// })

// SetupInterceptors(apiClient)

// export default apiClient
import axios from "axios";
import API_URL from "../../config";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
