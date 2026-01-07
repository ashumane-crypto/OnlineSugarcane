import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h3 style={{ color: "#fff" }}>Admin Panel</h3>

        <button style={styles.link} onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </button>

        <button style={styles.link} onClick={() => navigate("/admin/orders")}>
          Orders
        </button>

        <button style={styles.link} onClick={() => navigate("/admin/add-variety")}>
          Add Variety
        </button>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <h2>Admin Dashboard</h2>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Total Orders</h3>
            <p>📦 Live from Firebase</p>
          </div>

          <div style={styles.card}>
            <h3>Pending Orders</h3>
            <p>⏳ Verification Pending</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f8",
  },
  sidebar: {
    width: "220px",
    background: "#0b7d3b",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    textAlign: "left",
  },
  logout: {
    marginTop: "auto",
    background: "#fff",
    color: "#0b7d3b",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "30px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 12px rgba(0,0,0,0.1)",
  },
};

