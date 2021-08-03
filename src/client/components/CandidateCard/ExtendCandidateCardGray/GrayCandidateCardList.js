import React from 'react';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './GrayCandidateCardList.style.css';

const GrayCardListItem = (props) => {
  return (
    <li>
      <div className="gr-card-container">
        <RiDeleteBin6Line />
        <div className="gr-card-title">
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

const GrayCardList = ({ candidateList }) => {
  return (
    <ul className="gr-card-display">
      {candidateList.map((candidate) => {
        return <GrayCardListItem candidate={candidate} key={candidate.id} />;
      })}
    </ul>
  );
};
GrayCardList.propTypes = {
  candidateList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};
GrayCardListItem.defaultProps = {
  name: 'Standard Name',
  candidate: [],
};
GrayCardListItem.propTypes = {
  name: PropTypes.string,
  candidate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
export default GrayCardList;
