// components/TaskModal.jsx
import React from 'react';

const TaskModal = ({ task, onClose, onToggleSubtask }) => {
  if (!task) return null;

  const {
    title,
    description,
    priority,
    assignee,
    subtasks = [],
  } = task;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#ff4d4f';
      case 'Medium':
        return '#faad14';
      case 'Low':
        return '#52c41a';
      default:
        return '#ccc';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        width: '500px',
        background: '#fff',
        borderRadius: '10px',
        padding: '20px',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer'
        }}>✖</button>

        <h2>{title}</h2>
        <p><strong>Description:</strong> {description || "No description yet."}</p>

        <p>
          <strong>Priority:</strong>{" "}
          <span style={{
            backgroundColor: getPriorityColor(priority),
            color: '#fff',
            padding: '2px 10px',
            borderRadius: '20px'
          }}>
            {priority}
          </span>
        </p>

        <p><strong>Assignee:</strong> {assignee}</p>

        <div style={{ marginTop: '20px' }}>
          <strong>Subtasks:</strong>
          <ul>
            {subtasks.map((subtask, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => onToggleSubtask(index)}
                  />{" "}
                  {subtask.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
