import React, { useState } from 'react';
import { useCandidates } from '../../UseHooks/useCandidates';
import { useUpdateBallots } from './useUpdateBallots';
import { CardItemDecorator } from '../../../components/CandidateCard/CandidateCardItem.component';
import { candidateCardSorting } from '../../../components/CandidateCard/CandidateCardSorting';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../../DragAndSortAdapter/DragAndSortAdapter';
import { onDragEnd } from '../../DragAndSortAdapter/OnDragEnd';
import PropTypes from 'prop-types';
import { deleteCandidate } from './deleteCandidate';
import { useBoard } from '../../BoardPage/BoardProvider';
import { ApiError } from '../../../ErrorBoundary';

export default function CandidateListPreDeadline({
  userId,
  boardId,
  displayDelete,
}) {
  const { candidates, setCandidates } = useCandidates(userId, boardId);
  const [draggedInit, setDraggedInit] = useState(false);
  const { setBoardLoading } = useBoard();
  const [deleteError, setDeleteError] = useState(null);

  function candidateTransform(candidate, index) {
    return {
      ...candidate,
      rank: index + 1,
    };
  }

  useUpdateBallots(userId, boardId, candidates, draggedInit);

  const handleDelete = async (candidateId) => {
    try {
      const response = await deleteCandidate(userId, boardId, candidateId);
      if (!response.ok) {
        throw new ApiError(response.statusText, response.status);
      }
    } catch (err) {
      setDeleteError(() => {
        throw new ApiError(err.message, err.statusCode);
      });
    }
    setBoardLoading(true);
  };

  return (
    <div className="CandidateCard-component">
      {deleteError ? (
        <h2 className="showups">{deleteError}</h2>
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
