// src/App.jsx
import React, { useState, useEffect } from "react";
import AppLayout from "./components/AppLayout";
import Board from "./components/Board";
import ActivityFeed from "./components/ActivityFeed";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      setSearchTerm={setSearchTerm}
    >
      <Board
        darkMode={darkMode}
        searchTerm={searchTerm}
        showTaskForm={showTaskForm}
        setShowTaskForm={setShowTaskForm}
      />
      <ActivityFeed />
    </AppLayout>
  );
}

export default App;
