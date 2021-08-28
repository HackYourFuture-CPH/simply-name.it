import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DeleteBoardModal.style.css';
import CloseButton from '../../components/CloseButton/CloseButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../statcomponents/GenericButton/GenericButton.component';
import { ApiError } from '../../ErrorBoundary';

const DeleteBoardModal = ({ boardInfo, setModalVisibility, userId }) => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const boardId = boardInfo.id;

  const deleteBoard = async () => {
    const API_URL = `/api/users/${userId}/boards/${boardId}`;
    try {
      const response = await fetch(API_URL, { method: 'DELETE' });
      // eslint-disable-next-line no-alert
      if (!response.ok) {
        throw new Error(response.status);
      }
      alert('Data deleted');
    } catch {
      setError(() => {
        // eslint-disable-next-line new-cap
        throw new ApiError();
      });
    }
  };
  return (
    <div className="delete-board-container">
      <div className="greyLine" />
      <div className="delete-board-close-btn-div">
        <CloseButton onClick={() => setModalVisibility(false)} />
      </div>
      <div className="delete-board-info-box">
        <div className="circle-exclamation">
          <p>!</p>
        </div>
        {boardInfo && (
          <PageTitle title={`Delete '${boardInfo.title}' board?`} />
        )}
        <p>You won&apos;t be able to recover the board</p>
        <div className="delete-board-btn-container">
          <GenericButton
            buttonLabel="Cancel"
            buttonSize="medium"
            buttonType="secondary"
            buttonDisabled={false}
            onClick={() => {
              setModalVisibility(false);
            }}
          />
          <GenericButton
            buttonLabel="Delete"
            buttonSize="medium"
            buttonType="primary"
            buttonDisabled={false}
            onClick={() => deleteBoard(boardId)}
          />
        </div>
      </div>
    </div>
  );
};

DeleteBoardModal.propTypes = {
  boardInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default DeleteBoardModal;
