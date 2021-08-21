import React, { useState, useEffect } from 'react';
import { useCandidates } from '../UseHooks/useCandidates';
import { updateBallots } from './updateBallots';
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

  useEffect(() => {
    updateBallots(userId, boardId, updatedCandidates);
  }, [updatedCandidates]);

  const onClick = () => {
    console.log('clicked');
  };

  return (
    <div className="CandidateCard-component">
      {error ? (
        <h2 className="showups">{error}</h2>
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
