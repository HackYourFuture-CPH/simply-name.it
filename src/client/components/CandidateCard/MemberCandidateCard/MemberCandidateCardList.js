import React from 'react';
import PropTypes from 'prop-types';
import './MemberCandidateCardList.style.css';

const CardListItem = (props) => {
  return (
    <li>
      <div className="me-card-container">
        <div className="me-card-title">
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

const CardList = ({ candidateList }) => {
  return (
    <ul className="me-card-display">
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
