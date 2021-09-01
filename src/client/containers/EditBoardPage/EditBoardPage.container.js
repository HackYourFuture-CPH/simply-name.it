import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUser } from '../../firebase/UserContext';
import './EditBoardPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Inputfield from '../../components/InputComponent/InputComponent';
import Dropzone from '../DropZone/Dropzone.container';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import { ApiError } from '../../ErrorBoundary';

const EditedBoard = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [sucess, setSucess] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const { boardId } = useParams();
  const history = useHistory();
  const { user } = useUser();
  const userId = user[0].id;
  const API_URL = `/api/users/${userId}/boards/${boardId}`;
  useEffect(() => {
    const getBoardInfo = async () => {
      try {
        const apiResponse = await fetch(API_URL);
        if (!apiResponse.ok) {
          throw new ApiError(apiResponse.statusText, apiResponse.status);
        }
        const apiData = await apiResponse.json();
        setName(apiData[0].title);
        setDate(apiData[0].deadline.replace(/\..+/, ''));
        setLoading(false);
      } catch (e) {
        setError(() => {
          // eslint-disable-next-line new-cap
          throw new ApiError(e.message, e.statusCode);
        });
        setLoading(false);
      }
    };
    getBoardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      if (response.ok) {
        setSucess(true);
      } else {
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
    history.goBack();
  }
  return (
    <div className="edit-Board ">
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <div>
          <div className="arrow-button">
            <ArrowButton color="black" onClick={backButton} />
          </div>
          <div className="main-container">
            <PageTitle className="page-title" title="Edit board" />
            <label className="label">Name</label>
            <Inputfield
              type="text"
              placeholder={name}
              inputValue={name}
              theme="light"
              borderShape="round"
              onChange={(e) => {
                setName(e);
              }}
            />
            <label className="label">Date</label>
            <Inputfield
              type="datetime-local"
              borderShape="round"
              theme="light"
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
      )}
      {sucess && <p className="update-message">Board updated</p>}
    </div>
  );
};

export default EditedBoard;
