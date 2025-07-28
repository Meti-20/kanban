import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Board from "./Board";
import ActivityFeed from "./ActivityFeed";
import SettingsView from "./SettingsView";

const InnerLayout = ({ darkMode, setDarkMode, searchTerm, setSearchTerm }) => {
  const [currentView, setCurrentView] = useState("Kanban");
  const [showTaskForm, setShowTaskForm] = useState(false);

  const layoutStyle = {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "sans-serif",
    width: "100vw",
  };

  const contentWrapper = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };

  const contentArea = {
    flex: 1,
    padding: "20px",
    overflowX: "auto",
    overflowY: "auto",
    backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
  };

  const renderView = () => {
    switch (currentView) {
      case "Kanban":
        return (
          <Board
            darkMode={darkMode}
            searchTerm={searchTerm}
            showTaskForm={showTaskForm}
            setShowTaskForm={setShowTaskForm}
          />
        );
      case "Settings":
        return <SettingsView darkMode={darkMode} />;
      case "Activity":
        return <ActivityFeed />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div style={layoutStyle}>
      <Sidebar setView={setCurrentView} />
      <div style={contentWrapper}>
        {currentView === "Kanban" && (
          <Topbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setSearchTerm={setSearchTerm ?? (() => {})}
            onAddClick={() => setShowTaskForm(true)}
          />
        )}
        <div style={contentArea}>{renderView()}</div>
      </div>
    </div>
  );
};

export default InnerLayout;
