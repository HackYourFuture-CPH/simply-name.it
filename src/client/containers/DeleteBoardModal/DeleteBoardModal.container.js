import React from 'react';
import PropTypes from 'prop-types';
import './DeleteBoardModal.style.css';
import CloseButton from '../../components/CloseButton/CloseButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';

const DeleteBoardModal = ({ boardInfo, setModalVisibility }) => {
  // const { userId } = useParams();

  const userId = 2;
  const boardId = 1;
  const deleteBoard = async (boardId) => {
    const API_URL = `/api/users/${userId}/boards/${boardId}}`;
    try {
      await fetch(API_URL, { method: 'DELETE' });
      alert('Data deleted');
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="delete-board-container">
      <div className="greyLine" />
      <div className="close-btn-div">
        <CloseButton onClick={() => setModalVisibility(false)} />
      </div>
      <div className="content-container">
        <div className="circle-exclamation">
          <p>!</p>
        </div>
        {/*  {boardInfo && (
          <PageTitle title={`Delete '${boardInfo.title}' board?`} />
        )}*/}
        <PageTitle title={`Delete 'What should I name my pet' board?`} />
        <p>You won&apos;t be able to recover the board</p>
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
            onClick={() => deleteBoard(boardId)} //boardInfo.id
          />
        </div>
      </div>
    </div>
  );
};

DeleteBoardModal.propTypes = {
  boardInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
  }),
  setModalVisibility: PropTypes.func.isRequired,
};

export default DeleteBoardModal;
