import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 ADMIN UID (PASTE YOUR REAL UID HERE)
  const ADMIN_UID = "08MgjRo1kDOrMpPBWQP83VuhE0V2";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;

      alert("Login Successful");

      // ✅ UID BASED CHECK (100% WORKS)
      if (user.uid === ADMIN_UID) {
        navigate("/admin/dashboard");
      } else {
        navigate("/book");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Farmer / Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.btn}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
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
    padding: "12px",
    background: "#0b7d3b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
