import React from 'react';
import PropTypes from 'prop-types';
import './PageTitle.style.css';

export default function PageTitle({
  title,
  fontSize,
  fontWeight,
  colorVariant,
}) {
  return (
    <div className={` ${colorVariant}`} style={{ fontSize, fontWeight }}>
      {title}
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  colorVariant: PropTypes.string,
};

PageTitle.defaultProps = {
  fontSize: '100px',
  fontWeight: 'bold',
  colorVariant: 'black',
};
