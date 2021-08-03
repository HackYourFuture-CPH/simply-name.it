import React from 'react';
import PropTypes from 'prop-types';
import './Button.styles.css';

const Button = ({
  buttonLabel,
  buttonSize,
  buttonType,
  buttonDisabled,
  onClick,
}) => {
  const getButtonClassName = () => {
    let buttonClassNames = 'button';
    buttonClassNames += ` ${buttonSize}`;
    buttonClassNames += ` ${buttonType}`;
    buttonClassNames += buttonDisabled ? ` disabled` : ` active`;
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
  buttonSize: PropTypes.oneOfType(['large', 'medium', 'small']),
  buttonType: PropTypes.oneOfType(['primary', 'secondary']),
  buttonDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  buttonSize: 'medium',
  buttonType: 'primary',
  buttonDisabled: false,
};

export default Button;
