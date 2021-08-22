import React, { useState } from 'react';
import './CreateBoardPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import InputComponent from '../../components/InputComponent/InputComponent';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import { useHistory } from 'react-router-dom';

export default function CreateBoard() {
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');

  const onArrowButtonClick = () => {
    const path = '/profile-page';
    history.push(path);
  };

  const onResetButtonClick = () => {
    setInputValue('');
  };

  const onCreateButtonClick = () => {
    console.log('clicked');
  };

  return (
    <div className="result-container">
      <ArrowButton onClick={onArrowButtonClick} color="black" />
      <PageTitle title="New board" variant="black-large" />
      <label>Name</label>
      <div className="input-name-container">
        <InputComponent
          placeholder="Board Name"
          borderShape="round"
          theme="light"
          inputValue={inputValue}
          onChange={(e) => {
            setInputValue(e);
          }}
        />
      </div>
      <label>Deadline</label>
      <div className="input-name-container">
        <InputComponent
          type="datetime-local"
          placeholder="Date/Time"
          borderShape="round"
          theme="light"
          inputValue={inputValue}
          onChange={(e) => {
            setInputValue(e);
          }}
        />
      </div>
      <div>Dropzone component</div>
      <GenericButton
        buttonLabel="Add members"
        buttonSize="large"
        buttonType="primary"
        buttonDisabled={false}
        onClick={() => console.log('clicked')}
      />
      <br />
      <GenericButton
        buttonLabel="Reset"
        buttonSize="medium"
        buttonType="secondary"
        buttonDisabled={false}
        onClick={onResetButtonClick}
      />
      <GenericButton
        buttonLabel="Create"
        buttonSize="medium"
        buttonType="primary"
        buttonDisabled={false}
        onClick={onCreateButtonClick}
      />
    </div>
  );
}
