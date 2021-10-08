import React from 'react';
import './BoardCard.style.css';
import PropTypes from 'prop-types';

export default function BoardCard({ src, alt, boardTitle, children, onClick }) {
  return (
    <div className="board-container">
      <div className="board-content-container">
        <img src={src} alt={alt} className="board-image" />
        <div className="board-header-container">
          <div className="board-title">{boardTitle}</div>
          <div className="board-header-children">{children}</div>
        </div>
        <div className="board-body">
          <button type="button" className="board-button" onClick={onClick}>
            {' '}
          </button>
        </div>
      </div>
    </div>
  );
}

BoardCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  boardTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
