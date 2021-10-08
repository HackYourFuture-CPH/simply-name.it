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
import { ApiError } from '../../../../ErrorBoundary';
import { useUser } from '../../../../firebase/UserContext';

export default function CandidateListPreDeadline({ displayDelete }) {
  const { user } = useUser();
  const userId = user[0].id;
  const { boardInfo } = useBoard();
  const boardId = boardInfo.id;
  const { candidates, setCandidates } = useCandidates();
  const [draggedInit, setDraggedInit] = useState(false);
  const { setIsCandidateLoading } = useBoard();
  // eslint-disable-next-line no-unused-vars
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
      await deleteCandidate(userId, boardId, candidateId);
      setIsCandidateLoading(true);
    } catch (err) {
      setDeleteError(() => {
        throw new ApiError(err.message, err.statusCode);
      });
    }
  };

  return (
    <div className="candidate-card-component">
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
    </div>
  );
}

CandidateListPreDeadline.propTypes = {
  displayDelete: PropTypes.string,
};

CandidateListPreDeadline.defaultProps = {
  displayDelete: 'visible',
};
