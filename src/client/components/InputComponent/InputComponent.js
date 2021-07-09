import React from 'react';
import PropTypes from 'prop-types';
import './InputComponent.style.css';

export default function InputComponent({
  type,
  inputValue,
  placeholder,
  theme,
  borderShape,
  showSearchIcon,
  onChange,
}) {
  function getInputClassNames() {
    let classNames = 'inputComponentContainer';
    classNames += borderShape === 'curved' ? ' curvedBorder' : ' roundBorder';
    classNames += theme === 'light' ? ' lightInput' : ' darkInput';
    return classNames;
  }
  return (
    <div className={getInputClassNames()}>
      {showSearchIcon && (
        <div className="searchContainer">
          <div className="searchContent">
            <div className="searchCircle">
              <div className="searchCircleContent" />
            </div>
            <div className="searchRectangle">
              <div className="searchRectangleContent" />
            </div>
          </div>
        </div>
      )}
      <div className="inputTextContainer">
        <input
          type={type}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

InputComponent.propTypes = {
  type: PropTypes.oneOfType(['text', 'date', 'number']),
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.oneOfType(['light', 'dark']),
  borderShape: PropTypes.oneOfType(['curved', 'round']),
  showSearchIcon: PropTypes.bool,
  onChange: PropTypes.func,
};

InputComponent.defaultProps = {
  type: 'text',
  placeholder: '',
  inputValue: null,
  theme: 'light',
  borderShape: 'round',
  showSearchIcon: false,
  onChange: undefined,
};
