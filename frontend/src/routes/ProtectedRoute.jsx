import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, get } from "firebase/database";

const ProtectedRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      // role = "user" OR "admin"
      const roleRef = ref(db, `${role}s/${user.uid}`);
      const snapshot = await get(roleRef);

      setAllowed(snapshot.exists());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return allowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

