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
  const highlightedIconClass =
    inputValue !== null && inputValue !== '' ? 'highlightedIcon' : '';
  const iconCircleClass =
    theme === 'light' ? 'searchCircleContentLight' : 'searchCircleContentDark';

  function getInputClassNames() {
    const classNames = ['inputComponentContainer'];
    classNames.push(borderShape === 'curved' ? 'curvedBorder' : 'roundBorder');
    classNames.push(theme === 'light' ? 'lightInput' : 'darkInput');
    if (inputValue !== null && inputValue !== '') {
      classNames.push('inputHighlightedWhenNotEmpty');
    }
    return classNames.join(' ');
  }

  function getSearchIconContent() {
    if (showSearchIcon) {
      return (
        <div className="searchContainer">
          <div className="searchContent">
            <div className={`searchCircle ${highlightedIconClass}`}>
              <div className={iconCircleClass} />
            </div>
            <div className={`searchRectangle ${highlightedIconClass}`}>
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
          onChange={(e) => onChange(e.target.value)}
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
