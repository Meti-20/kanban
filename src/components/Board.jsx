import React, { useState, useEffect } from "react";
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

export default function Board() {
  const [incomplete, setIncomplete] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // 🌙 Dark mode toggle

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setIncomplete(tasks.filter((t) => t.status === "1"));
    setInReview(tasks.filter((t) => t.status === "2"));
    setCompleted(tasks.filter((t) => t.status === "3"));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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

    const allTasks = [...incomplete, ...inReview, ...completed];
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
      case "1":
        return incomplete;
      case "2":
        return inReview;
      case "3":
        return completed;
      default:
        return [];
    }
  };

  const getSetter = (listId) => {
    switch (listId) {
      case "1":
        return setIncomplete;
      case "2":
        return setInReview;
      case "3":
        return setCompleted;
      default:
        return () => {};
    }
  };

  const getStatusName = (id) => {
    switch (id) {
      case "1":
        return "TO DO";
      case "2":
        return "IN PROGRESS";
      case "3":
        return "COMPLETED";
      default:
        return "UNKNOWN";
    }
  };

  return (
    <div
      style={{
        background: darkMode ? "#121212" : "#f4f4f4",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <h2 style={{ textAlign: "center", paddingTop: "10px" }}>KANBAN BOARD</h2>

      <div style={{ textAlign: "center", margin: "10px" }}>
        <button
          onClick={handleAddClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          ➕ {editingTask ? "Edit Task" : "Add Task"}
        </button>

        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: darkMode ? "#444" : "#ccc",
            color: darkMode ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {showForm && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            initialData={editingTask}
          />
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "1300px",
            margin: "0 auto",
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
        </div>
      </DragDropContext>

      <ActivityFeed />
    </div>
  );
}
