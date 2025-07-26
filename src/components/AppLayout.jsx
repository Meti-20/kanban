// src/components/AppLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ children, darkMode, setDarkMode, setSearchTerm }) => {
  const layoutStyle = {
    display: "flex",
    height: "100vh",
    background: darkMode ? "#1e1e1e" : "#f5f7fa",
    color: darkMode ? "#fff" : "#000",
    fontFamily: "sans-serif",
  };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const pageContentStyle = {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  };

  return (
    <div style={layoutStyle}>
      <Sidebar />
      <div style={mainContentStyle}>
        <Topbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setSearchTerm={setSearchTerm}
        />
        <main style={pageContentStyle}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
