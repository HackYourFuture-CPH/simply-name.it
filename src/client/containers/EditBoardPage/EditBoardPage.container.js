import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './EditBoardPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Input from '../../components/InputComponent/InputComponent';
import GenericButton from '../../components/GenericButton/GenericButton.component';

// const moment = require('moment-timezone');

const EditedBoard = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const history = useHistory();
  const userId = 2;
  const boardId = 1;
  const API_URL = `/api/users/${userId}/boards/${boardId}`;
  const onUpdateButtonClick = async () => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: name,
          deadline: date,
          banner: '',
        }),
      });
      alert('board updated');
    } catch (error) {
      throw new Error(error);
    }
    // (async () => {
    //   await fetch(API_URL, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       title: name,
    //       deadline:moment(date).format("YYYY-MM-DD HH:mm:ss"),
    //       banner:'',
    //     }),
    //   });
    // })();
    // console.log('added');
  };
  function backButton() {
    history.push('/home');
  }
  console.log(name);
  return (
    <div className="editedBoard ">
      <div className="arrow-button">
        <ArrowButton color="black" onClick={backButton} />
      </div>
      <div className="main-container">
        <PageTitle className="page-title" title="Edit board" />
        <label className="label">Name</label>
        <Input
          type="text"
          placeholder="Board Name"
          inputValue={name}
          theme="light"
          borderShape="round"
          onChange={(e) => {
            setName(e);
          }}
        />
        <label className="label">Date</label>
        <Input
          type="datetime-local"
          placeholder="Date/Time"
          borderShape="round"
          theme="light"
          minDate={new Date()}
          inputValue={date}
          onChange={(e) => {
            setDate(e);
          }}
        />
        <div className="browse">Browse</div>
        <div className="button-container">
          <GenericButton
            buttonLabel="Cancel"
            buttonSize="medium"
            buttonType="secondary"
            buttonDisabled={false}
            onClick={() => {
              setName('');
              setDate('');
            }}
          />
          <GenericButton
            buttonLabel="Update"
            buttonSize="medium"
            buttonType="primary"
            buttonDisabled={false}
            onClick={onUpdateButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default EditedBoard;
