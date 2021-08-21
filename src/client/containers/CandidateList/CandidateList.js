import React, { useState } from 'react';
import { useCandidates } from '../UseHooks/useCandidates';
import { useUpdateBallots } from '../UseHooks/useUpdateBallots';
import { CardItemDecorator } from '../../components/CandidateCard/CandidateCardItem.component';
import { candidateCardSorting } from '../../components/CandidateCard/CandidateCardSorting';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../DragAndSortAdapter/DragAndSortAdapter';
import { onDragEnd } from '../DragAndSortAdapter/OnDragEnd';
import PropTypes from 'prop-types';

export default function CandidateList({ userId, boardId }) {
  const { candidates, error } = useCandidates(userId, boardId);
  const [updatedCandidates, setUpdatedCandidates] = useState(candidates);
  const { error: updateError } = useUpdateBallots(
    userId,
    boardId,
    updatedCandidates,
  );

  const onClick = () => {
    console.log('clicked');
  };

  return (
    <div className="CandidateCard-component">
      {error && updateError ? (
        <h2 className="showups">{error || updateError}</h2>
      ) : (
        <DragAndSortAdapter
          onDragEndHandler={onDragEnd(
            setUpdatedCandidates,
            candidateCardSorting,
          )}
          items={updatedCandidates}
        >
          {updatedCandidates.map((candidate) => {
            return (
              <SortableItem
                key={candidate.candidateId}
                id={candidate.candidateId}
              >
                <CardItemDecorator
                  colorVariant="primary-color"
                  candidateName={candidate.name}
                  displayDeleteIcon="visible"
                  onClick={onClick}
                />
              </SortableItem>
            );
          })}
        </DragAndSortAdapter>
      )}
    </div>
  );
}

CandidateList.propTypes = {
  userId: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
};
