import React, { useState } from 'react';
import './BoardHeader.style.css';
import HeaderComponent from '../../../../components/HeaderComponent/Header.component.js';
import Dropdown from '../../../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../../../components/ArrowButton/ArrowButton.component';
import { Link } from 'react-router-dom';
import ProfilePage from '../../../ProfilePage/ProfilePage.container';

export default function OwnerBoardPageHeader() {
  const [visibility, setVisibility] = useState(false);
  const closeDropdown = () => {
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };
  const [modalVisibility, setModalVisibility] = useState(false);
  const handleClick = () => {
    setModalVisibility(true);
    return (
      <ProfilePage
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    );
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
              <Link to="/profile">
                <button
                  className="board-header-option-link"
                  type="button"
                  onClick={handleClick}
                >
                  Delete Board
                </button>
              </Link>
            </ul>
          </div>
        </Dropdown>
      </HeaderComponent>
    </div>
  );
}
