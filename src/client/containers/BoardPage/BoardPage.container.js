import React from 'react';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import BoardImg from '../../assets/images/demo-boards-photos/Board1.jpg';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Input from '../../components/InputComponent/InputComponent';
import CardList from '../../components/CandidateCard/CandidateCardList.component';
import { candidateListArr } from '../../components/CandidateCard/CandidateListArray';

export default function Board() {
  const userRole = 'owner';
  const deadlineDate = new Date('2021-08-27');
  const today = new Date();

  const onClick = () => {
    // console.log('you clicked!');
  };
  const onChange = () => {
    // console.log('you clicked!');
  };
  const candidateList = candidateListArr();

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
            onChange={onChange}
          />
        </div>
        <div className="CandidateCard-component">
          <CardList
            variant="secondary-color"
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
            onChange={onChange}
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
