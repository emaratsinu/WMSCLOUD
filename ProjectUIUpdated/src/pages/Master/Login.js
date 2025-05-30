import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "../../assets/images/logo.png"; // Importing logo

import { UserLoginCheck } from "../../components/Api/LoginApiService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await UserLoginCheck({ username, password });

      console.log("API Response:", response);

      // Check if login was successful
      // if (response && response.employeeCode) {
      //  // alert("test");
      //   localStorage.setItem("authUser",JSON.stringify(response.employeeCode));
      //   navigate("/DashBoard");

      // //window.location.href = "/Currency"; // Full reload of the page

      // }
      if (response && response.accessToken) {
  localStorage.setItem("authUser", JSON.stringify(response)); // Save access + refresh token
  navigate("/DashBoard");
}

       else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg border-0 text-center" style={{ width: "380px", borderRadius: "12px" }}>
        {/* Logo Section */}
        <img
          src={logo}
          alt="Company Logo"
          className="mx-auto d-block"
          style={{ width: "80px", height: "80px", marginBottom: "10px" }}
        />

        <h3 className="text-center mb-4 fw-bold text-dark">Garage Management</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form >
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control p-2 rounded-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control p-2 rounded-start-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="btn btn-outline-secondary rounded-end-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="button" onClick={handleLogin} className="btn btn-primary w-100 py-2 rounded-3 fw-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
