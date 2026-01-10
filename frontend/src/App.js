import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Farmer pages
import Login from "./pages/Farmer/Login";
import Register from "./pages/Farmer/Register";
import Home from "./pages/Farmer/Home";
import Varieties from "./pages/Farmer/Varieties";
import BookOrder from "./pages/Farmer/BookOrder";
import TrackOrder from "./pages/Farmer/TrackOrder";
import Buy from "./pages/Farmer/Buy";

// Admin pages
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/Orders";
import AddVariety from "./pages/Admin/AddVariety";

/* ======================
   Layouts
====================== */

// ❌ No Navbar / Footer
const AuthLayout = () => <Outlet />;

// ✅ Navbar + Footer for Farmers
const FarmerLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// ❌ No Navbar / Footer for Admin
const AdminLayout = () => <Outlet />;

/* ======================
   App
====================== */
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          {/* ================= AUTH ================= */}
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ================= FARMER ================= */}
          <Route
            element={
              <ProtectedRoute role="user">
                <FarmerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/varieties" element={<Varieties />} />
            <Route path="/book" element={<BookOrder />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/buy" element={<Buy />} />
          </Route>

          {/* ================= ADMIN ================= */}
          <Route
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/add-variety" element={<AddVariety />} />
          </Route>

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
