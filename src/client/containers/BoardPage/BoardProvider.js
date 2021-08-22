import React, { useState, createContext, useContext } from 'react';
import './BoardPage.style.css';

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [isBoardLoading, setBoardLoading] = useState(true);
  const [isAddingCandidate, setAddingCandidate] = useState(true);
  const [isCandidateListLoading, setCandidateListLoading] = useState(true);

  return (
    <BoardContext.Provider
      value={{
        isBoardLoading,
        setBoardLoading,
        isAddingCandidate,
        setAddingCandidate,
        isCandidateListLoading,
        setCandidateListLoading,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const board = useContext(BoardContext);

  if (!board) {
    throw new Error('This component must be under UserProvider');
  }

  return board;
}
