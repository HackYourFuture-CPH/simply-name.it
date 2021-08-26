import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import MembersModal from '../../components/ModalViewComponent/MembersModal.component';
import members from '../../components/ModalViewComponent/membersData.json';
import CandidateListPreDeadline from '../BoardPageComponents/CandidateList/CandidateListPreDeadline';
import CandidateListPostDeadline from '../BoardPageComponents/CandidateList/CandidateListPostDeadline';
import { useBoard } from './BoardProvider';
import { useUser } from '../../firebase/UserContext';
import BoardAddCandidatePostDeadline from '../BoardPageComponents/BoardAddCandidate/BoardAddCandidatePostDeadline';
import BoardAddCandidatePreDeadline from '../BoardPageComponents/BoardAddCandidate/BoardAddCandidatePreDeadline';
import BoardHeader from '../BoardPageComponents/BoardAddCandidate/BoardHeader';

export default function OwnerBoardPage() {
  const { boardInfo } = useBoard();
  const boardId = boardInfo.id;
  const { user } = useUser();
  const userId = user[0].id;
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  // const deadlineDate = new Date(boardInfo.deadline);
  const deadlineDate = new Date('2021-09-12');
  const today = new Date();
  const onClick = () => {
    // console.log('you clicked!');
  };
  return (
    <div className="ModalView">
      {showModal && (
        <div
          onClick={closeModal}
          onKeyDown={closeModal}
          className="back-drop"
          aria-hidden="true"
        />
      )}
      <div className="Board-container">
        <div className="Header-component">
          <BoardHeader />
        </div>
        <MembersModal show={showModal} close={closeModal} members={members} />
        <div className="title">
          <PageTitle title={boardInfo.title} />
          <GenericButton
            className="generic-button"
            buttonSize="small"
            buttonType="secondary"
            buttonDisabled={false}
            onClick={() => setShowModal(true)}
            buttonLabel="Members"
          />
        </div>
        {today > deadlineDate ? (
          <div>
            <div className="Input-component">
              <BoardAddCandidatePostDeadline />
            </div>
            <CandidateListPostDeadline userId={userId} boardId={boardId} />
            <div className="Result">
              {/* <ResultButtonPostDeadline /> */}
              <GenericButton
                className="Result-button"
                buttonLabel="Result"
                buttonSize="medium"
                buttonType="primary"
                buttonDisabled={false}
                onClick={onClick}
              />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <BoardAddCandidatePreDeadline />
            </div>
            <CandidateListPreDeadline userId={userId} boardId={boardId} />
            <div className="Result">
              <GenericButton
                className="Result-button"
                buttonLabel="Result"
                buttonSize="medium"
                buttonType="primary"
                buttonDisabled={true}
                onClick={onClick}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
