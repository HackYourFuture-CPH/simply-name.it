import React from 'react';
import './DeleteBoardModal.style.css';
import CloseButton from '../../components/CloseButton/CloseButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';

const DeleteBoardModal = ({
  boardInfo,
  modalVisibilty,
  setModalVisibility,
}) => {
  console.log(boardInfo);
  console.log(modalVisibilty);

  const userId = 2;

  const deleteBoard = async (id) => {
    const API_URL = `/api/users/${userId}/boards/${id}`;
    try {
      await fetch(API_URL, { method: 'DELETE' });
      console.log('Data deleted');
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="delete-board-container">
      <div className="close-btn-div">
        <CloseButton onClick={() => setModalVisibility(false)} />
      </div>
      <div className="content-container">
        <div className="circle-exclamation">
          <p>!</p>
        </div>
        {boardInfo && (
          <PageTitle title={`Delete '${boardInfo.title}' board?`} />
        )}
        <p>You won't be able to recover the board</p>
        <div className="delete-btn-container">
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
            onClick={() => deleteBoard(boardInfo.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteBoardModal;
