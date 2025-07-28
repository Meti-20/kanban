// src/components/Sidebar.jsx
import React, { useState } from "react";

const Sidebar = ({ setView }) => {
  const [active, setActive] = useState("Kanban");

  const sidebarStyle = {
    width: "220px",
    height: "100vh",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e0e0e0",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "30px",
  };

  const linkStyle = (label) => ({
    padding: "12px 15px",
    backgroundColor: active === label ? "#f0f0f0" : "transparent",
    color: active === label ? "#007bff" : "#333",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: active === label ? "bold" : "normal",
    transition: "all 0.2s",
  });

  const handleClick = (label) => {
    setActive(label);
    setView(label); // ← this updates the main view in App.jsx
  };

  return (
    <div style={sidebarStyle}>
      <div style={titleStyle}>Task Management</div>
      <div style={linkStyle("Kanban")} onClick={() => handleClick("Kanban")}>
        📋 Kanban Board
      </div>
      <div style={linkStyle("Settings")} onClick={() => handleClick("Settings")}>
        ⚙️ Settings
      </div>
    </div>
  );
};

export default Sidebar;
