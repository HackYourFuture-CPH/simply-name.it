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
  function textChange(e) {
    if (e.target.value !== null && e.target.value !== '' && theme === 'light') {
      e.target.parentElement.parentElement.style.border = '1px solid black';
    } else {
      e.target.parentElement.parentElement.style.border = '';
    }
    onChange(e.target.value);
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
        {inputValue === null && (
          <input
            type={type}
            placeholder={placeholder}
            onChange={(e) => textChange(e)}
          />
        )}
        {inputValue !== null && (
          <input
            type={type}
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => textChange(e)}
          />
        )}
      </div>
    </div>
  );
}

InputComponent.propTypes = {
  type: PropTypes.oneOf(['text', 'date', 'number', 'password']),
  inputValue: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  borderShape: PropTypes.oneOf(['curved', 'round']),
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
