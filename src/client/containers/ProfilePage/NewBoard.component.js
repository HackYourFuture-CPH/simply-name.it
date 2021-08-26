import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import './NewBoard.styles.css';

export default function NewBoard({ onClick }) {
  return (
    <div className="board-container">
      <div className="add-new-board">
        <div className="create-new-board-title">New board</div>
        <div className="add-new-button">
          {/* add right path her to New board page */}
          <Link to="/new-board">
            <button type="button" onClick={onClick}>
              +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
