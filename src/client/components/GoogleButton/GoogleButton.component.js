import React from 'react';
import './GoogleButton.css';
import PropTypes from 'prop-types';

const GoogleButton = ({ onClickHandler }) => {
  return (
    <div
      id="g-button"
      onClick={onClickHandler}
      role="button"
      tabIndex={0}
      onKeyUp={onClickHandler}
    >
      <span className="google-icon" />
      <span className="buttonText">Sign up with Google</span>
    </div>
  );
};

GoogleButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default GoogleButton;
