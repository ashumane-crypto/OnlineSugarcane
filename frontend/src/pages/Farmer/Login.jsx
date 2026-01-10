import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

// ✅ ADMIN UID FROM FIREBASE AUTH
const ADMIN_UID = "6JQiFxL1PwWnDxpHuDr99pDHRwB2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ ALWAYS LOGIN USING FIREBASE
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      // ✅ ADMIN CHECK BY UID
      if (uid === ADMIN_UID) {
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      // ✅ OTHERWISE FARMER
      navigate("/home", { replace: true });

    } catch (error) {
      alert("❌ Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: "Segoe UI", sans-serif; }
        body { margin: 0; }

        .wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg,#0b7d3b,#0ea44b);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .card {
          background: #fff;
          width: 100%;
          max-width: 420px;
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          animation: slideUp .8s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h2 { text-align: center; color:#0b7d3b; }
        p { text-align:center; color:#666; margin-bottom:25px; }

        .input { margin-bottom: 18px; }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        input:focus {
          border-color:#0b7d3b;
          outline:none;
        }

        button {
          width:100%;
          padding:12px;
          border:none;
          background:linear-gradient(135deg,#0b7d3b,#0ea44b);
          color:#fff;
          font-weight:600;
          border-radius:25px;
          cursor:pointer;
        }

        button:disabled { opacity:.6; }

        .link {
          text-align:center;
          margin-top:15px;
        }

        .link a {
          color:#0b7d3b;
          font-weight:600;
          text-decoration:none;
        }
      `}</style>

      <div className="wrapper">
        <div className="card">
          <h2>🌱 Online Sugarcane</h2>
          <p>Login to continue</p>

          <form onSubmit={handleLogin}>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input">
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="link">
            New farmer? <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
