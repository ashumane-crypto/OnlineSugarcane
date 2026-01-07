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
    features: ["High yield", "Good sugar recovery", "Early maturity"],
    description:
      "High-yielding early maturing variety with excellent sugar content.",
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
    features: [
      "Disease resistant",
      "High tillering",
      "Good juice quality",
      "Drought tolerant",
    ],
    description:
      "Premium quality disease-resistant variety suitable for tropical climate.",
    image: coc671,
  },
  {
    name: "Co 0238 Sugarcane Seeds",
    varietyCode: "Co 0238",
    type: "Seeds",
    price: 1100,
    maturity: "310 days",
    yield: "32-38 tons",
    stock: 280,
    features: ["Widely adapted", "Good sugar recovery"],
    description: "Widely adapted variety with stable yield.",
    image: co0238,
  },
  {
    name: "Co 94012 Sugarcane Plants",
    varietyCode: "Co 94012",
    type: "Plants",
    price: 1400,
    maturity: "340 days",
    yield: "40-45 tons",
    stock: 300,
    features: ["High biomass", "Strong stalks"],
    description: "Robust variety suitable for long duration cropping.",
    image: co94012,
  },
  {
    name: "CoLk 94184 Sugarcane Seeds",
    varietyCode: "CoLk 94184",
    type: "Seeds",
    price: 1300,
    maturity: "315 days",
    yield: "34-39 tons",
    stock: 260,
    features: ["Good ratoon ability"],
    description: "Excellent ratooning variety.",
    image: colk94184,
  },
  {
    name: "Co 06022 Sugarcane Plants",
    varietyCode: "Co 06022",
    type: "Plants",
    price: 1600,
    maturity: "330 days",
    yield: "42-48 tons",
    stock: 200,
    features: ["High yield", "Strong growth"],
    description: "High yielding plant variety.",
    image: co06022,
  },
  {
    name: "CoSnk 05103 Sugarcane Seeds",
    varietyCode: "CoSnk 05103",
    type: "Seeds",
    price: 1250,
    maturity: "305 days",
    yield: "36-40 tons",
    stock: 310,
    features: ["Stress tolerant"],
    description: "Stress tolerant seed variety.",
    image: cosnk05103,
  },
  {
    name: "Co 99004 Sugarcane Plants",
    varietyCode: "Co 99004",
    type: "Plants",
    price: 1450,
    maturity: "290 days",
    yield: "33-37 tons",
    stock: 180,
    features: ["Fast growth"],
    description: "Fast growing early harvest plant variety.",
    image: co99004,
  },
];

export default function Varieties() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = varietiesData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "All" || item.type === typeFilter)
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sugarcane Varieties</h2>
      <p style={{ color: "#666" }}>
        Explore our premium collection of certified sugarcane seeds and plants
      </p>

      {/* Search + Filter */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search varieties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            flex: 1,
            minWidth: "220px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="All">All Types</option>
          <option value="Seeds">Seeds only</option>
          <option value="Plants">Plants only</option>
        </select>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
        }}
      >
        {filtered.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: "14px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px", flexGrow: 1 }}>
              <span
                style={{
                  fontSize: "12px",
                  background: "#e6f4ea",
                  color: "#0b7d3b",
                  padding: "4px 10px",
                  borderRadius: "20px",
                }}
              >
                {item.type}
              </span>

              <h4 style={{ marginTop: "10px" }}>{item.name}</h4>
              <p>Maturity: {item.maturity}</p>
              <h3>₹{item.price}/unit</h3>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "15px",
                borderTop: "1px solid #eee",
              }}
            >
              <button
                onClick={() => navigate("/buy", { state: item })}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#ffffff",
                  color: "#0b7d3b",
                  border: "2px solid #0b7d3b",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                View Details
              </button>

              <button
                onClick={() => navigate("/book", { state: item })}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#0b7d3b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
