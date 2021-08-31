import React, { useState } from 'react';
import './BoardAddCandidate.style.css';
import Input from '../../../../components/InputComponent/InputComponent';
import AddButton from '../../../../components/AddButton/AddButton.component';
import AddCandidate from './AddCandidate';
import { useUser } from '../../../../firebase/UserContext';
import { useBoard } from '../../BoardProvider';

export default function BoardAddCandidatePreDeadline() {
  const [newCandidateName, setNewCandidateName] = useState('');
  const { user } = useUser();
  const userId = user[0].id;
  const { boardInfo } = useBoard();
  const { setIsCandidateLoading } = useBoard();

  const newCandidate = {
    boardId: boardInfo.id,
    name: newCandidateName,
    isBlocked: false,
  };

  const saveCandidate = (e) => {
    e.preventDefault();
    AddCandidate(
      newCandidate,
      userId,
      newCandidate.boardId,
      setIsCandidateLoading,
    );
    setNewCandidateName('');
  };

  return (
    <div className="Input-component-dark">
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
  );
}
