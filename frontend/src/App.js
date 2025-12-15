import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";

import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Orders from "./pages/Order";
import Payment from "./pages/Payment";
import AddProduct from "./pages/AddProduct,";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import VendorDashboard from "./pages/Dashboard/VendorDashboard";
import CustomerDashboard from "./pages/Dashboard/CustomerDashboard";
import ManageProducts from "./pages/ManageProducts";
import VendorOrders from "./pages/VendorOrders";
import ManageVendors from "./pages/ManageVendors";
import ManageOrder from "./pages/ManageOrder";

export default function App() {
  const role=localStorage.getItem("role");
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={
          <ProtectedRoute><Products /></ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute><Cart/></ProtectedRoute>
        } />

        <Route path="/Orders" element={
          <ProtectedRoute><Orders/></ProtectedRoute>
        } />
        <Route path="/Payment" element={
          <ProtectedRoute><Payment/></ProtectedRoute>
        } />

   
        <Route path="/addProduct" element={
          <ProtectedRoute><AddProduct/></ProtectedRoute>
        } />

        <Route path="/vendor/products" element={
          <ProtectedRoute><ManageProducts/></ProtectedRoute>
        } />
         <Route path="/vendor/orders" element={
          <ProtectedRoute><VendorOrders/></ProtectedRoute>
        } />
        <Route path="/admin/vendors" element={
          <ProtectedRoute><ManageVendors/></ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute><ManageOrder/></ProtectedRoute>
        } />

         <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard/></ProtectedRoute>
        } />
        <Route path="/vendor/dashboard" element={
          <ProtectedRoute><VendorDashboard/></ProtectedRoute>
        } />

        <Route path="/customer/dashboard" element={
          <ProtectedRoute><CustomerDashboard/></ProtectedRoute>
        } />
      

      </Routes>
    </BrowserRouter>
  );
}
