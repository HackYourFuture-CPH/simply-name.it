import React, { useState } from 'react';
import './CreateBoardPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import InputComponent from '../../components/InputComponent/InputComponent';
// import DropZone from '../../components/Dropzone/dropzone.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import AddMembers from '../AddMembersPage/AddMembersPage.container';
import { useHistory } from 'react-router-dom';
import AddNewBoard from './AddNewBoard';
import { useUser } from '../../firebase/UserContext';

export default function CreateBoard() {
  const history = useHistory();
  const { user } = useUser();
  const userId = user[0].id;
  const [boardName, setboardName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [banner, setBanner] = useState('');
  const [members, setMembers] = useState([]);
  const addMember = (id) => {
    setMembers([...members, id]);
  };
  const [showAddMembers, setshowAddMembers] = useState(false);
  const toggleShowMembers = () => {
    setshowAddMembers(!showAddMembers);
  };

  const onArrowButtonClick = () => {
    const path = '/profile';
    history.push(path);
  };

  const onResetButtonClick = () => {
    setboardName('');
    setDatetime('');
    setBanner('');
  };

  const newBoard = {
    creatorId: userId,
    title: boardName,
    deadline: datetime,
    isDeleted: false,
    banner,
  };

  const onCreateButtonClick = () => {
    AddNewBoard(newBoard, userId);
    onResetButtonClick();
  };
  console.log(members);

  return (
    <div className="board-container">
      <ArrowButton onClick={onArrowButtonClick} color="black" />
      <PageTitle title="New board" variant="black-large" />
      <label>Name</label>
      <div className="input-name-container">
        <InputComponent
          placeholder="Board Name"
          borderShape="round"
          theme="light"
          inputValue={boardName}
          onChange={(e) => {
            setboardName(e);
          }}
        />
      </div>
      <label>Deadline</label>
      <div className="input-name-container">
        <InputComponent
          type="datetime-local"
          placeholder="Date/Time"
          borderShape="round"
          theme="light"
          inputValue={datetime}
          onChange={(e) => {
            setDatetime(e);
          }}
        />
      </div>
      {showAddMembers && (
        <AddMembers
          members={members}
          addMember={addMember}
          toggleShowMembers={toggleShowMembers}
        />
      )}
      {!showAddMembers && (
        <GenericButton
          buttonLabel="Add members"
          buttonSize="large"
          buttonType="primary"
          buttonDisabled={false}
          onClick={toggleShowMembers}
        />
      )}
      <br />
      <GenericButton
        buttonLabel="Reset"
        buttonSize="medium"
        buttonType="secondary"
        buttonDisabled={false}
        onClick={onResetButtonClick}
      />
      <GenericButton
        buttonLabel="Create"
        buttonSize="medium"
        buttonType="primary"
        buttonDisabled={false}
        onClick={onCreateButtonClick}
      />
    </div>
  );
}
