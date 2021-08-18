import React, { useState } from 'react';
import './BoardPage.style.css';
import PropTypes from 'prop-types';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import HeaderComponent from '../../components/HeaderComponent/Header.component.js';
import Dropdown from '../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import { candidateListArr } from '../../components/CandidateCard/CandidateListArray';
import { CardItemDecorator } from '../../components/CandidateCard/CandidateCardItem.component';
import { candidateCardSorting } from '../../components/CandidateCard/CandidateCardSorting';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../DragAndSortAdapter/DragAndSortAdapter';
import { onDragEnd } from '../DragAndSortAdapter/OnDragEnd';

export default function MemberBoardPage({ boardInfo }) {
  const [candidates, setCandidates] = useState(candidateListArr());
  const deadlineDate = new Date(boardInfo.deadline);
  const [visibility, setVisibility] = useState(false);
  // const deadlineDate = new Date('2021-09-12');
  const today = new Date();
  const closeDropdown = () => {
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };
  const onClick = () => {
    // console.log('you clicked!');
  };

  return (
    <div className="Board-container">
      <div className="Header-component">
        <HeaderComponent>
          <ArrowButton onClick={onClick} />
          <Dropdown variant="dark" visible={visibility} onClick={closeDropdown}>
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          </Dropdown>
        </HeaderComponent>
      </div>
      <div className="title">
        <PageTitle title={boardInfo.title} />
        <GenericButton
          className="generic-button"
          buttonSize="small"
          buttonType="secondary"
          buttonDisabled={false}
          onClick={onClick}
          buttonLabel="Members"
        />
      </div>
      {today > deadlineDate ? (
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
                      colorVariant="secondary-color"
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
              buttonDisabled={false}
              onClick={onClick}
            />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

MemberBoardPage.PropsTypes = {
  boardInfo: PropTypes.object,
};
