import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCard.style.css';
import TrashIcon from '../../assets/images/delete.svg';

const CardElement = ({
  variant,
  display,
  dragdisplay,
  position,
  candidate,
}) => {
  return (
    <div className={`card-container ${variant}`}>
      <div className={`delete-icon ${display}`}>
        <img alt="trash" src={TrashIcon} />
      </div>
      <div className={`card-title ${position}`}>
        <p>{candidate}</p>
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
  candidate: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  dragdisplay: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
export default CardElement;