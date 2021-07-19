import PropTypes from 'prop-types';
import React from 'react';
import './CheckboxInput.styles.css';

export const CheckboxItem = ({
  id,
  description,
  isDisabled,
  isChecked,
  onCheckboxChange,
}) => {
  return (
    <li className={`${'checkbox'} ${isDisabled && 'checkbox-disabled'}`}>
      <input
        id={id}
        type="checkbox"
        disabled={isDisabled}
        checked={isChecked}
        onChange={() => {
          onCheckboxChange(id);
        }}
      />
      <label htmlFor={id}>{description}</label>
    </li>
  );
};

export const CheckboxContainer = ({ children }) => {
  return <div>{children}</div>;
};

CheckboxContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

CheckboxItem.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default CheckboxContainer;
