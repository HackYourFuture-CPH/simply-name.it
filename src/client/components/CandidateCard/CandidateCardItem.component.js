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

export const CardItemDecorator = ({
  colorVariant,
  displayDeleteIcon,
  candidateName,
}) => {
  return (
    <div className={`card-display ${colorVariant}`}>
      <div className={`delete-icon-display ${displayDeleteIcon}`}>
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
  colorVariant: PropTypes.string.isRequired,
  displayDeleteIcon: PropTypes.string.isRequired,
};
