import React, { useState } from 'react';
import './Dropdown.css';
import PropTypes from 'prop-types';

export default function Dropdown(props) {
  const { variant = 'dark', children } = props;
  const [visible, setVisible] = useState(false);
  return (
    <div className="dropdown-container">
      <div className="dropdown-button-container">
        <button
          className={`dropdown-button ${variant}`}
          onClick={() => setVisible(!visible)}
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
  children: PropTypes.node.isRequired,
};
