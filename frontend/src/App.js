import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Farmer pages
import Login from "./pages/Farmer/Login";
import Register from "./pages/Farmer/Register";
import Home from "./pages/Farmer/Home";
import Varieties from "./pages/Farmer/Varieties";
import BookOrder from "./pages/Farmer/BookOrder";
import TrackOrder from "./pages/Farmer/TrackOrder";
import Buy from "./pages/Farmer/Buy";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/Orders";
import AddVariety from "./pages/Admin/AddVariety";

/* ---------------- Layout Wrapper ---------------- */
function Layout({ children }) {
  const location = useLocation();

  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navbar only for Farmer pages */}
      {!isAdminRoute && <Navbar />}

      {children}

      {/* Show Footer only for Farmer pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            {/* -------- Farmer Routes -------- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/varieties" element={<Varieties />} />
            <Route path="/book" element={<BookOrder />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/buy" element={<Buy />} />

            {/* -------- Admin Routes -------- */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/add-variety" element={<AddVariety />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
