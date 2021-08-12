import React from 'react';
import PropTypes from 'prop-types';
import './AddButton.styles.css';

const AddButton = ({ buttonDisabled, onClick }) => {
  const getAddButtonClassName = () => {
    let buttonClassName = 'add-button';
    buttonClassName += buttonDisabled ? ` active-button` : ` disabled-button`;
    return buttonClassName;
  };

  return (
    <div>
      <button
        className={getAddButtonClassName()}
        type="button"
        onClick={onClick}
        buttonDisabled={buttonDisabled}
        aria-label="Add Button"
      >
        &#43;
      </button>
    </div>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool,
};

AddButton.defaultProps = {
  buttonDisabled: false,
};
export default AddButton;
