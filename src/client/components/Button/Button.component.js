import React from 'react';
import PropTypes from 'prop-types';
import './Button.styles.css';

const Button = ({
  buttonLabel,
  onClick,
  size,
  buttonColor,
  buttonBorder,
  buttonLabelColor,
}) => {
  const getButtonClassName = () => {
    let buttonClassNames = 'button';
    buttonClassNames += ` ${size}`;
    buttonClassNames += ` button-${buttonColor}`;
    buttonClassNames += ` text-${buttonLabelColor}`;
    buttonClassNames += ` border-${buttonBorder}`;
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
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOfType(['large', 'medium', 'small']),
  buttonColor: PropTypes.oneOfType([
    'white',
    'gray',
    'turquoise',
    'purple',
    'purple-gradient',
  ]),
  buttonBorder: PropTypes.oneOfType([
    'none',
    'black',
    'purple',
    'purple-gradient',
  ]),
  buttonLabelColor: PropTypes.oneOfType(['black', 'gray', 'white', 'purple']),
};

Button.defaultProps = {
  buttonLabel: 'HYF <3',
  size: 'large',
  onClick: null,
  buttonColor: 'purple',
  buttonBorder: 'none',
  buttonLabelColor: 'white',
};

export default Button;
