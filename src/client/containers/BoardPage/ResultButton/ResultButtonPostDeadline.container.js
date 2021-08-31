import React from 'react';
import '../BoardPage.style.css';
import { Link } from 'react-router-dom';
import { useBoard } from '../BoardProvider';
import GenericButton from '../../../components/GenericButton/GenericButton.component';

const onClick = () => {
  // console.log('you clicked!');
};

export default function ResultButtonPostDeadline() {
  const { boardInfo } = useBoard();
  const boardId = boardInfo.id;

  return (
    <div className="Result">
      <Link to={`/resultpage/${boardId}`}>
        <GenericButton
          className="Result-button"
          buttonLabel="Result"
          buttonSize="medium"
          buttonType="primary"
          buttonDisabled={false}
          onClick={onClick}
        />
      </Link>
    </div>
  );
}
