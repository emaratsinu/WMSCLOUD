import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { layoutTypes } from "./constants/layout";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import Middleware and Layouts
import Authmiddleware from "./routes/route";
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import SCSS
import "./assets/scss/theme.scss";

// Function to get the layout
const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const App = () => {
  const layoutType = useSelector((state) => state.Layout.layoutType);
  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={route.element} // Use `element` instead of `component`
          />
        ))}

        {/* Auth Protected Routes */}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <Authmiddleware>
                <Layout>{route.element}</Layout> {/* Use `element` instead of `component` */}
              </Authmiddleware>
            }
          />
        ))}

        {/* Fallback Route for No Matches */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

export default App;
