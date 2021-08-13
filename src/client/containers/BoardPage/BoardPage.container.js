import React, { useState } from 'react';
import './BoardPage.style.css';
import Input from '../../components/InputComponent/InputComponent';
import CardList from '../../components/CandidateCard/CandidateCardList.component';
import { candidateListArr } from '../../components/CandidateCard/CandidateListArray';
import AddCandidate from './AddCandidate';

export default function Board() {
  const candidateArray = candidateListArr();
  const [newCandidateName, setNewCandidateName] = useState('');
  const [candidateList, setcandidateList] = useState(candidateArray);
  const [addCandidateError, setAddCandidateError] = useState(null);
  const [addCandidateSuccess, setAddCandidateSuccess] = useState(false);

  console.log(newCandidateName);
  console.log(typeof newCandidateName);
  console.log(candidateList);
  const userId = 2;

  const newCandidate = {
    boardId: 1,
    name: newCandidateName,
    isBlocked: false,
  };

  return (
    <div className="Board-container">
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
              setcandidateList,
              candidateList,
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
          candidateList={candidateList}
          display="visible"
        />
      </div>
    </div>
  );
}
