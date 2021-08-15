import React from 'react';
import './GoogleButton.css';

const GoogleButton = (onClickHandler) => {
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

export default GoogleButton;
