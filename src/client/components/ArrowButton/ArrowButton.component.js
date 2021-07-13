import React from 'react';
import PropTypes from 'prop-types';
import './ArrowButton.styles.css';

const ArrowButton = ({ onClick, backgroundColor }) => {
  return (
    <button
      className="arrow-button-wrapper"
      type="button"
      onClick={() => onClick()}
    >
      <div className="icon">
        <div
          className={`${'arrow'} ${'arrow-background-'}${backgroundColor}`}
          aria-label="Arrow Button"
        />
      </div>
    </button>
  );
};

ArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
};

ArrowButton.defaultProps = {
  backgroundColor: '#000',
};

export default ArrowButton;
