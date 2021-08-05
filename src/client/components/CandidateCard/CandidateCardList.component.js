import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';
import Icon from './SvgIcon.component';

const CardListItem = (props) => {
  return (
    <li>
      <div className="card-container">
        <div className="card-title">
          <p>{props.candidate.name}</p>
        </div>

        <div>
          <span>&#8942;</span>
          <span>&#8942;</span>
        </div>
      </div>
    </li>
  );
};

const CardList = ({ variant, candidateList, display }) => {
  return (
    <ul>
      {candidateList.map((candidate) => {
        return (
          <div className={`card-display ${variant}`}>
            <div className={`icon-display ${display}`}>
              <Icon />
            </div>
            <CardListItem candidate={candidate} key={candidate.id} />
          </div>
        );
      })}
    </ul>
  );
};
CardList.propTypes = {
  display: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  candidateList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};
CardListItem.defaultProps = {
  name: 'Standard Name',
  candidate: [],
};
CardListItem.propTypes = {
  name: PropTypes.string,
  candidate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
export default CardList;
