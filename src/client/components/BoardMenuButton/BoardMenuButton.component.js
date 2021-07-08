import React from 'react';
import PropTypes from 'prop-types';
import './BoardMenuButton.styles.css';

const BoardMenuButton = (props) => {
  const { btnText, onClick, isDisabled } = props;
  return (
    <div>
      <button
        type="button"
        className="enabled"
        onClick={onClick}
        disabled={isDisabled}
      >
        {btnText}
      </button>
    </div>
  );
};

BoardMenuButton.propTypes = {
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
export default BoardMenuButton;
