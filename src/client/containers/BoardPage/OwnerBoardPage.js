import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
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
import HeaderComponent from '../../components/HeaderComponent/Header.component.js';
import Dropdown from '../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import { Link } from 'react-router-dom';
import MembersModal from '../../components/ModalViewComponent/MembersModal.component';
import members from '../../components/ModalViewComponent/membersData.json';

export default function OwnerBoardPage({ boardInfo }) {
  const [newCandidateName, setNewCandidateName] = useState('');
  const [addCandidateError, setAddCandidateError] = useState(null);
  const [addCandidateSuccess, setAddCandidateSuccess] = useState(false);
  const [candidates, setCandidates] = useState(candidateListArr());
  const [visibility, setVisibility] = useState(false);
  const [saveState, setSaveState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  // const deadlineDate = new Date(boardInfo.deadline);
  const deadlineDate = new Date('2021-09-12');
  const today = new Date();
  const userId = 2;
  const onClick = () => {
    // console.log('clicked');
  };
  const saveCandidate = (e) => {
    setSaveState(true);
    e.preventDefault();
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
    const timerId = setTimeout(async () => {
      setSaveState(false);
    }, 2000);
    return () => clearTimeout(timerId);
  };
  const closeDropdown = () => {
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };
  const newCandidate = {
    boardId: 1,
    name: newCandidateName,
    isBlocked: false,
  };
  return (
    <div className="ModalView">
      {showModal && (
        <div
          onClick={closeModal}
          onKeyDown={closeModal}
          className="back-drop"
          aria-hidden="true"
        />
      )}
      <div className="Board-container">
        <div className="Header-component">
          <HeaderComponent>
            <Link to="/profile">
              <ArrowButton className="arrow-button-white" onClick={onClick} />
            </Link>
            <Dropdown
              className="dropdown-button"
              variant="dark"
              visible={visibility}
              onClick={closeDropdown}
            >
              <div className="options-container dark">
                <ul className="option-list">
                  <li>Edit Board</li>
                  <li>Delete Board</li>
                </ul>
              </div>
            </Dropdown>
          </HeaderComponent>
        </div>
        <MembersModal show={showModal} close={closeModal} members={members} />
        <div className="title">
          <PageTitle title={boardInfo.title} />
          <GenericButton
            className="generic-button"
            buttonSize="small"
            buttonType="secondary"
            buttonDisabled={false}
            onClick={() => setShowModal(true)}
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
                onClick={saveCandidate}
              />
            </div>
            {saveState && (
              <div>
                {addCandidateError !== null && (
                  <div className="errorMessageContainer">
                    {addCandidateError}
                  </div>
                )}
                {addCandidateError === null && addCandidateSuccess && (
                  <div className="successMessageContainer">
                    The new candidate was stored successfully!
                  </div>
                )}
              </div>
            )}
            <div className="CandidateCard-component">
              <DragAndSortAdapter
                onDragEndHandler={onDragEnd(
                  setCandidates,
                  candidateCardSorting,
                )}
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
                disabled={false}
                onClick={saveCandidate}
              />
            </div>
            {saveState && (
              <div>
                {addCandidateError !== null && (
                  <div className="errorMessageContainer">
                    {addCandidateError}
                  </div>
                )}
                {addCandidateError === null && addCandidateSuccess && (
                  <div className="successMessageContainer">
                    The new candidate was stored successfully!
                  </div>
                )}
              </div>
            )}
            <div className="CandidateCard-component">
              <DragAndSortAdapter
                onDragEndHandler={onDragEnd(
                  setCandidates,
                  candidateCardSorting,
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
    </div>
  );
}
OwnerBoardPage.PropsTypes = {
  boardInfo: PropTypes.object,
};
