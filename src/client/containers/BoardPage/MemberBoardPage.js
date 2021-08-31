import React, { useState } from 'react';
import './BoardPage.style.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import { useBoard } from './BoardProvider';
import MemberBoardPageHeader from './BoardPageComponents/BoardHeader/MemberBoardPageHeader';
import CandidateListPostDeadline from './BoardPageComponents/CandidateList/CandidateListPostDeadline';
import CandidateListPreDeadline from './BoardPageComponents/CandidateList/CandidateListPreDeadline';
import ResultButtonPostDeadline from './ResultButton/ResultButtonPostDeadline.container';
import ResultButtonPreDeadline from './ResultButton/ResultButtonPreDeadline.container';
import MembersModal from '../../components/ModalViewComponent/MembersModal.component';
import members from '../../components/ModalViewComponent/membersData.json';

export default function MemberBoardPage() {
  const { boardInfo } = useBoard();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const displayDelete = 'hidden';

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
          <MemberBoardPageHeader />
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
            <div className="CandidateCard-component-member">
              <CandidateListPostDeadline displayDelete={displayDelete} />
            </div>
            <div className="Result">
              <ResultButtonPostDeadline />
            </div>
          </div>
        ) : (
          <div>
            <div className="CandidateCard-component-member">
              <CandidateListPreDeadline displayDelete={displayDelete} />
            </div>
            <div className="Result">
              <ResultButtonPreDeadline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
