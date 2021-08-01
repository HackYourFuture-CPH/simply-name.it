import React from 'react';
import PropTypes from 'prop-types';
import './CloseButton.styles.css';

const CloseButton = ({ onClick }) => {
  return (
    <div>
      <button
        className="close_button"
        type="button"
        onClick={onClick}
        aria-label="Close Button"
      >
        <div className="left_diagonal">
          <div className="right_diagonal" />
        </div>
      </button>
    </div>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func,
};

CloseButton.defaultProps = {
  onClick: () => {
    // eslint-disable-next-line no-console
  },
};

export default CloseButton;
