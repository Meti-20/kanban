// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Replace this with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyD1pdI7_VnkjT6w6RhUmNjYJ6vM3T4ooBY",
  authDomain: "kanban-board-a60eb.firebaseapp.com",
  projectId: "kanban-board-a60eb",
  storageBucket: "kanban-board-a60eb.appspot.com",
  messagingSenderId: "780978830120",
  appId: "1:780978830120:web:8e2f6d1fbc0e9b7d2dae1d",
  measurementId: "G-L65MZERTVG"
};

// ✅ Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Export db (MUST export by name, not default)
export { db };
