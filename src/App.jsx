// src/App.jsx
import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import ActivityFeed from "./components/ActivityFeed";
import SettingsView from "./components/SettingsView";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [view, setView] = useState("Kanban");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <>
      {view === "Kanban" ? (
        <Board
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          setView={setView}
        />
      ) : view === "Settings" ? (
        <SettingsView darkMode={darkMode} />
      ) : (
        <ActivityFeed />
      )}
    </>
  );
}

export default App;
