import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, update, get } from "firebase/database"; // ✅ ADDED get
import emailjs from "emailjs-com";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(db, "orders");

    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, order]) => ({
          id,
          ...order,
        }));
        setOrders(list);
      } else {
        setOrders([]);
      }
    });
  }, []);

  const changeStatus = async (order, status) => {
    // ✅ Firebase status update (UNCHANGED)
    await update(ref(db, `orders/${order.id}`), { status });

    // 🔥 ✅ NEW: REDUCE STOCK WHEN APPROVED
    if (status === "Approved") {
      try {
        const varietyKey = order.variety; // must match Firebase key
        const varietyRef = ref(db, `varieties/${varietyKey}`);

        const snap = await get(varietyRef);

        if (snap.exists()) {
          const currentStock = snap.val().stock || 0;

          // ⚠️ If you don’t have quantity, default = 1
          const qty = order.quantity ? Number(order.quantity) : 1;

          if (currentStock >= qty) {
            await update(varietyRef, {
              stock: currentStock - qty,
            });
          } else {
            alert("❌ Not enough stock available");
          }
        }
      } catch (err) {
        console.error("Stock update error:", err);
      }
    }

    // ✅ EmailJS notification (UNCHANGED)
    emailjs
      .send(
        "service_ys3f0wi",
        "template_4rowted",
        {
          farmer_name: order.name,
          to_email: order.email,
          variety: order.variety,
          status: status,
          amount: order.totalAmount,
          address: order.address,
        },
        "tsvqIvroQsNZ8JeUM"
      )
      .then(() => {
        alert(`✅ Farmer ${order.name}, your order has been ${status}`);
      })
      .catch((error) => {
        console.error(error);
        alert("Order updated, but email sending failed");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 All Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((o) => (
        <div key={o.id} style={styles.card}>
          <p><b>Name:</b> {o.name}</p>
          <p><b>Email:</b> {o.email}</p>
          <p><b>Mobile:</b> {o.mobile}</p>
          <p><b>Variety:</b> {o.variety}</p>
          <p><b>Address:</b> {o.address}</p>
          <p><b>Total:</b> ₹{o.totalAmount}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={{ fontWeight: 600 }}>{o.status}</span>
          </p>

          {o.paymentProof && (
            <>
              <p><b>Payment Proof:</b></p>
              <img src={o.paymentProof} alt="proof" style={styles.image} />
            </>
          )}

          <div style={styles.actions}>
            <button
              style={styles.approve}
              onClick={() => changeStatus(o, "Approved")}
            >
              Approve
            </button>

            <button
              style={styles.reject}
              onClick={() => changeStatus(o, "Rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 30, maxWidth: 1100, margin: "auto" },
  heading: { marginBottom: 20 },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  image: { width: 250, marginTop: 10 },
  actions: { display: "flex", gap: 10, marginTop: 10 },
  approve: {
    background: "#0b7d3b",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  reject: {
    background: "#c62828",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};