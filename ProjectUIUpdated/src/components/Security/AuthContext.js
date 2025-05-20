import { createContext, useContext, useState, useEffect } from "react";
import { userAuthenticate } from "../Api/AuthenticationApiService";


export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (token) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  }, [token]);

  async function login(username, password) {
    try {
      const response = await userAuthenticate(username, password);
      if (response.data.StatusCode === 1) {
        const data = response.data;
        setToken(data.Token);
        localStorage.setItem("token", data.Token);
        localStorage.setItem("branchId", data.CurrentBranchId);
        localStorage.setItem("userBranchId", data.CurrentBranchId);
        localStorage.setItem("branchName", data.BRANCHName_En);
        localStorage.setItem("userId", data.UserId);
        localStorage.setItem("userName", data.Name);
        localStorage.setItem("RefreshToken", data.RefreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("IsMainStore", data.IsMainStore);
        localStorage.setItem("employeeId", data.EmployeeId);
        localStorage.setItem("EmployeeNumber", data.EmployeeNumber);
        const res = await getuserRights(data.UserId);
        localStorage.setItem("userRights", JSON.stringify(res));
        localStorage.setItem("IsWholesale", data.IsWholesale);
        setUserRights(res);

        return true;
      } else {
        setError(response.data.StatusMessage);
        logout();
        return false;
      }
    } catch (error) {
      setError(error.message);
      logout();
      return false;
    }
  }

  async function getuserRights(userId) {
    const res = await GetUserRights(userId);
    return res.data;
  }

  function logout() {
    setToken(null);
    setUserRights([]);
    localStorage.removeItem("token");
    localStorage.removeItem("branchId");
    localStorage.removeItem("userBranchId");
    localStorage.removeItem("branchName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRights");
    localStorage.removeItem("IsMainStore");
    localStorage.removeItem("employeeId");
    localStorage.removeItem("EmployeeNumber");
    localStorage.removeItem("UnsavedItems")
    localStorage.removeItem("IsWholesale")
  }

  return (
    <AuthContext.Provider value={{ login, logout, userRights, token, error }}>
      {children}
    </AuthContext.Provider>
  );
}
