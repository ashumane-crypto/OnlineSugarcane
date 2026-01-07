import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../firebase";

// QR image
import qrImage from "../../assets/qr_image.jpg";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState(""); // ✅ NEW
  const [selectedVariety, setSelectedVariety] = useState("");
  const [acres, setAcres] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("offline");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentProof, setPaymentProof] = useState("");

  const selectedItem = varieties.find(v => v.name === selectedVariety);
  const unitsPerAcre = selectedItem?.type === "Seeds" ? 10 : 8;
  const requiredUnits = selectedItem ? acres * unitsPerAcre : 0;
  const totalAmount = selectedItem ? requiredUnits * selectedItem.price : 0;

  const handleLogin = () => {
    if (email && password) setIsLoggedIn(true);
    else alert("Enter email and password");
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPaymentProof(reader.result);
    reader.readAsDataURL(file);
  };

  const handleBooking = async () => {
    if (!name || !mobile || !address || !selectedVariety) {
      alert("Fill all details");
      return;
    }

    if (paymentMethod === "online" && !paymentProof) {
      alert("Upload payment screenshot");
      return;
    }

    const orderData = {
      name,
      email,
      mobile,
      address, // ✅ SAVED
      variety: selectedVariety,
      acres,
      requiredUnits,
      pricePerUnit: selectedItem.price,
      totalAmount,
      paymentMethod,
      paymentProof: paymentMethod === "online" ? paymentProof : "",
      status:
        paymentMethod === "online"
          ? "Payment Verification Pending"
          : "Cash On Delivery",
      createdAt: new Date().toISOString(),
    };

    try {
      await push(ref(db, "orders"), orderData);
      alert("Order placed successfully");
      setName("");
      setMobile("");
      setAddress("");
      setSelectedVariety("");
      setAcres(1);
      setPaymentProof("");
    } catch (err) {
      alert("Error saving order");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Book Sugarcane</h2>

      {!isLoggedIn && (
        <div style={styles.card}>
          <h3>Login</h3>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
          <button style={styles.btn} onClick={handleLogin}>Login</button>
        </div>
      )}

      {isLoggedIn && (
        <div style={styles.card}>
          <h3>Order Details</h3>

          <input placeholder="Farmer Name" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
          <input placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} style={styles.input} />

          {/* ✅ ADDRESS INPUT */}
          <textarea
            placeholder="Full Delivery Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            style={{ ...styles.input, minHeight: "80px" }}
          />

          <select value={selectedVariety} onChange={e => setSelectedVariety(e.target.value)} style={styles.input}>
            <option value="">Select Variety</option>
            {varieties.map((v, i) => (
              <option key={i} value={v.name}>{v.name}</option>
            ))}
          </select>

          <input type="number" min="1" value={acres} onChange={e => setAcres(Number(e.target.value))} style={styles.input} />

          {selectedItem && (
            <div style={styles.bill}>
              <p>Units Required: {requiredUnits}</p>
              <p>Price / Unit: ₹{selectedItem.price}</p>
              <h3>Total: ₹{totalAmount}</h3>
            </div>
          )}

          <label>
            <input type="radio" checked={paymentMethod === "offline"} onChange={() => setPaymentMethod("offline")} />
            Cash on Delivery
          </label>

          <br />

          <label>
            <input type="radio" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
            Online Payment
          </label>

          {paymentMethod === "offline" && (
            <div style={styles.addressBox}>
              <strong>Shop Address:</strong>
              <p>Shree Sugarcane Seeds Center</p>
              <p>Sangli – 416416, Maharashtra</p>
              <p>📞 9876543210</p>
            </div>
          )}

          {paymentMethod === "online" && (
            <div style={styles.bill}>
              <img src={qrImage} alt="QR Code" style={{ width: "100%", marginBottom: "10px" }} />
              <input type="file" accept="image/*" onChange={handleScreenshotUpload} />
            </div>
          )}

          <button style={styles.btn} onClick={handleBooking}>Confirm Order</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "520px", margin: "auto", padding: "30px" },
  card: { background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 5px 12px rgba(0,0,0,0.1)", marginTop: "20px" },
  input: { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "8px", border: "1px solid #ccc" },
  btn: { width: "100%", padding: "12px", background: "#0b7d3b", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600" },
  bill: { background: "#e6f4ea", padding: "12px", borderRadius: "8px", marginBottom: "12px" },
  addressBox: { background: "#fff3cd", padding: "12px", borderRadius: "8px", marginBottom: "12px" },
};
