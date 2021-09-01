import React, { useState } from 'react';
import './BoardHeader.style.css';
import HeaderComponent from '../../../../components/HeaderComponent/Header.component.js';
import Dropdown from '../../../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../../../components/ArrowButton/ArrowButton.component';
import { Link } from 'react-router-dom';
import DeleteBoardModal from '../../../DeleteBoardModal/DeleteBoardModal.container';
import { useBoard } from '../../BoardProvider';
import { useUser } from '../../../../firebase/UserContext';

export default function OwnerBoardPageHeader() {
  const { boardInfo } = useBoard();
  const { user } = useUser();
  const userId = user[0].id;
  const [modalVisibility, setModalVisibility] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const closeDropdown = () => {
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  const onClick = () => {
    // console.log(fasfa);
  };
  return (
    <div>
      <HeaderComponent
        className="header-component-image"
        variant="cropped"
        colored={false}
      >
        <Link to="/profile">
          <ArrowButton className="arrow-button-white" onClick={onClick} />
        </Link>
        <Dropdown
          className="dropdown-button"
          variant="dark"
          visible={visibility}
          onClick={closeDropdown}
        >
          <div>
            <ul className="board-header-option-list">
              <Link to="/edit-board">
                <button
                  className="board-header-option-link"
                  type="button"
                  onClick={onClick}
                >
                  Edit Board
                </button>
              </Link>
              <button
                className="board-header-option-link"
                type="button"
                onClick={() => setModalVisibility(true)}
              >
                Delete Board
              </button>
            </ul>
          </div>
        </Dropdown>
        {modalVisibility && (
          <DeleteBoardModal
            userId={userId}
            boardInfo={boardInfo}
            setModalVisibility={setModalVisibility}
          />
        )}
      </HeaderComponent>
    </div>
  );
}
