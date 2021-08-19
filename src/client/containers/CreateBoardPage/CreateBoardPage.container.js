import React, { useState } from 'react';
import './CreateBoardPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import InputComponent from '../../components/InputComponent/InputComponent';
import GenericButton from '../../components/GenericButton/GenericButton.component';

export default function CreateBoard() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="result-container">
      <ArrowButton onClick={() => console.log('clicked')} color="black" />
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
      <input
        type="datetime-local"
        id="meeting-time"
        name="meeting-time"
        value="2018-06-12T19:30"
        min="2018-06-07T00:00"
        max="2018-06-14T00:00"
      />
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
        onClick={() => console.log('clicked')}
      />
      <GenericButton
        buttonLabel="Create"
        buttonSize="medium"
        buttonType="primary"
        buttonDisabled={false}
        onClick={() => console.log('clicked')}
      />
    </div>
  );
}
