import React, { useState } from 'react';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import MembersModal from '../../components/ModalViewComponent/MembersModal.component';
import members from '../../components/ModalViewComponent/membersData.json';
import CandidateListPreDeadline from './BoardPageComponents/CandidateList/CandidateListPreDeadline';
import CandidateListPostDeadline from './BoardPageComponents/CandidateList/CandidateListPostDeadline';
import { useBoard } from './BoardProvider';
import { useUser } from '../../firebase/UserContext';
import BoardAddCandidatePostDeadline from './BoardPageComponents/BoardAddCandidate/BoardAddCandidatePostDeadline';
import BoardAddCandidatePreDeadline from './BoardPageComponents/BoardAddCandidate/BoardAddCandidatePreDeadline';
import OwnerBoardPageHeader from './BoardPageComponents/BoardHeader/OwnerBoardPageHeader';
import ResultButtonPostDeadline from './ResultButton/ResultButtonPostDeadline.container';
import ResultButtonPreDeadline from './ResultButton/ResultButtonPreDeadline.container';

export default function OwnerBoardPage() {
  const { boardInfo } = useBoard();
  const boardId = boardInfo.id;
  const { user } = useUser();
  const userId = user[0].id;
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

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
          <OwnerBoardPageHeader />
        </div>
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
        <MembersModal show={showModal} close={closeModal} members={members} />
        {boardInfo.hasPassedDeadline() ? (
          <div>
            <div className="Input-component">
              <BoardAddCandidatePostDeadline />
            </div>
            <CandidateListPostDeadline userId={userId} boardId={boardId} />
            <div className="Result">
              <ResultButtonPostDeadline />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <BoardAddCandidatePreDeadline />
            </div>
            <CandidateListPreDeadline userId={userId} boardId={boardId} />
            <div className="Result">
              <ResultButtonPreDeadline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
