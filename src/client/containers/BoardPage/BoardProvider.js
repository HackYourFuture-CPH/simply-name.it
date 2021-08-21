import React, { useState, createContext, useContext } from 'react';
import './BoardPage.style.css';

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [Loading, setLoading] = useState(true);
  const [CandidateListLoading, setCandidateListLoading] = useState(true);

  return (
    <BoardContext.Provider
      value={{
        Loading,
        setLoading,
        CandidateListLoading,
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
