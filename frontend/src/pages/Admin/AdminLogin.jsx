import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/admin/orders");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Login</h2>

      <input placeholder="Admin Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={handleAdminLogin}>Login</button>
    </div>
  );
}
