import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// ✅ SAME ADMIN UID
const ADMIN_UID = "6JQiFxL1PwWnDxpHuDr99pDHRwB2";

const ProtectedRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      // ✅ ADMIN CHECK
      if (role === "admin") {
        setAllowed(user.uid === ADMIN_UID);
        setLoading(false);
        return;
      }

      // ✅ FARMER CHECK
      if (role === "user") {
        setAllowed(user.uid !== ADMIN_UID);
        setLoading(false);
        return;
      }
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) return <h2>Loading...</h2>;

  return allowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
