import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = result.user.uid;

      await set(ref(db, `users/${uid}`), {
        name,
        email,
        phone,
        village,
        role: "farmer",
      });

      alert("✅ Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing:border-box; font-family:"Segoe UI",sans-serif; }
        body { margin:0; }

        .wrapper {
          min-height:100vh;
          background:linear-gradient(135deg,#0b7d3b,#0ea44b);
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
        }

        .card {
          background:#fff;
          width:100%;
          max-width:450px;
          padding:35px;
          border-radius:18px;
          box-shadow:0 20px 40px rgba(0,0,0,0.2);
          animation:fadeIn .8s ease;
        }

        @keyframes fadeIn {
          from { opacity:0; transform:scale(.95); }
          to { opacity:1; transform:scale(1); }
        }

        h2 { text-align:center; color:#0b7d3b; }

        input {
          width:100%;
          padding:12px;
          margin-bottom:15px;
          border-radius:10px;
          border:1px solid #ccc;
        }

        button {
          width:100%;
          padding:12px;
          background:linear-gradient(135deg,#0b7d3b,#0ea44b);
          border:none;
          color:#fff;
          border-radius:25px;
          font-weight:600;
          cursor:pointer;
        }
      `}</style>

      <div className="wrapper">
        <div className="card">
          <h2>Farmer Registration</h2>

          <form onSubmit={handleRegister}>
            <input placeholder="Full Name" required onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)} />
            <input placeholder="Mobile Number" required onChange={(e)=>setPhone(e.target.value)} />
            <input placeholder="Village" required onChange={(e)=>setVillage(e.target.value)} />
            <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />

            <button>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}
