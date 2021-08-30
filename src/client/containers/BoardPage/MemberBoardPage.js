import React from 'react';
import './BoardPage.style.css';
import PropTypes from 'prop-types';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import { useBoard } from './BoardProvider';
import MemberBoardPageHeader from '../BoardPageComponents/BoarHeader/MemberBoardPageHeader';
import CandidateListPostDeadline from '../BoardPageComponents/CandidateList/CandidateListPostDeadline';
import CandidateListPreDeadline from '../BoardPageComponents/CandidateList/CandidateListPreDeadline';
import ResultButtonPostDeadline from './ResultButton/ResultButtonPostDeadline.container';
import ResultButtonPreDeadline from './ResultButton/ResultButtonPreDeadline.container';

export default function MemberBoardPage() {
  const { boardInfo } = useBoard();

  const displayDelete = 'hidden';
  const onClick = () => {};
  return (
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
          onClick={onClick}
          buttonLabel="Members"
        />
      </div>
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
  );
}

GenericButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

GenericButton.defaultProps = {
  onClick: undefined,
};
