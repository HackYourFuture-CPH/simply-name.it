import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import BoardImg from '../../assets/images/demo-boards-photos/Board1.jpg';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import AddButton from '../../components/AddButton/AddButton.component';
import Input from '../../components/InputComponent/InputComponent';
import { candidateListArr } from '../../components/CandidateCard/CandidateListArray';
import AddCandidate from './AddCandidate';
import { CardItemDecorator } from '../../components/CandidateCard/CandidateCardItem.component';
import { candidateCardSorting } from '../../components/CandidateCard/CandidateCardSorting';
import {
  DragAndSortAdapter,
  SortableItem,
} from '../DragAndSortAdapter/DragAndSortAdapter';
import { onDragEnd } from '../DragAndSortAdapter/OnDragEnd';

export default function OwnerBoardPage({ boardInfo }) {
  const [newCandidateName, setNewCandidateName] = useState('');
  const [addCandidateError, setAddCandidateError] = useState(null);
  const [addCandidateSuccess, setAddCandidateSuccess] = useState(false);
  const [candidates, setCandidates] = useState(candidateListArr());
  // const deadlineDate = new Date(boardInfo.deadline);
  const deadlineDate = new Date('2021-09-12');
  const today = new Date();
  const userId = 2;
  const onClick = () => {
    // console.log('you clicked!');
  };
  const newCandidate = {
    boardId: 1,
    name: newCandidateName,
    isBlocked: false,
  };

  return (
    <div className="Board-container">
      <div className="Header-component">
        <img src={BoardImg} alt="BoardImg" width="100%" />
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
          <div className="Input-component">
            <Input
              type="text"
              placeholder="Add candidate..."
              theme="light"
              borderShape="curved"
              inputValue={newCandidateName}
              onChange={setNewCandidateName}
            />
            <AddButton
              type="button"
              disabled={true}
              onClick={() => {
                AddCandidate(
                  newCandidate,
                  userId,
                  newCandidate.boardId,
                  setCandidates,
                  candidates,
                  setAddCandidateError,
                  setAddCandidateSuccess,
                );
                setNewCandidateName('');
              }}
            />
          </div>
          <div>
            {addCandidateError !== null && (
              <div className="errorMessageContainer">{addCandidateError}</div>
            )}
            {addCandidateError === null && addCandidateSuccess && (
              <div className="successMessageContainer">
                The new candidate was stored successfully!
              </div>
            )}
          </div>
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
      ) : (
        <div>
          <div className="Input-component">
            <Input
              type="text"
              placeholder="Add candidate..."
              theme="dark"
              borderShape="curved"
              inputValue={newCandidateName}
              onChange={setNewCandidateName}
            />
            <AddButton
              type="button"
              disabled={true}
              onClick={() => {
                AddCandidate(
                  newCandidate,
                  userId,
                  newCandidate.boardId,
                  setCandidates,
                  candidates,
                  setAddCandidateError,
                  setAddCandidateSuccess,
                );
                setNewCandidateName('');
              }}
            />
          </div>
          <div>
            {addCandidateError !== null && (
              <div className="errorMessageContainer">{addCandidateError}</div>
            )}
            {addCandidateError === null && addCandidateSuccess && (
              <div className="successMessageContainer">
                The new candidate was stored successfully!
              </div>
            )}
          </div>
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
              buttonDisabled={true}
              onClick={onClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}

OwnerBoardPage.PropsTypes = {
  boardInfo: PropTypes.object,
};
