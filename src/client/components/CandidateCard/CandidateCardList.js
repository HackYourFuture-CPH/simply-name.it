import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';

const candidateList = [
  {
    id: 1,
    name: 'Eric',
  },
  {
    id: 2,
    name: 'Hipolito',
  },
  {
    id: 3,
    name: 'Robert     ',
  },
  {
    id: 4,
    name: 'Dennis',
  },
];

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

const CardList = () => {
  return (
    <ul className="card-display">
      {candidateList.map((candidate) => {
        return <CardListItem candidate={candidate} key={candidate.id} />;
      })}
    </ul>
  );
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
