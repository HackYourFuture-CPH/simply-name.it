import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';
import DeleteIcon from './SvgIcon.component';

export const CardListItem = ({ candidateName, showDots, textAlignCenter }) => {
  return (
    <div className="card-container">
      <div className={textAlignCenter ? 'card-title-centered' : 'card-title'}>
        <p>{candidateName}</p>
      </div>
      {showDots && (
        <div>
          <span>&#8942;</span>
          <span>&#8942;</span>
        </div>
      )}
    </div>
  );
};

export const CardItemDecorator = ({
  colorVariant,
  displayDeleteIcon,
  candidateName,
  onClick,
  showDots = true,
  textAlignCenter = false,
}) => {
  return (
    <div className={`card-display ${colorVariant}`}>
      <div className={`delete-icon-display ${displayDeleteIcon}`}>
        <DeleteIcon onClick={onClick} />
      </div>
      <CardListItem
        candidateName={candidateName}
        showDots={showDots}
        textAlignCenter={textAlignCenter}
      />
    </div>
  );
};

CardListItem.defaultProps = {
  candidateName: 'Standard Name',
  showDots: true,
  textAlignCenter: false,
};

CardListItem.propTypes = {
  candidateName: PropTypes.string,
  showDots: PropTypes.bool,
  textAlignCenter: PropTypes.bool,
};

CardItemDecorator.defaultProps = {
  candidateName: 'Some Candidate name',
  showDots: true,
  textAlignCenter: false,
};

CardItemDecorator.propTypes = {
  candidateName: PropTypes.string,
  colorVariant: PropTypes.string.isRequired,
  displayDeleteIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  showDots: PropTypes.bool,
  textAlignCenter: PropTypes.bool,
};
