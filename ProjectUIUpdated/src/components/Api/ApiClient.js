import axios from "axios"
import { SetupInterceptors } from "./SetupInterceptors"

let apiClient = axios.create({
  baseURL: "http://localhost:5289",
  //baseURL: "http://213.199.62.80:93",
})

SetupInterceptors(apiClient)

export default apiClient
