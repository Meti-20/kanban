// src/components/Column.jsx
import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 6px;
  width: 400px;
  height: 800px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
`;

const Title = styled.h3`
  text-align: center;
  background-color: #cceeff;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TaskList = styled.div`
  padding: 10px 0;
  min-height: 100px;
`;

export default function Column({ title, tasks, id, onEdit, onDelete }) {
  return (
    <Container>
      <Title>{title}</Title>
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
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
