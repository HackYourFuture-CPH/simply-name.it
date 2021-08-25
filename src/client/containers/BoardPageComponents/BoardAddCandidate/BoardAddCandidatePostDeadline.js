import React from 'react';
import './BoardAddCandidate.style.css';
import Input from '../../../components/InputComponent/InputComponent';
import AddButton from '../../../components/AddButton/AddButton.component';

export default function BoardAddCandidatePostDeadline() {
  return (
    <div className="Input-component">
      <Input
        type="text"
        placeholder="Add candidate..."
        theme="light"
        borderShape="curved"
      />
      <AddButton type="button" disabled={true} />
    </div>
  );
}
