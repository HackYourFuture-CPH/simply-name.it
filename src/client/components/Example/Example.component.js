import React from 'react';
import PropTypes from 'prop-types';
import './Example.styles.css';

export default function Example({ title, onClick, children }) {
  return (
    <div className="example-component">
      <h2>{title}</h2>
      <p>(this is an example component)</p>
      {children}
      <button type="button" onClick={onClick}>
        Click me
      </button>
    </div>
  );
}

Example.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Example.defaultProps = {
  onClick: null,
  children: null,
};
