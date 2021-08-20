import React, { useState } from 'react';
import './BoardAddCandidate.style.css';
import Input from '../../../components/InputComponent/InputComponent';
import AddButton from '../../../components/AddButton/AddButton.component';
import AddCandidate from './AddCandidate';
import { candidateListArr } from '../../../components/CandidateCard/CandidateListArray';

export default function BoardAddCandidate() {
  const [newCandidateName, setNewCandidateName] = useState('');
  const [addCandidateError, setAddCandidateError] = useState(null);
  const [addCandidateSuccess, setAddCandidateSuccess] = useState(false);
  const [saveState, setSaveState] = useState(false);
  const [candidates, setCandidates] = useState(candidateListArr());

  const userId = 2;
  const newCandidate = {
    boardId: 1,
    name: newCandidateName,
    isBlocked: false,
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

  return (
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
          className="add-button"
          type="button"
          disabled={false}
          onClick={saveCandidate}
        />
      </div>
      {saveState && (
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
      )}
    </div>
  );
}
