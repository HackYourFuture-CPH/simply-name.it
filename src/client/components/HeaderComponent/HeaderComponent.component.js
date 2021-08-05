import React from 'react';
import './HeaderComponent.styles.css';
import PropTypes from 'prop-types';

export default function HeaderComponent({ src, alt, children }) {
  return (
    <div className="headerComponent-container">
      <img src={src} alt={alt} className="headerComponent-image" />
      <div className="headerComponent-main">
        <div className="headerComponent-title">{arrowButton}</div>
        <div className="headerComponent-children">{dropDownButton}</div>
      </div>
    </div>
  );
}

HeaderComponent.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
