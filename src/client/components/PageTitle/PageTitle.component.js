import React from 'react';
import PropTypes from 'prop-types';
import './PageTitle.style.css';

export default function PageTitle({ title, fontSize, isBold, colorVariant }) {
  return (
    <div
      className={`pageTitle${colorVariant}`}
      style={{ fontSize, fontWeight: isBold ? 'bold' : 'normal' }}
    >
      {title}
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  isBold: PropTypes.bool,
  colorVariant: PropTypes.oneOf(['black', 'white']),
};

PageTitle.defaultProps = {
  fontSize: '100px',
  isBold: false,
  colorVariant: 'black',
};
