import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import ActivityFeed from "./components/ActivityFeed";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <div style={{ minHeight: "100vh", background: darkMode ? "#1e1e1e" : "#fff", color: darkMode ? "#fff" : "#000" }}>
      <header style={{ padding: "10px", textAlign: "right" }}>
        <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "5px 10px" }}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>
      <Board />
      <ActivityFeed />
    </div>
  );
}

export default App;
