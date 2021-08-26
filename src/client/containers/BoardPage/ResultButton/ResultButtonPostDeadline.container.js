import React from 'react';
import '../BoardPage.style.css';
import PropTypes from 'prop-types';
import { useBoard } from '../BoardProvider';
import { Link } from 'react-router-dom';
import GenericButton from '../../../components/GenericButton/GenericButton.component';

const onClick = () => {};

export default function ResultButtonPostDeadline() {
  const { boardInfo } = useBoard();
  const boardId = boardInfo.id;
  return (
    <div className="Result">
      <Link to="/ResultPage" boardId={boardId}>
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

GenericButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

GenericButton.defaultProps = {
  onClick: undefined,
};
