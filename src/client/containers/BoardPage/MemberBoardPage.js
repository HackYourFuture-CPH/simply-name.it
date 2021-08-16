import React, { useState } from 'react';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import BoardImg from '../../assets/images/demo-boards-photos/Board1.jpg';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import { candidateListArr } from '../../components/CandidateCard/CandidateListArray';
import { CardItemDecorator } from '../../components/CandidateCard/CandidateCardItem.component';
import { candidateCardSorting } from '../../components/CandidateCard/CandidateCardSorting';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../DragAndSortAdapter/DragAndSortAdapter';
import { onDragEnd } from '../DragAndSortAdapter/OnDragEnd';

export default function OwnerBoardPage() {
  const [candidates, setCandidates] = useState(candidateListArr());
  const deadlineDate = new Date('2021-09-12');
  const today = new Date();

  const onClick = () => {
    // console.log('you clicked!');
  };

  return (
    <div className="Board-container">
      <div className="Header-component">
        <img src={BoardImg} alt="BoardImg" width="100%" />
      </div>
      <div className="title">
        <PageTitle title="Baby name" />
        <GenericButton
          className="generic-button"
          buttonSize="small"
          buttonType="secondary"
          buttonDisabled={false}
          onClick={onClick}
          buttonLabel="Members"
        />
      </div>
      {today > deadlineDate && (
        <div>
          <div className="CandidateCard-component">
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
                      displayDeleteIcon="visible"
                    />
                  </SortableItem>
                );
              })}
            </DragAndSortAdapter>
          </div>
          <div className="Result">
            <GenericButton
              className="Result-button"
              buttonLabel="Result"
              buttonSize="medium"
              buttonType="primary"
              buttonDisabled={false}
              onClick={onClick}
            />
          </div>
        </div>
      )}
      <div className="CandidateCard-component">
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
                />
              </SortableItem>
            );
          })}
        </DragAndSortAdapter>
      </div>
      <div className="Result">
        <GenericButton
          className="Result-button"
          buttonLabel="Result"
          buttonSize="medium"
          buttonType="primary"
          buttonDisabled={true}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
