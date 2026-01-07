import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Buy() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p>No product selected</p>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
        <img
          src={state.image}
          alt={state.name}
          style={{ width: "45%", borderRadius: "12px" }}
        />

        <div>
          <p style={{ color: "#0b7d3b" }}>{state.type}</p>
          <h2>{state.varietyCode}</h2>
          <p>{state.description}</p>

          <h3>Specifications</h3>
          <p>Maturity Period: {state.maturity}</p>
          <p>Expected Yield: {state.yield}</p>
          <p>Stock Available: {state.stock} units</p>

          <h3>Key Features</h3>
          <ul>
            {state.features.map((f, i) => (
              <li key={i}>✓ {f}</li>
            ))}
          </ul>

          <h2 style={{ marginTop: "15px" }}>₹{state.price}/unit</h2>

          <button
            style={{
              padding: "12px 25px",
              background: "#0b7d3b",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
