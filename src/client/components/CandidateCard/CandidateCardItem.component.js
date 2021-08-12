import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';
import DeleteIcon from './SvgIcon.component';

export const CardListItem = ({ candidateName }) => {
  return (
    <li>
      <div className="card-container">
        <div className="card-title">
          <p>{candidateName}</p>
        </div>

        <div>
          <span>&#8942;</span>
          <span>&#8942;</span>
        </div>
      </div>
    </li>
  );
};

export const CardItemDecorator = ({ variant, display, candidateName }) => {
  return (
    <div className={`card-display ${variant}`}>
      <div className={`delete-icon-display ${display}`}>
        <DeleteIcon />
      </div>
      <CardListItem candidateName={candidateName} />
    </div>
  );
};

CardListItem.defaultProps = {
  candidateName: 'Standard Name',
};

CardListItem.propTypes = {
  candidateName: PropTypes.string,
};

CardItemDecorator.defaultProps = {
  candidateName: 'Some Candidate name',
};

CardItemDecorator.propTypes = {
  candidateName: PropTypes.string,
  variant: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
};
