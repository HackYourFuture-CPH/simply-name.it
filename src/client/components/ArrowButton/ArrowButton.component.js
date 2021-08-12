import React from 'react';
import PropTypes from 'prop-types';
import './ArrowButton.styles.css';

const ArrowButton = ({ onClick, color }) => {
  return (
    <button
      className={`arrow-button-${color}`}
      type="button"
      onClick={onClick}
      color={color}
    >
      &#8592;
    </button>
  );
};

ArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(['black', 'white']),
};

ArrowButton.defaultProps = {
  color: 'white',
};

export default ArrowButton;
