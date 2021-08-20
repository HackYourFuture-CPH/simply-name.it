import React, { useState, createContext, useContext } from 'react';
import BoardPage from './BoardPage.container';
import './BoardPage.style.css';

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BoardContext.Provider value={{ isLoading, setIsLoading }}>
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
