import React from "react"
import CarMake from "../pages/Master/carmake"
import Currency from "../pages/Master/Currency"
import Paytype from "../pages/Master/Paytype"
import Country from "../pages/Master/Country"
import Designation from "../pages/Master/Designation"
import CarModel from "../pages/Master/CarModel"
import BranchType from "../pages/Master/BranchType"
import BranchArea from "../pages/Master/BranchArea"
import ItemAdd from "../pages/Master/ItemAdd"
import Itemlist from "../pages/Master/itemlist"
import ItemName from "../pages/Master/ItemName"
import ItemGroup from "../pages/Master/ItemGroup"
import ItemUnit from "../pages/Master/ItemUnit"
import ItemOem from "../pages/Master/ItemOem"
import VendorGroup from "../pages/Master/VendorGroup"
import VendorLocation from "../pages/Master/VendorLocation"
import Department from "../pages/Master/Department"
import Business from "../pages/Master/Business"
import BranchAdd from "../pages/Master/BranchAdd"
import Login from "../pages/Master/Login"
import SalesCustomer from "../pages/Sales/SalesCustomer"
import Employee from "../pages/Master/Employee"
import Card from "../pages/Workshop/Card"
import Dashboard from "../pages/Master/DashBoard"
import SalesToJobCard from "../pages/Sales/SalesToJobCard"
import Vendor from "../pages/Master/Vendor"
import PurchaseBranch from "../pages/Workshop/PurchaseBranch"


//////
import EmployeePage from "../pages/GMS/EmployeePage";
import BusinessPage from "../pages/GMS/BusinessPage";



const authProtectedRoutes = [
  { path: "/carMake", element: <CarMake /> }, // Use `element` instead of `component`
  { path: "/Currency", element: <Currency /> }, // Use `element` instead of `component`
  { path: "/Paytype", element: <Paytype /> }, // Use `element` instead of `component`
  { path: "/Country", element: <Country /> }, // Use `element` instead of `component`
  { path: "/Designation", element: <Designation /> }, // Use `element` instead of `component`
  { path: "/CarModel", element: <CarModel /> }, // Use `element` instead of `component`
  { path: "/BranchType", element: <BranchType /> }, // Use `element` instead of `component`
  { path: "/BranchArea", element: <BranchArea /> }, // Use `element` instead of `component`
  { path: "/ItemAdd", element: <ItemAdd /> }, // Use `element` instead of `component`
  { path: "/itemlist", element: <Itemlist /> }, // Use `element` instead of `component`
  { path: "/ItemName", element: <ItemName /> },
  { path: "/ItemGroup", element: <ItemGroup /> },
  { path: "/ItemUnit", element: <ItemUnit /> },
  { path: "/ItemOem", element: <ItemOem /> },
  { path: "/VendorGroup", element: <VendorGroup /> },
  { path: "/VendorLocation", element: <VendorLocation /> },
  { path: "/Department", element: <Department /> },
  { path: "/Business", element: <Business /> },
  { path: "/BranchAdd", element: <BranchAdd /> },
  { path: "/SalesCustomer", element: <SalesCustomer /> },
  { path: "/Employee", element: <Employee /> },
  { path: "/Card", element: <Card /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "/SalesToJobCard", element: <SalesToJobCard /> },
  { path: "/Vendor", element: <Vendor /> },
  { path: "/PurchaseBranch", element: <PurchaseBranch /> },


  { path: "/GmsEmployee", element: <EmployeePage /> },
  { path: "/GmsBusiness", element: <BusinessPage /> },


]

const publicRoutes = [{ path: "/Login", element: <Login /> }]

export { authProtectedRoutes, publicRoutes }
