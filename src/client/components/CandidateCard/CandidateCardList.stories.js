import React from 'react';

import CardList from './CandidateCardList';

export default {
  name: 'Eric',
  title: 'Components / Candidate Card List Component',
  component: CardList,
};
export const CardListExample = () => {
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

  return <CardList candidateList={candidateList} />;
};
