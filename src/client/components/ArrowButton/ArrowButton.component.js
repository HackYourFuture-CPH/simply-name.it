import React from 'react';
import PropTypes from 'prop-types';
import './ArrowButton.styles.css';

const ArrowButton = ({ onClick, color }) => {
  const getArrowButtonClassName = () => {
    let buttonClassName = 'arrow-button';
    buttonClassName += color ? ` black-button` : ` white-button`;
    return buttonClassName;
  };
  return (
    <button
      className={getArrowButtonClassName()}
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
  color: PropTypes.bool,
};

ArrowButton.defaultProps = {
  color: 'white',
};

export default ArrowButton;
