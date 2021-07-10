import React from 'react';
import PropTypes from 'prop-types';
import './ArrowButton.css';

const ArrowButton = ({ onClick, backgroundColor }) => {
  const style = {
    '--backgroundColor': backgroundColor,
  };
  return (
    <div class="icon">
      <div
        class="arrow"
        type="button"
        onClick={() => onClick()}
        style={style}
      ></div>
    </div>
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
