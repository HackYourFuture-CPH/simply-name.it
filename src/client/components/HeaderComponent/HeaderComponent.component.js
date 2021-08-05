import React from 'react';
import './HeaderComponent.styles.css';
import PropTypes from 'prop-types';

export default function HeaderComponent({ variant, src, alt, children }) {
  return (
    <div className="headerComponent-container">
      <img src={src} alt={alt} className={`headerComponent-${variant}`} />
      <div className={`headerComponent-${variant}`}> </div>
      <div className="headerComponent-main">
        <div className="headerComponent-children">{children}</div>
      </div>
    </div>
  );
}

HeaderComponent.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

HeaderComponent.defaultProps = {
  src: 'https://i.ibb.co/nqysxTN/photo-1583710457367-47de0ea21fef.jpg',
  alt: 'background-image',
  variant: 'color',
};
