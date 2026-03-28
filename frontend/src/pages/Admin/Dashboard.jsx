import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { ref, onValue, update } from "firebase/database";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stocks, setStocks] = useState({});
  const [editStock, setEditStock] = useState({});

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // 🔥 FETCH STOCKS
  useEffect(() => {
    const stockRef = ref(db, "stocks");

    onValue(stockRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStocks(data);
      }
    });
  }, []);

  // INPUT CHANGE
  const handleChange = (key, value) => {
    setEditStock((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // UPDATE STOCK (RESTOCK)
  const updateStock = async (key) => {
    const newStock = Number(editStock[key]);

    if (isNaN(newStock)) {
      alert("Enter valid number");
      return;
    }

    try {
      await update(ref(db, "stocks"), {
        [key]: newStock,
      });

      alert(`✅ ${key} stock updated`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update");
    }
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

      {/* MAIN */}
      <main style={styles.main}>
        <h2>Admin Dashboard</h2>

        <h3 style={{ marginTop: "20px" }}>🌾 Available Stock</h3>

        <div style={styles.cards}>
          {Object.keys(stocks).length === 0 && <p>No stock data</p>}

          {Object.entries(stocks).map(([key, value]) => (
            <div key={key} style={styles.card}>
              <h3>{key}</h3>

              <p>
                Current Stock: <b>{value}</b>
              </p>

              <input
                type="number"
                placeholder="Enter new stock"
                value={editStock[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                style={styles.input}
              />

              <button
                style={styles.updateBtn}
                onClick={() => updateStock(key)}
              >
                Update Stock
              </button>
            </div>
          ))}
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
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  updateBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#0b7d3b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};