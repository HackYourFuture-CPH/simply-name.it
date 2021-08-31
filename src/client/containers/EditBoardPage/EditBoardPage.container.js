import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUser } from '../../firebase/UserContext';
import './EditBoardPage.styles.css';
import PropTypes from 'prop-types';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Input from '../../components/InputComponent/InputComponent';
import Dropzone from '../DropZone/Dropzone.container';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import { ApiError } from '../../ErrorBoundary';

const EditedBoard = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [boardInfo, setBoardInfo] = useState('');
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // const { boardId } = useParams();;
  // const history = useHistory();
  // const { user } = useUser();
  // const userId = user[0].id;
  const userId = 2;
  const boardId = 1;
  const boardInfoURL = `/api/users/${userId}/boards/${boardId}`;
  useEffect(() => {
    const getBoardInfo = async () => {
      try {
        const apiResponse = await fetch(boardInfoURL);
        const apiData = await apiResponse.json();
        setBoardInfo(apiData[0]);
        setName(apiData[0].title);
        setDate(apiData[0].deadline);
        console.log(apiData[0].deadline);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    getBoardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(boardInfo.title);
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
    history.goBack();
  }
  return (
    <div className="editedBoard ">
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
            <Input
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
            <Input
              type="datetime-local"
              placeholder={date}
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
    </div>
  );
};

EditedBoard.propTypes = {
  boardInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deadline: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default EditedBoard;
