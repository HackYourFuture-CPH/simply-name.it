import React from 'react';
import PropTypes from 'prop-types';

export default function PageTitle({
  title,
  color,
  fontSize,
  fontWeight,
  width,
}) {
  return (
    // implement title in div not h1 tage  to make it more responsive with style attributes
    <div style={{ color, fontSize, fontWeight, width }}>{title}</div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  width: PropTypes.string,
};

PageTitle.defaultProps = {
  color: '	#000000',
  fontSize: '100px',
  fontWeight: 'bold',
  width: '100px',
};
