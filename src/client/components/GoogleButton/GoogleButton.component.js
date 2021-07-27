import React from 'react';
import PropTypes from 'prop-types';

import './GoogleButton.css';

const GoogleButton = ({ hasAccount }) => {
  return (
    <div id="g-button">
      <span className="icon" />
      <span className="buttonText">Sign up with Google</span>
    </div>
  );
};

export default GoogleButton;
