// src/components/Topbar.jsx
import React from "react";

const Topbar = ({ darkMode, setDarkMode, setSearchTerm }) => {
  const topbarStyle = {
    height: "60px",
    backgroundColor: darkMode ? "#2c2c3e" : "#ffffff",
    color: darkMode ? "#fff" : "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={topbarStyle}>
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "6px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "250px",
        }}
      />
      <button onClick={() => setDarkMode(prev => !prev)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
};

export default Topbar;
