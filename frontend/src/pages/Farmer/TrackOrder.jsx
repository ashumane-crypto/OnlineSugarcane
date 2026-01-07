import React, { useState } from "react";
import { db } from "../../firebase";
import { ref, get, remove } from "firebase/database";

export default function TrackOrder() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!email) {
      alert("Enter your email");
      return;
    }

    const snapshot = await get(ref(db, "orders"));
    const data = snapshot.val();

    if (data) {
      const list = Object.entries(data)
        .filter(([_, o]) => o.email === email)
        .map(([id, o]) => ({ id, ...o }));

      setOrders(list);
    } else {
      setOrders([]);
    }

    setSearched(true);
  };

  // 🔥 Cancel Order
  const cancelOrder = async (orderId) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirm) return;

    await remove(ref(db, `orders/${orderId}`));
    alert("❌ Order cancelled successfully");

    // Update UI
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <div style={styles.container}>
      <h2>📍 Track Your Order</h2>

      <input
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleSearch} style={styles.btn}>
        Track Order
      </button>

      {searched && orders.length === 0 && (
        <p>No orders found for this email</p>
      )}

      {orders.map((o) => (
        <div key={o.id} style={styles.card}>
          <p><b>Variety:</b> {o.variety}</p>
          <p><b>Total:</b> ₹{o.totalAmount}</p>

          <p>
            <b>Status:</b>{" "}
            {o.status === "Approved" && "🚚 Shipped"}
            {o.status === "Rejected" && "❌ Rejected"}
            {(o.status === "Pending Online Payment" ||
              o.status === "Cash On Delivery") && "⏳ Pending"}
          </p>

          {/* ❌ Cancel only if NOT approved */}
          {o.status !== "Approved" && (
            <button
              style={styles.cancel}
              onClick={() => cancelOrder(o.id)}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "auto",
    padding: 30,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#0b7d3b",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
  },
  card: {
    background: "#fff",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    boxShadow: "0 5px 12px rgba(0,0,0,0.1)",
  },
  cancel: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    background: "#c62828",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  },
};
