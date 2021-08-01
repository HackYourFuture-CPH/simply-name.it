import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';

const CardListItem = (props) => {
  return (
    <li>
      <div>
        <h4 className="card-container">
          <strong>{props.candidate.name}</strong>
          <div>
            <span>&#8942;</span>
            <span>&#8942;</span>
          </div>
        </h4>
      </div>
    </li>
  );
};

const CardList = ({ candidateList }) => {
  return (
    <ul>
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
