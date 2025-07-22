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
            ...cardStyle(darkMode),
            backgroundColor: snapshot.isDragging
              ? (darkMode ? "#2d3a4a" : "#d1ecf1")
              : (darkMode ? "#2c2c2c" : "#ffffff"),
            ...provided.draggableProps.style,
          }}
        >
          <div>
            <strong>{task.candidateName}</strong>
            <div>
              <small>
                <b>Role:</b> {task.jobRole}
              </small>
            </div>
            <div>
              <small>
                <b>Deadline:</b> {task.deadline}
              </small>
            </div>
            <div>
              <small>
                <b>Assignee:</b> {task.assignee}
              </small>
            </div>
          </div>

          <button onClick={onEdit} style={editButtonStyle(darkMode)}>
            Edit
          </button>
          <button onClick={onDelete} style={deleteButtonStyle(darkMode)}>
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

// Dynamic card style
const cardStyle = (darkMode) => ({
  border: `1px solid ${darkMode ? "#555" : "#ccc"}`,
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "8px",
  color: darkMode ? "#f4f4f4" : "#000",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
});

// Dynamic button styles
const editButtonStyle = (darkMode) => ({
  marginTop: "10px",
  marginRight: "8px",
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
  marginTop: "10px",
  padding: "6px 10px",
  fontSize: "12px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  opacity: darkMode ? 0.9 : 1,
});

export default Card;
