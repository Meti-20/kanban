// src/components/Card.jsx
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ task, index, onEdit, onDelete, darkMode }) => {
  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...cardStyle(darkMode, snapshot.isDragging),
            ...provided.draggableProps.style,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{task.candidateName}</strong>
            <span style={priorityStyle(task.priority)}>{task.priority}</span>
          </div>

          <div style={{ marginTop: "6px", fontSize: "14px" }}>
            <div><b>Role:</b> {task.jobRole}</div>
            <div><b>Deadline:</b> {task.deadline}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <b>Assignee:</b>
              <span style={avatarStyle(task.assignee)}>{task.assignee?.charAt(0).toUpperCase()}</span>
              {task.assignee}
            </div>
          </div>

          {task.tags && (
            <div style={tagContainerStyle}>
              {task.tags.map((tag, idx) => (
                <span key={idx} style={tagStyle}>{tag}</span>
              ))}
            </div>
          )}

          <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
            <button onClick={onEdit} style={editButtonStyle(darkMode)}>Edit</button>
            <button onClick={onDelete} style={deleteButtonStyle(darkMode)}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

// ===== Styles =====

const cardStyle = (darkMode, isDragging) => ({
  border: `1px solid ${darkMode ? "#444" : "#ccc"}`,
  borderRadius: "12px",
  padding: "12px",
  marginBottom: "12px",
  backgroundColor: isDragging
    ? (darkMode ? "#2d3a4a" : "#e6f7ff")
    : (darkMode ? "#2c2c2c" : "#fff"),
  color: darkMode ? "#f4f4f4" : "#000",
  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  transition: "0.2s ease",
});

const priorityStyle = (priority) => {
  let color = "#ccc";
  if (priority === "High") color = "#dc3545";
  else if (priority === "Medium") color = "#ffc107";
  else if (priority === "Low") color = "#28a745";

  return {
    backgroundColor: color,
    color: "#fff",
    borderRadius: "6px",
    padding: "2px 8px",
    fontSize: "12px",
    fontWeight: "bold",
  };
};

const avatarStyle = (assignee) => {
  const color = stringToColor(assignee);
  return {
    display: "inline-block",
    backgroundColor: color,
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "center",
    margin: "0 6px",
  };
};

const tagContainerStyle = {
  marginTop: "8px",
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
};

const tagStyle = {
  backgroundColor: "#007bff22",
  color: "#007bff",
  fontSize: "11px",
  padding: "2px 8px",
  borderRadius: "12px",
  fontWeight: "500",
};

const editButtonStyle = (darkMode) => ({
  padding: "6px 10px",
  fontSize: "12px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  opacity: darkMode ? 0.9 : 1,
});

const deleteButtonStyle = (darkMode) => ({
  padding: "6px 10px",
  fontSize: "12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  opacity: darkMode ? 0.9 : 1,
});

const stringToColor = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = "#" + ((hash >> 24) & 0xff).toString(16).padStart(2, "0") +
                ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
                ((hash >> 8) & 0xff).toString(16).padStart(2, "0");
  return color.slice(0, 7);
};

export default Card;
