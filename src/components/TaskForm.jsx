import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [jobRole, setJobRole] = useState("Frontend Developer");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCandidateName(initialData.candidateName || "");
      setJobRole(initialData.jobRole || "Frontend Developer");
      setAssignee(initialData.assignee || "");
      setPriority(initialData.priority || "Medium");
      setDeadline(initialData.deadline || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !candidateName || !jobRole || !assignee || !priority || !deadline) return;

    const taskData = {
      ...initialData,
      title,
      candidateName,
      jobRole,
      assignee,
      priority,
      deadline,
    };

    onSubmit(taskData);

    if (!initialData) {
      setTitle("");
      setCandidateName("");
      setJobRole("Frontend Developer");
      setAssignee("");
      setPriority("Medium");
      setDeadline("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>{initialData ? "Edit Task" : "Add New Task"}</h3>

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />

      <label>Candidate Name:</label>
      <input
        type="text"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
        required
        style={inputStyle}
      />

      <label>Job Role:</label>
      <select
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        style={inputStyle}
      >
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Engineer">Backend Engineer</option>
        <option value="UX Designer">UX Designer</option>
        <option value="QA Tester">QA Tester</option>
      </select>

      <label>Priority:</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
        style={inputStyle}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label>Assignee:</label>
      <input
        type="text"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        placeholder="Enter assignee name"
        required
        style={inputStyle}
      />

      <label>Deadline:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
        style={inputStyle}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" style={buttonStyle}>
          {initialData ? "Update" : "Add Task"}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} style={cancelButtonStyle}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  border: "1px solid lightgray",
  borderRadius: "8px",
  background: "#f9f9f9",
  width: "300px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  ...buttonStyle,
  background: "#6c757d",
};

export default TaskForm;
