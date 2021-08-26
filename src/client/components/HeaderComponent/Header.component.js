import React from 'react';
import './Header.styles.css';
import PropTypes from 'prop-types';

export default function HeaderComponent(props) {
  const { variant = 'full', colored, src, alt, children } = props;
  return (
    <div className="header-component-container">
      {colored ? (
        <div className="header-component-color"> </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`header-component-image-${variant}`}
        />
      )}

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
  colored: PropTypes.bool.isRequired,
  variant: PropTypes.string,
};

HeaderComponent.defaultProps = {
  src: 'https://i.ibb.co/nqysxTN/photo-1583710457367-47de0ea21fef.jpg',
  alt: 'background-image',
  variant: 'full',
};
