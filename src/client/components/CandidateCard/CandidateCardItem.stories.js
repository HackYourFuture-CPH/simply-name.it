import React, { useState } from 'react';
import { CardItemDecorator } from './CandidateCardItem.component';
import { candidateListArr } from './CandidateListArray.js';
import { CandidateCardDragEndHandler } from './CandidateCardDragEndHandler';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../../containers/DragAndSortAdapter/DragAndSortAdapter';

export default {
  title: 'Components / Candidate Card List Component',
  component: CardItemDecorator,
};
export const CardListExample = () => {
  const candidateList = candidateListArr();

  return (
    <>
      {candidateList.map((item) => (
        <CardItemDecorator
          key={item.id}
          colorVariant="primary-color"
          candidateName={item.name}
          displayDeleteIcon="visible"
        />
      ))}
    </>
  );
};
export const CardListExampleGray = () => {
  const candidateList = candidateListArr();
  return (
    <>
      {candidateList.map((item) => (
        <CardItemDecorator
          key={item.id}
          colorVariant="secondary-color"
          candidateName=""
          displayDeleteIcon="hidden"
        />
      ))}
    </>
  );
};
export const CardListExampleMemberGray = () => {
  const candidateList = candidateListArr();
  return (
    <>
      {candidateList.map((item) => (
        <CardItemDecorator
          key={item.id}
          colorVariant="secondary-color"
          candidateName={item.name}
          displayDeleteIcon="hidden"
        />
      ))}
    </>
  );
};

export const CardListExampleMember = () => {
  const candidateList = candidateListArr();
  return (
    <>
      {candidateList.map((item) => (
        <CardItemDecorator
          key={item.id}
          colorVariant="primary-color"
          candidateName={item.name}
          displayDeleteIcon="hidden"
        />
      ))}
    </>
  );
};

export const CardListExampleDraggable = () => {
  const [candidates, setCandidates] = useState(candidateListArr());

  return (
    <DragAndSortAdapter
      onDragEndHandler={CandidateCardDragEndHandler(setCandidates)}
      items={candidates}
    >
      {candidates.map((candidate) => {
        return (
          <SortableItem key={candidate.id} id={candidate.id}>
            <CardItemDecorator
              colorVariant="primary-color"
              candidateName={candidate.name}
              displayDeleteIcon="hidden"
            />
          </SortableItem>
        );
      })}
    </DragAndSortAdapter>
  );
};
