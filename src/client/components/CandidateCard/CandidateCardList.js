import React from 'react';
import PropTypes from 'prop-types';
import './CandidateCardList.style.css';

const characters = [
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
          <strong>{props.character.name}</strong>
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
    <ul>
      {characters.map((character) => {
        return <CardListItem character={character} key={character.id} />;
      })}
    </ul>
  );
};
CardListItem.defaultProps = {
  name: 'Standard Name',
  character: [],
};
CardListItem.propTypes = {
  name: PropTypes.string,
  character: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
export default CardList;
