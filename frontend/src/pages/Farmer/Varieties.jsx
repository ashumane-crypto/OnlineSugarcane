import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// images
import co86032 from "../../assets/co86032.jpg";
import coc671 from "../../assets/coc671.jpg";
import co0238 from "../../assets/co0238.jpg";
import co94012 from "../../assets/co94012.jpg";
import colk94184 from "../../assets/colk94184.jpg";
import co06022 from "../../assets/co06022.jpg";
import cosnk05103 from "../../assets/cosnk05103.webp";
import co99004 from "../../assets/co99004.webp";

const varietiesData = [
  {
    name: "Co 86032 Sugarcane Seeds",
    varietyCode: "Co 86032",
    type: "Seeds",
    price: 1200,
    maturity: "300 days",
    yield: "35-40 tons",
    stock: 420,
    image: co86032,
  },
  {
    name: "CoC 671 Sugarcane Plants",
    varietyCode: "CoC 671",
    type: "Plants",
    price: 1500,
    maturity: "320 days",
    yield: "38-42 tons",
    stock: 350,
    image: coc671,
  },
  {
    name: "Co 0238 Sugarcane Seeds",
    type: "Seeds",
    price: 1100,
    maturity: "310 days",
    image: co0238,
  },
  {
    name: "Co 94012 Sugarcane Plants",
    type: "Plants",
    price: 1400,
    maturity: "340 days",
    image: co94012,
  },
  {
    name: "CoLk 94184 Sugarcane Seeds",
    type: "Seeds",
    price: 1300,
    maturity: "315 days",
    image: colk94184,
  },
  {
    name: "Co 06022 Sugarcane Plants",
    type: "Plants",
    price: 1600,
    maturity: "330 days",
    image: co06022,
  },
  {
    name: "CoSnk 05103 Sugarcane Seeds",
    type: "Seeds",
    price: 1250,
    maturity: "305 days",
    image: cosnk05103,
  },
  {
    name: "Co 99004 Sugarcane Plants",
    type: "Plants",
    price: 1450,
    maturity: "290 days",
    image: co99004,
  },
];

export default function Varieties() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = varietiesData.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "All" || v.type === typeFilter)
  );

  return (
    <div style={styles.page}>
      <h2>Sugarcane Varieties</h2>

      <div style={styles.filterRow}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={styles.input}
        >
          <option value="All">All</option>
          <option value="Seeds">Seeds</option>
          <option value="Plants">Plants</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filtered.map((item, i) => (
          <div key={i} style={styles.card}>
            <img src={item.image} alt="" style={styles.img} />
            <div style={styles.cardBody}>
              <span style={styles.badge}>{item.type}</span>
              <h4>{item.name}</h4>
              <p>Maturity: {item.maturity}</p>
              <h3>₹{item.price}</h3>
            </div>

            <button
              style={styles.buyBtn}
              onClick={() => navigate("/book")}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    animation: "fadeIn 0.6s ease",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s",
  },
  img: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  cardBody: { padding: "15px" },
  badge: {
    fontSize: "12px",
    background: "#e6f4ea",
    color: "#0b7d3b",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  buyBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "#0b7d3b",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};
