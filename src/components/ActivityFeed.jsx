import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";

export default function ActivityFeed() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const q = query(collection(db, "activity"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const logsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLogs(logsData);
    } catch (err) {
      console.error("Failed to fetch activity feed:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // Clear all activity logs function
  const clearLogs = async () => {
    try {
      for (const log of logs) {
        await deleteDoc(doc(db, "activity", log.id));
      }
      setLogs([]);
    } catch (err) {
      console.error("Failed to clear activity feed:", err);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxHeight: "250px",
        overflowY: "auto",
        background: "#f9f9f9",
        borderRadius: "10px",
        margin: "20px auto",
        width: "80%",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>📜 Activity Feed</h3>

      {logs.length > 0 && (
        <button
          onClick={clearLogs}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "5px 10px",
            fontSize: "12px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#dc3545",
            color: "white",
          }}
        >
          Clear Feed
        </button>
      )}

      {logs.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
          {logs.map((log) => (
            <li key={log.id}>
              {log.message}{" "}
              <small style={{ color: "#555" }}>
                ({new Date(log.timestamp?.toDate?.()).toLocaleTimeString()})
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
