// src/components/Column.jsx
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

// === Column Layout ===
const Container = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? "#1e1e2f" : "#f4f5f7")};
  color: ${({ darkMode }) => (darkMode ? "#f4f4f4" : "#000")};
  border-radius: 10px;
  width: 100%;
  max-width: 240px;
  height: 100%;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ darkMode }) => (darkMode ? "#2b2b3c" : "#cceeff")};
  padding: 10px;
  border-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const CountBadge = styled.span`
  background-color: #007bff;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const TaskList = styled.div`
  padding: 10px 0;
  min-height: 100px;
`;

// === Sidebar + Topbar styles untouched ===

export default function Column({ title, tasks, id, onEdit, onDelete, darkMode }) {
  return (
    <Container darkMode={darkMode}>
      <TitleWrapper darkMode={darkMode}>
        <Title>{title}</Title>
        <CountBadge>{tasks.length}</CountBadge>
      </TitleWrapper>
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
