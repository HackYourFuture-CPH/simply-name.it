import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';

const CardListItem = (props) => {
  return (
    <li>
      <div className="card-container">
        <p>{props.candidate.name}</p>
        <div>
          <span>&#8942;</span>
          <span>&#8942;</span>
        </div>
      </div>
    </li>
  );
};

const CardList = ({ candidateList }) => {
  return (
    <ul className="card-display">
      {candidateList.map((candidate) => {
        return <CardListItem candidate={candidate} key={candidate.id} />;
      })}
    </ul>
  );
};
CardList.propTypes = {
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
