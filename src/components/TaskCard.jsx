// src/components/Topbar.jsx
import React from "react";
import styled from "styled-components";

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background-color: ${({ darkMode }) => (darkMode ? "#2b2b3c" : "#cceeff")};
  color: ${({ darkMode }) => (darkMode ? "#ffffff" : "#000000")};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TitleText = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const RightControls = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  outline: none;
`;

const AddButton = styled.button`
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

const Topbar = ({ darkMode }) => {
  return (
    <TopbarContainer darkMode={darkMode}>
      <TitleText>Task Management</TitleText>
      <RightControls>
        <SearchInput placeholder="Search..." />
        <AddButton>Add Task</AddButton>
      </RightControls>
    </TopbarContainer>
  );
};

export default Topbar;
