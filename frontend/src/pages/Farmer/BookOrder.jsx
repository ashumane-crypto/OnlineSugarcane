import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../firebase";
import qrImage from "../../assets/qr_img.jpeg";

const varieties = [
   { name: "Co 86032 Sugarcane Seeds", price: 1200, type: "Seeds" }, 
   { name: "CoC 671 Sugarcane Plants", price: 1500, type: "Plants" }, 
   { name: "Co 0238 Sugarcane Seeds", price: 1100, type: "Seeds" }, 
   { name: "Co 94012 Sugarcane Plants", price: 1400, type: "Plants" }, 
   { name: "CoLk 94184 Sugarcane Seeds", price: 1300, type: "Seeds" }, 
   { name: "Co 06022 Sugarcane Plants", price: 1600, type: "Plants" }, 
   { name: "CoSnk 05103 Sugarcane Seeds", price: 1250, type: "Seeds" }, 
   { name: "Co 99004 Sugarcane Plants", price: 1450, type: "Plants" }, 
];

export default function BookOrder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [selectedVariety, setSelectedVariety] = useState("");
  const [acres, setAcres] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("offline");
  const [paymentProof, setPaymentProof] = useState("");

  // ⭐ NEW: Rating state
  const [rating, setRating] = useState(0);

  const selectedItem = varieties.find(v => v.name === selectedVariety);
  const unitsPerAcre = selectedItem?.type === "Seeds" ? 10 : 8;
  const requiredUnits = selectedItem ? acres * unitsPerAcre : 0;
  const totalAmount = selectedItem ? requiredUnits * selectedItem.price : 0;

  const handleBooking = async () => {
    if (!name || !email || !mobile || !address || !selectedVariety) {
      alert("❌ Please fill all details");
      return;
    }

    if (paymentMethod === "online" && !paymentProof) {
      alert("❌ Upload payment screenshot");
      return;
    }

    // ⭐ OPTIONAL VALIDATION
    if (rating === 0) {
      alert("⭐ Please give your experience rating");
      return;
    }

    await push(ref(db, "orders"), {
      name,
      email,
      mobile,
      address,
      variety: selectedVariety,
      acres,
      requiredUnits,
      totalAmount,
      paymentMethod,
      paymentProof: paymentMethod === "online" ? paymentProof : "Cash on Delivery",
      status: "Pending",
      rating, // ⭐ SAVED IN FIREBASE
      createdAt: new Date().toISOString(),
    });

    alert("✅ Order placed successfully!");

    setName("");
    setEmail("");
    setMobile("");
    setAddress("");
    setSelectedVariety("");
    setAcres(1);
    setPaymentProof("");
    setPaymentMethod("offline");
    setRating(0); // ⭐ reset
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🌱 Book Sugarcane</h2>

        <input placeholder="Farmer Name" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
        <input placeholder="Email (Track Order)" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
        <input placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} style={styles.input} />
        <textarea placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)} style={styles.input} />

        <select value={selectedVariety} onChange={e => setSelectedVariety(e.target.value)} style={styles.input}>
          <option value="">Select Variety</option>
          {varieties.map((v, i) => (
            <option key={i}>{v.name}</option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={acres}
          onChange={e => setAcres(+e.target.value)}
          style={styles.input}
        />

        {selectedItem && (
          <div style={styles.bill}>
            <p>Units Required: {requiredUnits}</p>
            <h3>Total Amount: ₹{totalAmount}</h3>
          </div>
        )}

        {/* ⭐⭐⭐⭐⭐ NEW: STAR RATING */}
        <div style={{ marginBottom: "15px" }}>
          <h4>⭐ How the Product Varieties </h4>
          <div style={{ fontSize: "24px", cursor: "pointer" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  color: star <= rating ? "#FFD700" : "#ccc",
                  marginRight: "5px",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* PAYMENT OPTIONS */}
        <div style={styles.radioGroup}>
          <label>
            <input type="radio" checked={paymentMethod === "offline"} onChange={() => setPaymentMethod("offline")} />
            Cash on Delivery
          </label>

          <label>
            <input type="radio" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
            Online Payment
          </label>
        </div>

        {paymentMethod === "offline" && (
          <div style={styles.infoBox}>
            <h4>🏢 Admin Store Address</h4>
            <p>
              Online Sugarcane Store<br />
              Sangli – Miraj Road,<br />
              Near Market Yard,<br />
              Sangli, Maharashtra – 416416<br />
              📞 +91 9876543210
            </p>
          </div>
        )}

        {paymentMethod === "online" && (
          <div style={styles.infoBox}>
            <img src={qrImage} alt="QR" style={{ width: "100%", borderRadius: "8px" }} />
            <input type="file" onChange={e => setPaymentProof(e.target.files[0]?.name)} style={styles.input} />
          </div>
        )}

        <button style={styles.btn} onClick={handleBooking}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e6f4ea,#ffffff)",
    animation: "fadeIn 0.6s ease",
  },
  card: {
    maxWidth: "520px",
    margin: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    animation: "slideUp 0.5s ease",
  },
  heading: {
    textAlign: "center",
    color: "#0b7d3b",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#0b7d3b",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  bill: {
    background: "#e6f4ea",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  radioGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "15px",
  },
  infoBox: {
    background: "#f1f8f4",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "15px",
    animation: "fadeIn 0.4s ease",
  },
};