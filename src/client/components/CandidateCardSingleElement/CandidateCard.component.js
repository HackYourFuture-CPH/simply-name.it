import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCard.styles.css';
import DeleteIcon from './SvgIcon.component';

const CardElement = ({
  variant,
  display,
  candidateName,
  dragdisplay,
  position,
}) => {
  return (
    <div className={`card-container ${variant}`}>
      <div className={`delete-icon ${display}`}>
        <DeleteIcon />
      </div>
      <div className={`card-title ${position}`}>
        <p>{candidateName}</p>
      </div>
      <div className={`drag-icon ${dragdisplay}`}>
        <span>&#8942;</span>
        <span>&#8942;</span>
      </div>
    </div>
  );
};

CardElement.defaultProps = {};
CardElement.propTypes = {
  position: PropTypes.string.isRequired,
  dragdisplay: PropTypes.string.isRequired,
  candidateName: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
export default CardElement;
