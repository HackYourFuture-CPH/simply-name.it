import React, { useState } from 'react';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import BoardImg from '../../assets/images/demo-boards-photos/Board1.jpg';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Input from '../../components/InputComponent/InputComponent';
import CardList from '../../components/CandidateCard/CandidateCardList.component';
import { candidateListArr } from '../../components/CandidateCard/CandidateListArray';
import AddCandidate from './AddCandidate';

export default function Board() {
  const candidateList = candidateListArr();
  const [newCandidateName, setNewCandidateName] = useState('');
  const [candidateCardList, setcandidateCardList] = useState(candidateList);
  const [addCandidateError, setAddCandidateError] = useState(null);
  const [addCandidateSuccess, setAddCandidateSuccess] = useState(false);

  const userRole = 'owner';
  const deadlineDate = new Date('2021-08-27');
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

  if (userRole === 'owner' && today > deadlineDate) {
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
        <div className="Input-component">
          <Input
            type="text"
            placeholder="Add candidate..."
            theme="light"
            borderShape="curved"
            inputValue={newCandidateName}
            onChange={setNewCandidateName}
          />
          <button
            type="button"
            onClick={() => {
              AddCandidate(
                newCandidate,
                userId,
                newCandidate.boardId,
                setcandidateCardList,
                candidateCardList,
                setAddCandidateError,
                setAddCandidateSuccess,
              );
              setNewCandidateName('');
            }}
          >
            Add
          </button>
        </div>
        <div>
          {addCandidateError !== null && (
            <div className="errorMessageContainer">
              {addCandidateError}
              <br />
            </div>
          )}
          {addCandidateError === null && addCandidateSuccess && (
            <div className="successMessageContainer">
              The new candidate was stored successfully!
              <br />
            </div>
          )}
        </div>
        <div className="CandidateCard-component">
          <CardList
            variant="secondary-color"
            candidateList={candidateCardList}
            display="visible"
          />
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
    );
  }
  if (userRole === 'member' && today > deadlineDate) {
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
        <div className="CandidateCard-component">
          <CardList
            variant="secondary-color"
            candidateList={candidateList}
            display="hidden"
          />
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
    );
  }
  if (userRole === 'owner') {
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
        <div className="Input-component">
          <Input
            type="text"
            placeholder="Add candidate..."
            theme="dark"
            borderShape="curved"
            inputValue={newCandidateName}
            onChange={setNewCandidateName}
          />
          <button
            type="button"
            onClick={() => {
              AddCandidate(
                newCandidate,
                userId,
                newCandidate.boardId,
                setcandidateCardList,
                candidateCardList,
                setAddCandidateError,
                setAddCandidateSuccess,
              );
              setNewCandidateName('');
            }}
          >
            Add
          </button>
        </div>
        <div>
          {addCandidateError !== null && (
            <div className="errorMessageContainer">
              {addCandidateError}
              <br />
            </div>
          )}
          {addCandidateError === null && addCandidateSuccess && (
            <div className="successMessageContainer">
              The new candidate was stored successfully!
              <br />
            </div>
          )}
        </div>
        <div className="CandidateCard-component">
          <CardList
            variant="primary-color"
            candidateList={candidateCardList}
            display="visible"
          />
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
  if (userRole === 'member') {
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
        <div className="CandidateCard-component">
          <CardList
            variant="primary-color"
            candidateList={candidateList}
            display="hidden"
          />
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
}
