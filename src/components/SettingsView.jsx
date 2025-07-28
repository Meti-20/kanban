import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SettingsView = ({ darkMode, currentUser }) => {
  const [userCount, setUserCount] = useState(0);
  const [assignedTasks, setAssignedTasks] = useState(0);
  const [createdTasks, setCreatedTasks] = useState(0);

  const projectInfo = {
    name: " Kanban Board",
    version: "1.0",
    owner: "Meti Jemal",
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userSnap = await getDocs(collection(db, "users"));
        setUserCount(userSnap.size);

        const taskSnap = await getDocs(collection(db, "tasks"));
        let assigned = 0;
        let created = 0;

        taskSnap.forEach((doc) => {
          const task = doc.data();
          if (task.assignee === currentUser) assigned++;
          if (task.createdBy === currentUser) created++;
        });

        setAssignedTasks(assigned);
        setCreatedTasks(created);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, [currentUser]);

  const containerStyle = {
    padding: "20px",
    backgroundColor: darkMode ? "#222" : "#f9f9f9",
    color: darkMode ? "#fff" : "#333",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const sectionTitle = {
    fontSize: "18px",
    marginBottom: "10px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px",
  };

  const infoItem = {
    marginBottom: "8px",
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <div style={sectionTitle}>👤 Your Stats</div>
        <div style={infoItem}><strong>Assigned Tasks:</strong> {assignedTasks}</div>
        <div style={infoItem}><strong>Created Tasks:</strong> {createdTasks}</div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitle}>📊 Project Info</div>
        <div style={infoItem}><strong>Project Name:</strong> {projectInfo.name}</div>
        <div style={infoItem}><strong>Version:</strong> {projectInfo.version}</div>
        <div style={infoItem}><strong>Owner:</strong> {projectInfo.owner}</div>
        <div style={infoItem}><strong>Users on Board:</strong> {userCount}</div>
      </div>
    </div>
  );
};

export default SettingsView;
