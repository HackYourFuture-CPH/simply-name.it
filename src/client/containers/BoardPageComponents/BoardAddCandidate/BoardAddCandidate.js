import React, { useState } from 'react';
import './BoardAddCandidate.style.css';
import Input from '../../../components/InputComponent/InputComponent';
import AddButton from '../../../components/AddButton/AddButton.component';
import AddCandidate from './AddCandidate';
import { useUser } from '../../firebase/UserContext';

export default function BoardAddCandidate() {
  const [newCandidateName, setNewCandidateName] = useState('');
  const { user } = useUser();
  const userId = user[0].id;

  const newCandidate = {
    boardId: 1,
    name: newCandidateName,
    isBlocked: false,
  };

  const saveCandidate = (e) => {
    e.preventDefault();
    AddCandidate(newCandidate, userId, newCandidate.boardId);
    setNewCandidateName('');
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
    </div>
  );
}
