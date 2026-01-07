import React, { useState } from "react";

export default function AddVariety() {
  const [form, setForm] = useState({
    name: "",
    varietyCode: "",
    type: "Seeds",
    price: "",
    maturity: "",
    yield: "",
    stock: "",
    features: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.stock) {
      alert("Please fill required fields");
      return;
    }

    // 🔥 Later: Push this object to Firebase
    console.log("New Variety Data:", form);
    alert("Variety added successfully (Firebase connect later)");

    setForm({
      name: "",
      varietyCode: "",
      type: "Seeds",
      price: "",
      maturity: "",
      yield: "",
      stock: "",
      features: "",
      description: "",
    });
  };

  return (
    <div style={styles.page}>
      <h2>Add New Sugarcane Variety</h2>
      <p style={styles.subText}>
        Enter complete details to add a new variety to the catalog
      </p>

      <div style={styles.card}>
        <div style={styles.grid}>
          <input
            name="name"
            placeholder="Variety Name *"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="varietyCode"
            placeholder="Variety Code (e.g. Co 86032)"
            value={form.varietyCode}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Seeds">Seeds</option>
            <option value="Plants">Plants</option>
          </select>

          <input
            name="price"
            type="number"
            placeholder="Price per Unit (₹) *"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="maturity"
            placeholder="Maturity (e.g. 300 days)"
            value={form.maturity}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="yield"
            placeholder="Expected Yield (e.g. 35-40 tons)"
            value={form.yield}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="stock"
            type="number"
            placeholder="Available Stock *"
            value={form.stock}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <textarea
          name="features"
          placeholder="Key Features (comma separated)"
          value={form.features}
          onChange={handleChange}
          style={styles.textarea}
        />

        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button onClick={handleSubmit} style={styles.btn}>
          ➕ Add Variety
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    maxWidth: "900px",
    margin: "auto",
  },
  subText: {
    color: "#666",
    marginBottom: "25px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "15px",
    marginBottom: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    fontSize: "14px",
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
    fontSize: "16px",
  },
};
