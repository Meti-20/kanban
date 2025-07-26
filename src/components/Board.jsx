// src/components/Board.jsx
import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import ActivityFeed from "./ActivityFeed";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export default function Board({ searchTerm, darkMode }) {
  const [incomplete, setIncomplete] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [done, setDone] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const filterTasks = (tasks) =>
      tasks.filter((task) => {
        const name = task?.candidateName || "";
        const term = searchTerm || "";
        return name.toLowerCase().includes(term.toLowerCase());
      });

    setIncomplete(filterTasks(tasks.filter((t) => t.status === "1")));
    setInReview(filterTasks(tasks.filter((t) => t.status === "2")));
    setCompleted(filterTasks(tasks.filter((t) => t.status === "3")));
    setDone(filterTasks(tasks.filter((t) => t.status === "4")));
  }, [searchTerm]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddClick = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormSubmit = async (task) => {
    if (editingTask) {
      const taskRef = doc(db, "tasks", editingTask.id);
      await updateDoc(taskRef, task);
    } else {
      const newTask = {
        ...task,
        status: "1",
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "tasks"), newTask);
    }
    setShowForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.candidateName}"?`)) return;
    try {
      await deleteDoc(doc(db, "tasks", task.id));
      await addDoc(collection(db, "activity"), {
        message: `Task "${task.candidateName}" was deleted.`,
        timestamp: new Date().toISOString(),
      });
      fetchTasks();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const allTasks = [...incomplete, ...inReview, ...completed, ...done];
    const task = allTasks.find((t) => t.id === draggableId);
    if (!task) return;

    deleteFromList(source.droppableId, draggableId);
    const updatedTask = { ...task, status: destination.droppableId };
    addToList(destination.droppableId, updatedTask);

    const taskRef = doc(db, "tasks", draggableId);
    await updateDoc(taskRef, { status: destination.droppableId });

    await addDoc(collection(db, "activity"), {
      message: `${task.candidateName} moved to ${getStatusName(destination.droppableId)}.`,
      timestamp: new Date().toISOString(),
    });
  };

  const deleteFromList = (listId, taskId) => {
    const setList = getSetter(listId);
    const list = getList(listId);
    setList(list.filter((task) => task.id !== taskId));
  };

  const addToList = (listId, task) => {
    const setList = getSetter(listId);
    const list = getList(listId);
    setList([...list, task]);
  };

  const getList = (listId) => {
    switch (listId) {
      case "1": return incomplete;
      case "2": return inReview;
      case "3": return completed;
      case "4": return done;
      default: return [];
    }
  };

  const getSetter = (listId) => {
    switch (listId) {
      case "1": return setIncomplete;
      case "2": return setInReview;
      case "3": return setCompleted;
      case "4": return setDone;
      default: return () => {};
    }
  };

  const getStatusName = (id) => {
    switch (id) {
      case "1": return "TO DO";
      case "2": return "IN PROGRESS";
      case "3": return "COMPLETED";
      case "4": return "DONE";
      default: return "UNKNOWN";
    }
  };

  return (
    <div className={`board-wrapper ${darkMode ? "dark" : ""}`} style={{ padding: "1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button
          onClick={handleAddClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          + Add Task
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            initialData={editingTask}
          />
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          className="kanban-columns"
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
          }}
        >
          <Column
            title="TO DO"
            tasks={incomplete}
            id="1"
            onEdit={handleEdit}
            onDelete={handleDelete}
            darkMode={darkMode}
          />
          <Column
            title="IN PROGRESS"
            tasks={inReview}
            id="2"
            onEdit={handleEdit}
            onDelete={handleDelete}
            darkMode={darkMode}
          />
          <Column
            title="COMPLETED"
            tasks={completed}
            id="3"
            onEdit={handleEdit}
            onDelete={handleDelete}
            darkMode={darkMode}
          />
          <Column
            title="DONE"
            tasks={done}
            id="4"
            onEdit={handleEdit}
            onDelete={handleDelete}
            darkMode={darkMode}
          />
        </div>
      </DragDropContext>

      <ActivityFeed />
    </div>
  );
}
