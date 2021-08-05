import React from 'react';
import CardList from './CandidateCardList.component';

export default {
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

  return (
    <div>
      <CardList
        variant="primary"
        candidateList={candidateList}
        display="visible"
      />
    </div>
  );
};
export const CardListExampleGray = () => {
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

  return <CardList variant="secondary" candidateList={candidateList} />;
};
export const CardListExampleMemberGray = () => {
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

  return (
    <div>
      <CardList
        variant="secondary"
        candidateList={candidateList}
        display="hidden"
      />
    </div>
  );
};
export const CardListExampleMember = () => {
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

  return (
    <div>
      <CardList
        variant="primary"
        candidateList={candidateList}
        display="hidden"
      />
    </div>
  );
};
