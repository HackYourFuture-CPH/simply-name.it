import React, { useState } from 'react';
import { useCandidates } from '../../../UseHooks/useCandidates';
import { useUpdateBallots } from './useUpdateBallots';
import { CardItemDecorator } from '../../../../components/CandidateCard/CandidateCardItem.component';
import { candidateCardSorting } from '../../../../components/CandidateCard/CandidateCardSorting';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../../../DragAndSortAdapter/DragAndSortAdapter';
import { onDragEnd } from '../../../DragAndSortAdapter/OnDragEnd';
import PropTypes from 'prop-types';
import { deleteCandidate } from './deleteCandidate';
import { useBoard } from '../../BoardProvider';

export default function CandidateListPreDeadline({
  userId,
  boardId,
  displayDelete,
}) {
  const { candidates, setCandidates, error } = useCandidates(userId, boardId);
  const [draggedInit, setDraggedInit] = useState(false);
  const { setBoardLoading } = useBoard();

  function candidateTransform(candidate, index) {
    return {
      ...candidate,
      rank: index + 1,
    };
  }

  useUpdateBallots(userId, boardId, candidates, draggedInit);

  const handleDelete = async (candidateId) => {
    await deleteCandidate(userId, boardId, candidateId);
    setBoardLoading(true);
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
            setDraggedInit,
          )}
          items={candidates}
        >
          {candidates.map((candidate) => {
            return (
              <SortableItem key={candidate.id} id={candidate.id}>
                <CardItemDecorator
                  colorVariant="primary-color"
                  candidateName={candidate.name}
                  displayDeleteIcon={displayDelete}
                  onClick={() => handleDelete(candidate.id)}
                />
              </SortableItem>
            );
          })}
        </DragAndSortAdapter>
      )}
    </div>
  );
}

CandidateListPreDeadline.propTypes = {
  userId: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
  displayDelete: PropTypes.string,
};

CandidateListPreDeadline.defaultProps = {
  displayDelete: 'visible',
};
