import React from 'react';
import PropTypes from 'prop-types';
import './CloseButton.styles.css';

const CloseButton = ({ onClick }) => {
  return (
    <div class="icon">
      <div class="close_button" type="button" onClick={() => onClick()}></div>
    </div>
  );
};
CloseButton.propTypes = {
  onClick: PropTypes.func,
};

export default CloseButton;
