// src/components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  const sidebarStyle = {
    width: "200px",
    height: "100vh",
    backgroundColor: "#1e1e2f",
    color: "white",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const navStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const linkStyle = {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "1rem",
    padding: "8px",
    borderRadius: "6px",
    transition: "0.3s",
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={{ margin: 0 }}>RecruitFlow</h2>
      <nav style={navStyle}>
        <a href="#" style={linkStyle}>Kanban Board</a>
        <a href="#" style={linkStyle}>Settings</a>
      </nav>
    </div>
  );
};

export default Sidebar;
