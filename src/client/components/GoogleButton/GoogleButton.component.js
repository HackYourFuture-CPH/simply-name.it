import React from 'react';
import PropTypes from 'prop-types';

import './GoogleButton.css';

export const GoogleButton = ({ hasAccount }) => {
  return (
    <div id="g-button">
      <span className="buttonText">Sign {hasAccount ? 'in' : 'up'} with</span>
      <span className="icon" />
    </div>
  );
};

GoogleButton.propTypes = {
  signedIn: PropTypes.bool,
};

GoogleButton.defaultProps = {
  signedIn: true,
};
