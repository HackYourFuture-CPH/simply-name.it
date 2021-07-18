import React from 'react';
import './BoardCard.style.css';
import PropTypes from 'prop-types';

export default function BoardCard({ src, alt, boardTitle, children }) {
  return (
    <div className="board-container">
      <img src={src} alt={alt} className="board-image" />
      <div className="board-header-container">
        <div className="board-title">{boardTitle}</div>
        <div className="children-button-class">{children}</div>
      </div>
    </div>
  );
}

BoardCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  boardTitle: PropTypes.string.isRequired,
};
