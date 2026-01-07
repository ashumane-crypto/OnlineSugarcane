import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .navbar {
          background: linear-gradient(90deg, #0b7d3b, #0ea44b);
          padding: 14px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
        }

        .logo-circle {
          width: 36px;
          height: 36px;
          background: white;
          color: #0b7d3b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .nav-links {
          display: flex;
          gap: 30px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }

        .nav-links a:hover {
          text-decoration: underline;
        }

        .nav-actions {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .cart {
          position: relative;
          font-size: 22px;
          cursor: pointer;
        }

        .cart span {
          position: absolute;
          top: -8px;
          right: -10px;
          background: red;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          padding: 2px 6px;
        }

        .login-btn {
          background: white;
          color: #0b7d3b;
          border: none;
          padding: 8px 18px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
        }

        .hamburger {
          display: none;
          font-size: 26px;
          cursor: pointer;
        }

        /* ================= MOBILE ================= */
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: #0b7d3b;
            flex-direction: column;
            gap: 15px;
            padding: 20px;
            display: none;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-actions {
            gap: 15px;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>

      <div className="navbar">
        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/")}>
          <div className="logo-circle">O</div>
          SugarCane Store
        </div>

        {/* NAV LINKS */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/varieties" onClick={() => setMenuOpen(false)}>Variety</Link>
          <Link to="/book" onClick={() => setMenuOpen(false)}>Book</Link>
          <Link to="/track" onClick={() => setMenuOpen(false)}>Track</Link>
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">
          <div className="cart" onClick={() => navigate("/cart")}>
            🛒
            {cart.length > 0 && <span>{cart.length}</span>}
          </div>

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
