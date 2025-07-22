import React, { useState, useEffect } from "react";

export default function EditTask({ task, onSave, onCancel }) {
  const [candidateName, setCandidateName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    if (task) {
      setCandidateName(task.candidateName);
      setPriority(task.priority);
      setAssignee(task.assignee);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!candidateName.trim() || !assignee.trim()) return;
    onSave({ ...task, candidateName, priority, assignee });
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Candidate Name"
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Assignee"
          required
        />
        <button type="submit">💾 Save</button>
        <button type="button" onClick={onCancel}>
          ❌ Cancel
        </button>
      </form>
    </div>
  );
}
