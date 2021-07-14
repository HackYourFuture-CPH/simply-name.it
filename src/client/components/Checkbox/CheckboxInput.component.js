import PropTypes from 'prop-types';
import React from 'react';
import './CheckboxInput.styles.css';

const optionList = [
  {
    id: 1,
    description: 'Add contact',
  },
  { id: 2, description: 'Block member' },
  { id: 3, description: 'Add member' },
];

const CheckboxItem = (props) => {
  const { id, onChange, isDisabled } = props;
  const handleChange = (e) => {
    e, e.target.checked, id;
  };
  return (
    <li>
      <div className="container">
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={handleChange}
            disabled={isDisabled}
          />
          <label> {props.option.description}</label>
        </div>
      </div>
    </li>
  );
};

const CheckboxContainer = () => {
  return (
    <li>
      <label htmlFor="checkbox">
        {optionList.map((option) => {
          return <CheckboxItem option={option} key={option.id} />;
        })}
      </label>
    </li>
  );
};

CheckboxContainer.propTypes = {
  id: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
CheckboxContainer.defaultProps = {
  isDisabled: false,
  description: PropTypes.string,
  option: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  }),
};
CheckboxItem.defaultProps = {
  description: 'Option',
  option: [1, 2, 3],
};

export default CheckboxContainer;
