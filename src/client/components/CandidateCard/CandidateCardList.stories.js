import React from 'react';
import CardList from './CandidateCardList.component';
import { candidateListArr } from './CandidateListArray.js';

export default {
  title: 'Components / Candidate Card List Component',
  component: CardList,
};
export const CardListExample = () => {
  const candidateList = candidateListArr();

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
  const candidateList = candidateListArr();
  return <CardList variant="secondary" candidateList={candidateList} />;
};
export const CardListExampleMemberGray = () => {
  const candidateList = candidateListArr();
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
  const candidateList = candidateListArr();
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
