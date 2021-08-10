import React, { useState } from 'react';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import BoardImg from '../../assets/images/demo-boards-photos/Board1.jpg';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Input from '../../components/InputComponent/InputComponent';
import CardList from '../../components/CandidateCard/CandidateCardList.component';
import { candidateListArr } from '../../components/CandidateCard/CandidateListArray';
import AddButton from '../../components/AddButton/AddButton.component';
import AddCandidate from './AddCandidate';
// import { useParams } from "react-router-dom";

export default function Board() {
  const [newCandidateName, setNewCandidateName] = useState('');

  const newCandidate = {
    // boardId,
    name: newCandidateName,
    isBlocked: false,
  };

  const onClick = () => {
    // console.log('you clicked!');
  };

  const candidateList = candidateListArr();
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
          onChange={(e) => setNewCandidateName(e.target.value)}
        />
        <AddButton
          onClick={AddCandidate({ newCandidate, setNewCandidateName })}
        />
      </div>
      <div className="CandidateCard-component">
        <CardList
          variant="primary-color"
          candidateList={candidateList}
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
