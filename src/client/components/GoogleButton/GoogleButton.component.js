import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './GoogleButton.css';

export const GoogleButton = ({ signedIn }) => {
  const [hasAccount, setHasAccount] = useState(signedIn); //so it can be reused both as "sign in" or "sign up"

  return (
    <div id="g-button">
      <span class="buttonText">Sign {hasAccount ? 'in' : 'up'} with</span>
      <span class="icon"></span>
    </div>
  );
};

GoogleButton.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};

GoogleButton.defaultProps = {
  signedIn: true,
};
