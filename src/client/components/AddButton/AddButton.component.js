import React from 'react';
import PropTypes from 'prop-types';
import './AddButton.styles.css';

const AddButton = ({ buttondisabled, onClick }) => {
  const getAddButtonClassName = () => {
    let buttonClassName = 'add-button';
    buttonClassName += buttondisabled ? 'disabled-button' : 'active-button';
    return buttonClassName;
  };

  return (
    <div>
      <button
        className={getAddButtonClassName()}
        type="button"
        onClick={onClick}
        buttondisabled={buttondisabled}
        aria-label="Add Button"
      >
        &#43;
      </button>
    </div>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func,
  buttondisabled: PropTypes.bool,
};

AddButton.defaultProps = {
  buttondisabled: false,
  onClick: undefined,
};
export default AddButton;
