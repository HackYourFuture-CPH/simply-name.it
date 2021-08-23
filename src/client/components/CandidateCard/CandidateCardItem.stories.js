import React, { useState } from 'react';
import { CardItemDecorator } from './CandidateCardItem.component';
import { candidateListArr } from './CandidateListArray.js';
import { candidateCardSorting } from './CandidateCardSorting';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../../containers/DragAndSortAdapter/DragAndSortAdapter';

import { onDragEnd } from '../../containers/DragAndSortAdapter/OnDragEnd';
import { action } from '@storybook/addon-actions';

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
          onClick={action('clicked')}
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
          onClick={action('clicked')}
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
          onClick={action('clicked')}
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
          onClick={action('clicked')}
        />
      ))}
    </>
  );
};

export const CardListExampleDraggable = () => {
  const [candidates, setCandidates] = useState(candidateListArr());

  return (
    <DragAndSortAdapter
      onDragEndHandler={onDragEnd(setCandidates, candidateCardSorting)}
      items={candidates}
    >
      {candidates.map((candidate) => {
        return (
          <SortableItem key={candidate.id} id={candidate.id}>
            <CardItemDecorator
              colorVariant="primary-color"
              candidateName={candidate.name}
              displayDeleteIcon="hidden"
              onClick={action('clicked')}
            />
          </SortableItem>
        );
      })}
    </DragAndSortAdapter>
  );
};

export const CardListExampleResult = () => {
  const candidateList = candidateListArr();
  return (
    <div className="result-candidate">
      {candidateList.map((item) => (
        <CardItemDecorator
          key={item.id}
          colorVariant="primary-color"
          candidateName={item.name}
          displayDeleteIcon="hidden"
          onClick={action('clicked')}
        />
      ))}
    </div>
  );
};
