import React, { useState } from 'react';
import './BoardPage.style.css';
import BoardImg from '../../assets/images/demo-boards-photos/Board1.jpg';
import Input from '../../components/InputComponent/InputComponent';
import AddCandidate from './AddCandidate';

export default function Board() {
  const [newCandidateName, setNewCandidateName] = useState('');
  console.log(newCandidateName);

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
      <div className="Input-component">
        <Input
          type="text"
          placeholder="Add candidate..."
          theme="dark"
          borderShape="curved"
          inputValue={newCandidateName}
          onChange={setNewCandidateName}
        />
        <div>
          <button
            type="button"
            onClick={AddCandidate(newCandidate, setNewCandidateName)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
