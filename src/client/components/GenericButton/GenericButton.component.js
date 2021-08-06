import React from 'react';
import PropTypes from 'prop-types';
import './GenericButton.styles.css';

const GenericButton = ({
  buttonLabel,
  buttonSize,
  buttonType,
  buttonDisabled,
  onClick,
}) => {
  const getButtonClassName = () => {
    let buttonClassNames = 'generic-button';
    buttonClassNames += ` ${buttonSize}-button`;
    buttonClassNames += ` button-${buttonType}`;
    buttonClassNames += buttonDisabled ? ` disabled-button` : ` active-button`;
    return buttonClassNames;
  };

  return (
    <button type="button" className={getButtonClassName()} onClick={onClick}>
      {buttonLabel}
    </button>
  );
};

GenericButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonSize: PropTypes.oneOf(['large', 'medium', 'small']),
  buttonType: PropTypes.oneOf(['primary', 'secondary']),
  buttonDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

GenericButton.defaultProps = {
  buttonSize: 'medium',
  buttonType: 'primary',
  buttonDisabled: false,
};

export default GenericButton;
