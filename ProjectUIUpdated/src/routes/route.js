import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Authmiddleware = ({ children }) => {
  const location = useLocation();

  if (!localStorage.getItem("authUser")) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default Authmiddleware;
