import React from 'react';
import './Header.styles.css';
import PropTypes from 'prop-types';

export default function HeaderComponent({ variant, src, alt, children }) {
  return (
    <div className="header-component-container">
      <img src={src} alt={alt} className={`header-component-${variant}`} />
      <div className={`header-component-${variant}`}> </div>

      <div className="header-component-main">
        <div className="header-component-children">{children}</div>
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
