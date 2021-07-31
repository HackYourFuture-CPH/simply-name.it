import React from 'react';
import PropTypes from 'prop-types';
import './Button.styles.css';

const Button = ({ buttonLabel, size, buttonType, disabled, onClick }) => {
  const getButtonClassName = () => {
    let buttonClassNames = 'button';
    buttonClassNames += ` ${size}`;
    buttonClassNames += ` ${buttonType}`;
    buttonClassNames += disabled ? ` disabled` : ` active`;
    return buttonClassNames;
  };

  return (
    <button type="button" className={getButtonClassName()} onClick={onClick}>
      {buttonLabel}
    </button>
  );
};

Button.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  size: PropTypes.oneOfType(['large', 'medium', 'small']),
  buttonType: PropTypes.oneOfType(['primary', 'secondary']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  size: 'medium',
  buttonType: 'primary',
  disabled: false,
};

export default Button;
