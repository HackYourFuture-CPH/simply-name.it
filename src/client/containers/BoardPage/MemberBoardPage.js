import React, { useState } from 'react';
import './BoardPage.style.css';
import PropTypes from 'prop-types';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import { useBoard } from './BoardProvider';
import { useUser } from '../../firebase/UserContext';
import BoardHeader from '../BoardPageComponents/BoardAddCandidate/BoardHeader';
import CandidateListPostDeadline from '../BoardPageComponents/CandidateList/CandidateListPostDeadline';
import CandidateListPreDeadline from '../BoardPageComponents/CandidateList/CandidateListPreDeadline';
import ResultButtonPostDeadline from './ResultButton/ResultButtonPostDeadline.container';
import ResultButtonPreDeadline from './ResultButton/ResultButtonPreDeadline.container';

export default function MemberBoardPage() {
  const { boardInfo } = useBoard();
  const boardId = boardInfo.id;
  const { user } = useUser();
  const userId = user[0].id;
  const onClick = () => {};
  return (
    <div className="Board-container">
      <div className="Header-component">
        <BoardHeader />
      </div>
      <div className="title">
        <PageTitle title={boardInfo.title} />
        <GenericButton
          className="generic-button"
          buttonSize="small"
          buttonType="secondary"
          buttonDisabled={false}
          onClick={onClick}
          buttonLabel="Members"
        />
      </div>
      {boardInfo.hasPassedDeadline() ? (
        <div>
          <div className="CandidateCard-component">
            <CandidateListPostDeadline userId={userId} boardId={boardId} />
          </div>
          <div className="Result">
            <ResultButtonPostDeadline />
          </div>
        </div>
      ) : (
        <div>
          <div className="CandidateCard-component">
            <CandidateListPreDeadline userId={userId} boardId={boardId} />
          </div>
          <div className="Result">
            <ResultButtonPreDeadline />
          </div>
        </div>
      )}
    </div>
  );
}

GenericButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

GenericButton.defaultProps = {
  onClick: undefined,
};
