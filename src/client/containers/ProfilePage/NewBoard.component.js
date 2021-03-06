import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import './NewBoard.styles.css';

export default function NewBoard() {
  const history = useHistory();
  return (
    <div className="board-container">
      <div className="board-content-container add-new-board">
        <div className="create-new-board-title">New board</div>
        <div className="add-board-container">
          <button
            className="add-board-button"
            type="button"
            onClick={() => {
              history.push('/boards/new-board');
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
