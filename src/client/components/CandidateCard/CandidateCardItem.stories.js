import React, { useState } from 'react';
import { CardItemDecorator } from './CandidateCardItem.component';
import { candidateListArr } from './CandidateListArray.js';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../../containers/DragAndSortAdapter/DragAndSortAdapter';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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
          variant="primary-color"
          candidateName={item.name}
          display="visible"
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
          variant="secondary-color"
          candidateName=""
          display="hidden"
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
          variant="secondary-color"
          candidateName={item.name}
          display="hidden"
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
          variant="primary-color"
          candidateName={item.name}
          display="hidden"
        />
      ))}
    </>
  );
};

export const CardListExampleDraggable = () => {
  const candidateList = candidateListArr();

  const [items, setItems] = useState(candidateList);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((draggedItems) => {
        const oldIndex = draggedItems.findIndex((x) => x.id === active.id);
        const newIndex = draggedItems.findIndex((x) => x.id === over.id);

        return arrayMove(draggedItems, oldIndex, newIndex);
      });
    }
  }

  return (
    <DragAndSortAdapter handleDragEnd={handleDragEnd} items={items}>
      {items.map((item) => {
        return (
          <SortableItem key={item.id} id={item.id}>
            <CardItemDecorator
              variant="primary-color"
              candidateName={item.name}
              display="hidden"
            />
          </SortableItem>
        );
      })}
    </DragAndSortAdapter>
  );
};
