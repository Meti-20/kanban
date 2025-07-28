import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";

export default function ActivityFeed({ scrollRef }) {
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

  const handleClear = async () => {
    if (!window.confirm("Are you sure you want to clear all activity logs?")) return;
    try {
      for (const log of logs) {
        await deleteDoc(doc(db, "activity", log.id));
      }
      setLogs([]);
    } catch (error) {
      console.error("Failed to clear activity logs:", error);
    }
  };

  return (
    <div
      ref={scrollRef}
      style={{
        padding: "20px",
        maxHeight: "250px",
        overflowY: "auto",
        background: "#f9f9f9",
        borderRadius: "10px",
        margin: "20px auto",
        width: "80%",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>📜 Activity Feed</h3>

      <button
        onClick={handleClear}
        style={{
          marginBottom: "10px",
          padding: "6px 12px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Clear Activity Feed
      </button>

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
