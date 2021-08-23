import React from 'react';
import { useCandidates } from '../../UseHooks/useCandidates';
import { CardItemDecorator } from '../../../components/CandidateCard/CandidateCardItem.component';
import { SortableItem } from '../../DragAndSortAdapter/DragAndSortAdapter';
import PropTypes from 'prop-types';

export default function CandidateListPostDeadline({ userId, boardId }) {
  const { candidates, error } = useCandidates(userId, boardId);

  return (
    <div className="CandidateCard-component">
      {error ? (
        <h2 className="showups">{error}</h2>
      ) : (
        candidates.map((candidate) => {
          return (
            <SortableItem key={candidate.id} id={candidate.id}>
              <CardItemDecorator
                colorVariant="secondary-color"
                candidateName={candidate.name}
                displayDeleteIcon="visible"
              />
            </SortableItem>
          );
        })
      )}
    </div>
  );
}

CandidateListPostDeadline.propTypes = {
  userId: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
};
