import React from 'react';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './ExtendCandidateCardList.style.css';

const ExtendCardListItem = (props) => {
  return (
    <li>
      <div className="ex-card-container">
        <RiDeleteBin6Line />
        <div className="ex-card-title">
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

const ExtendCardList = ({ candidateList }) => {
  return (
    <ul className="ex-card-display">
      {candidateList.map((candidate) => {
        return <ExtendCardListItem candidate={candidate} key={candidate.id} />;
      })}
    </ul>
  );
};
ExtendCardList.propTypes = {
  candidateList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};
ExtendCardListItem.defaultProps = {
  name: 'Standard Name',
  candidate: [],
};
ExtendCardListItem.propTypes = {
  name: PropTypes.string,
  candidate: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
export default ExtendCardList;
