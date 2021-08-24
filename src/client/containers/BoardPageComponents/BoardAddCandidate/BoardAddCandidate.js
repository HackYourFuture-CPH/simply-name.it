import React, { useState } from 'react';
import './BoardAddCandidate.style.css';
import Input from '../../../components/InputComponent/InputComponent';
import AddButton from '../../../components/AddButton/AddButton.component';
import AddCandidate from './AddCandidate';
import { useUser } from '../../../firebase/UserContext';
import { useBoard } from '../../BoardPage/BoardProvider';

export default function BoardAddCandidate() {
  const [newCandidateName, setNewCandidateName] = useState('');
  const { user } = useUser();
  const userId = user[0].id;
  const { boardInfo } = useBoard();
  const { setBoardLoading } = useBoard();
  const deadlineDate = new Date(boardInfo.deadline);
  const today = new Date();

  const newCandidate = {
    boardId: boardInfo.id,
    name: newCandidateName,
    isBlocked: false,
  };

  const saveCandidate = (e) => {
    e.preventDefault();
    AddCandidate(newCandidate, userId, newCandidate.boardId, setBoardLoading);
    setNewCandidateName('');
  };

  return (
    <div>
      {today > deadlineDate ? (
        <div className="Input-component">
          <Input
            type="text"
            placeholder="Add candidate..."
            theme="light"
            borderShape="curved"
          />
          <AddButton type="button" disabled={true} onClick={saveCandidate} />
        </div>
      ) : (
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
      )}
    </div>
  );
}
