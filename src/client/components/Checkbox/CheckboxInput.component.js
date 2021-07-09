import PropTypes from 'prop-types';
import React from 'react';
import './CheckboxInput.styles.css';

const Checkbox = (props) => {
  const { id, onChange, labelText, isDisabled } = props;
  return (
    <div className="container">
      <div className="checkbox">
        <li>
          <input
            type="checkbox"
            id="checkbox"
            onChange={(e) => {
              onChange(e, e.target.checked, id);
            }}
            disabled={isDisabled}
          />
          <label htmlFor="checkbox">
            <span>{labelText}</span>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            id="checkbox2"
            onChange={(e) => {
              onChange(e, e.target.checked, id);
            }}
            disabled={isDisabled}
          />
          <label htmlFor="checkbox2">
            <span>{labelText}</span>
          </label>
        </li>{' '}
        <li>
          <input
            type="checkbox"
            id="checkbox3"
            onChange={(e) => {
              onChange(e, e.target.checked, id);
            }}
            disabled={isDisabled}
          />
          <label htmlFor="checkbox3">
            <span>{labelText}</span>
          </label>
        </li>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
Checkbox.defaultProps = {
  isDisabled: false,
};

export default Checkbox;
