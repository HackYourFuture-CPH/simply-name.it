import React from 'react';
import { useCandidates } from '../../../UseHooks/useCandidates';
import { CardItemDecorator } from '../../../../components/CandidateCard/CandidateCardItem.component';
import { SortableItem } from '../../../DragAndSortAdapter/DragAndSortAdapter';
import PropTypes from 'prop-types';

export default function CandidateListPostDeadline({ displayDelete }) {
  const { candidates } = useCandidates();

  return candidates.map((candidate) => {
    return (
      <div className="CandidateCard-component">
        <SortableItem key={candidate.id} id={candidate.id}>
          <CardItemDecorator
            colorVariant="secondary-color"
            candidateName={candidate.name}
            displayDeleteIcon={displayDelete}
          />
        </SortableItem>
      </div>
    );
  });
}

CandidateListPostDeadline.propTypes = {
  displayDelete: PropTypes.string,
};

CandidateListPostDeadline.defaultProps = {
  displayDelete: 'visible',
};
