import React from 'react';

import GrayCardList from './GrayCandidateCardList';

export default {
  title: 'Components / Gray Candidate Card List Component',
  component: GrayCardList,
};
export const GrayCardListExample = () => {
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

  return <GrayCardList candidateList={candidateList} />;
};
