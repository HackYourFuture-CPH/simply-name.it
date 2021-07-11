import React from 'react';
import './Dropdown.css';
import PropTypes from 'prop-types';

export default function Dropdown(props) {
  const { variant = 'dark', children, visible, onClick } = props;
  return (
    <div className="dropdown-container">
      <div className="dropdown-button-container">
        <button
          type="button"
          className={`dropdown-button ${variant}`}
          onClick={onClick}
        >
          &#10247;
        </button>
      </div>
      {visible && (
        <div className={`options-container ${variant}`}>{children}</div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  variant: 'Dark',
  visible: false,
};
