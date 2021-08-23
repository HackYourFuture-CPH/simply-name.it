import React, { useEffect } from 'react';
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
  const { candidates, setCandidates, error } = useCandidates(userId, boardId);

  function candidateTransform(candidate, index) {
    return {
      ...candidate,
      rank: index + 1,
    };
  }

  useEffect(() => {
    const firstCandidates = candidates;
    if (firstCandidates !== candidates) {
      updateBallots(userId, boardId, candidates);
    }
  }, [userId, boardId, candidates]);

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
            setCandidates,
            candidateCardSorting,
            candidateTransform,
          )}
          items={candidates}
        >
          {candidates.map((candidate) => {
            return (
              <SortableItem key={candidate.id} id={candidate.id}>
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