// src/components/Column.jsx
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? "#1e1e2f" : "#f4f5f7")};
  color: ${({ darkMode }) => (darkMode ? "#f4f4f4" : "#000")};
  border-radius: 6px;
  width: 400px;
  height: 800px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
`;

const Title = styled.h3`
  text-align: center;
  background-color: ${({ darkMode }) => (darkMode ? "#2b2b3c" : "#cceeff")};
  color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#000000")};
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TaskList = styled.div`
  padding: 10px 0;
  min-height: 100px;
`;

export default function Column({ title, tasks, id, onEdit, onDelete, darkMode }) {
  return (
    <Container darkMode={darkMode}>
      <Title darkMode={darkMode}>{title}</Title>
      <Droppable droppableId={id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Card
                key={task.id}
                task={task}
                index={index}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task)}
                darkMode={darkMode}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
