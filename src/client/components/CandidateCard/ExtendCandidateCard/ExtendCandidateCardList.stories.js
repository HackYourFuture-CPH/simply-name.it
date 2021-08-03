import React from 'react';

import ExtendCardList from './ExtendCandidateCardList';

export default {
  title: 'Components / Extended Candidate Card List Component',
  component: ExtendCardList,
};
export const ExtendCardListExample = () => {
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

  return <ExtendCardList candidateList={candidateList} />;
};
