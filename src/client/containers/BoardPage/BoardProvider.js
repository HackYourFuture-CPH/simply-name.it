import React, { useState, createContext, useContext } from 'react';
import './BoardPage.style.css';
import PropTypes from 'prop-types';

const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [isCandidateLoading, setIsCandidateLoading] = useState(true);
  const [boardInfo, setBoardInfo] = useState([]);

  return (
    <BoardContext.Provider
      value={{
        isCandidateLoading,
        setIsCandidateLoading,
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

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
