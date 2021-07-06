import React from 'react';
import PropTypes from 'prop-types';

export default function PageTitle({ title, color, fontSize, fontWeight }) {
  return (
    // implement title in div not h1 tage  to make it more responsive with style attributes
    <div style={{ color: color, fontSize: fontSize, fontWeight: fontWeight }}>
      {title}
    </div>
  );
}

PageTitle.prototype = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
};
