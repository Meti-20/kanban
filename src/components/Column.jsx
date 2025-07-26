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
  width: 400px;
  height: 800px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
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

// === Sidebar Styles ===
export const SidebarContainer = styled.div`
  width: 240px;
  background-color: ${({ darkMode }) => (darkMode ? "#1e1e2f" : "#ffffff")};
  border-right: 1px solid #ccc;
  height: 100vh;
  padding-top: 20px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  color: ${({ darkMode }) => (darkMode ? "#f4f4f4" : "#333")};
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#2c2c3c" : "#f0f0f0")};
  }

  svg {
    margin-right: 12px;
  }
`;

// === Topbar Styles ===
export const TopbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background-color: ${({ darkMode }) => (darkMode ? "#2b2b3c" : "#cceeff")};
  color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#000000")};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const TitleText = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

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
