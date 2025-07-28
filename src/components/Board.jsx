// src/components/Board.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ActivityFeed from "./ActivityFeed";
import SettingsView from "./SettingsView";
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
  const [inProgress, setInProgress] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [done, setDone] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState("Kanban");
  const activityRef = useRef(null);

  const fetchTasks = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const filterTasks = (tasks) =>
      tasks.filter((task) => {
        const name = task?.candidateName || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      });

    setIncomplete(filterTasks(tasks.filter((t) => t.status === "1")));
    setInProgress(filterTasks(tasks.filter((t) => t.status === "2")));
    setInReview(filterTasks(tasks.filter((t) => t.status === "3")));
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
      await addDoc(collection(db, "activity"), {
        message: `New task "${task.candidateName}" added.`,
        timestamp: serverTimestamp(),
      });
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
        timestamp: serverTimestamp(),
      });
      fetchTasks();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const allTasks = [...incomplete, ...inProgress, ...inReview, ...done];
    const task = allTasks.find((t) => t.id === draggableId);
    if (!task) return;

    deleteFromList(source.droppableId, draggableId);
    const updatedTask = { ...task, status: destination.droppableId };
    addToList(destination.droppableId, updatedTask);

    const taskRef = doc(db, "tasks", draggableId);
    await updateDoc(taskRef, { status: destination.droppableId });

    await addDoc(collection(db, "activity"), {
      message: `${task.candidateName} moved to ${getStatusName(destination.droppableId)}.`,
      timestamp: serverTimestamp(),
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
      case "2": return inProgress;
      case "3": return inReview;
      case "4": return done;
      default: return [];
    }
  };

  const getSetter = (listId) => {
    switch (listId) {
      case "1": return setIncomplete;
      case "2": return setInProgress;
      case "3": return setInReview;
      case "4": return setDone;
      default: return () => {};
    }
  };

  const getStatusName = (id) => {
    switch (id) {
      case "1": return "TO DO";
      case "2": return "IN PROGRESS";
      case "3": return "IN REVIEW";
      case "4": return "DONE";
      default: return "UNKNOWN";
    }
  };

  const renderView = () => {
    if (view === "Kanban") {
      return (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <button
              onClick={handleAddClick}
              style={{
                padding: "6px 14px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              + Add Task
            </button>

            <button
              onClick={() => activityRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "6px 12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              📜 Activity
            </button>
          </div>

          {showForm && (
            <div style={{ marginBottom: "0.5rem" }}>
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
                flexWrap: "nowrap",
                gap: "10px",
                width: "100%",
                overflowX: "hidden",
              }}
            >
              <div style={{ flex: "1 1 0", maxWidth: "24%" }}>
                <Column title="TO DO" tasks={incomplete} id="1" onEdit={handleEdit} onDelete={handleDelete} darkMode={darkMode} />
              </div>
              <div style={{ flex: "1 1 0", maxWidth: "24%" }}>
                <Column title="IN PROGRESS" tasks={inProgress} id="2" onEdit={handleEdit} onDelete={handleDelete} darkMode={darkMode} />
              </div>
              <div style={{ flex: "1 1 0", maxWidth: "24%" }}>
                <Column title="IN REVIEW" tasks={inReview} id="3" onEdit={handleEdit} onDelete={handleDelete} darkMode={darkMode} />
              </div>
              <div style={{ flex: "1 1 0", maxWidth: "24%" }}>
                <Column title="DONE" tasks={done} id="4" onEdit={handleEdit} onDelete={handleDelete} darkMode={darkMode} />
              </div>
            </div>
          </DragDropContext>

          <div ref={activityRef}>
            <ActivityFeed />
          </div>
        </>
      );
    } else if (view === "Activity") {
      return <ActivityFeed />;
    } else if (view === "Settings") {
      return <SettingsView />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: darkMode ? "#1e1e2f" : "#f1f1f1" }}>
      <Sidebar setView={setView} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setSearchTerm={setSearchTerm} />
        <div style={{ padding: "10px", overflowY: "auto", flex: 1 }}>
          {renderView()}
        </div>
      </div>
    </div>
  );
}
