import React from 'react';
import './DeleteBoardModal.style.css';
import CloseButton from '../../components/CloseButton/CloseButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';

const DeleteBoardModal = (boardInfo, modalVisibilty, setModalVisibility) => {
  console.log(boardInfo);
  return (
    <div className="delete-board-container">
      <div className="close-btn-div">
        <CloseButton onClick={() => setModalVisibility(!modalVisibilty)} />
      </div>
      <div className="content-container">
        <div className="circle-exclamation">
          <p>!</p>
        </div>
        {boardInfo && <PageTitle title={boardInfo.boardInfo.title} />}
      </div>
    </div>
  );
};

export default DeleteBoardModal;
