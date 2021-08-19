import React from 'react';
import PropTypes from 'prop-types';
import './PageTitle.style.css';

export default function PageTitle({ title, variant }) {
  return (
    <div className="page-title-container">
      <div className={`page-title-${variant}`}> {title} </div>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['black', 'black-large']),
};

PageTitle.defaultProps = {
  variant: 'black',
};
