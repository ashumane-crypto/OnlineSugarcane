// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// 🔹 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEp-5_akfx18hqt5XdVDEL5CPzYxtQFrE",
  authDomain: "onlinesugarcane-298a1.firebaseapp.com",
  projectId: "onlinesugarcane-298a1",
  storageBucket: "onlinesugarcane-298a1.firebasestorage.app",
  messagingSenderId: "1030351250810",
  appId: "1:1030351250810:web:c787f936ae31e764a0a2c3",
  measurementId: "G-2QX5D6WNWQ"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 EXPORT AUTH & DATABASE (THIS WAS MISSING)
export const auth = getAuth(app);
export const db = getDatabase(app);

// 🔹 Export app (optional but good practice)
export default app;