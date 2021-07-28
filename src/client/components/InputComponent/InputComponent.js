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
    const classNames = ['inputComponentContainer'];
    classNames.push(borderShape === 'curved' ? 'curvedBorder' : 'roundBorder');
    classNames.push(theme === 'light' ? 'lightInput' : 'darkInput');
    return classNames.join(' ');
  }

  function textChange(e) {
    if (e.target.value !== null && e.target.value !== '' && theme === 'light') {
      e.target.parentElement.parentElement.style.border = '1px solid black';
    } else {
      e.target.parentElement.parentElement.style.border = '';
    }
    onChange(e.target.value);
  }

  function getSearchIconContent() {
    if (showSearchIcon) {
      return (
        <div className="searchContainer">
          <div className="searchContent">
            <div className="searchCircle">
              <div
                className={
                  theme === 'light'
                    ? 'searchCircleContentLight'
                    : 'searchCircleContentDark'
                }
              />
            </div>
            <div className="searchRectangle">
              <div className="searchRectangleContent" />
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className={getInputClassNames()}>
      {getSearchIconContent()}
      <div className="inputTextContainer">
        <input
          type={type}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => textChange(e)}
        />
      </div>
    </div>
  );
}

InputComponent.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'date',
    'datetime-local',
    'number',
    'password',
  ]),
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
  inputValue: undefined,
  theme: 'light',
  borderShape: 'round',
  showSearchIcon: false,
  onChange: undefined,
};
