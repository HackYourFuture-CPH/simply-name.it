import React from 'react';
import PropTypes from 'prop-types';
import './AddButton.styles.css';

const AddButton = ({ onClick, disabled }) => {
  const getAddButtonClassName = () => {
    let buttonClassName = 'add-button';
    buttonClassName += disabled ? ` disabled-button` : ` active-button`;
    return buttonClassName;
  };

  return (
    <div>
      <button
        className={getAddButtonClassName()}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label="Add Button"
      >
        &#43;
      </button>
    </div>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

AddButton.defaultProps = {
  disabled: false,
};
export default AddButton;
