import React, { useState, createContext, useContext } from 'react';
import './BoardPage.style.css';

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [isBoardLoading, setBoardLoading] = useState(true);
  const [boardInfo, setBoardInfo] = useState([]);

  return (
    <BoardContext.Provider
      value={{
        isBoardLoading,
        setBoardLoading,
        boardInfo,
        setBoardInfo,
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
