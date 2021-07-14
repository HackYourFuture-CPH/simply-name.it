import React from 'react';
import PropTypes from 'prop-types';
import './PageTitle.style.css';

export default function PageTitle({ title, variant }) {
  return <div className={`pageTitle${variant}`}> {title} </div>;
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['Black', 'White', 'BigerBlack']),
};

PageTitle.defaultProps = {
  variant: 'Black',
};
