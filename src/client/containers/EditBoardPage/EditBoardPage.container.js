import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUser } from '../../firebase/UserContext';
import './EditBoardPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Input from '../../components/InputComponent/InputComponent';
import Dropzone from '../DropZone/Dropzone.container';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import { ApiError } from '../../ErrorBoundary';

const EditedBoard = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const history = useHistory();
  const { user } = useUser();
  const userId = user[0].id;
  const { boardId } = useParams();
  const API_URL = `/api/users/${userId}/boards/${boardId}`;
  const updateBoard = async () => {
    try {
      const response = await fetch(API_URL, {
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
      if (!response.ok) {
        throw new ApiError(response.statusText, response.status);
      }
    } catch (err) {
      setError(() => {
        // eslint-disable-next-line new-cap
        throw new ApiError(err.message, err.statusCode);
      });
    }
  };
  function backButton() {
    history.push('/profile');
  }
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
        <div className="browse ">
          <Dropzone />
        </div>
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
            onClick={updateBoard}
          />
        </div>
      </div>
    </div>
  );
};

export default EditedBoard;
