import React from 'react';
import './BoardCard.style.css';
import PropTypes from 'prop-types';

export default function BoardCard({ src, alt, boardTitle, children }) {
  return (
    <div className="card-container">
      <img src={src} alt={alt} className="card" />
      <div className="headerContainer">
        <div className="title">{boardTitle}</div>
        <div className="button">{children}</div>
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
