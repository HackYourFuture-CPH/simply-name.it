import React, { useState } from 'react';
import './BoardHeader.style.css';
import HeaderComponent from '../../../components/HeaderComponent/Header.component.js';
import Dropdown from '../../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../../components/ArrowButton/ArrowButton.component';
import { Link } from 'react-router-dom';

export default function BoardHeader() {
  const [visibility, setVisibility] = useState(false);
  const closeDropdown = () => {
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };
  const onClick = () => {
    // console.log('you clicked!');
  };
  return (
    <div className="board-header-container">
      <HeaderComponent>
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
            <ul className="header-option-list">
              <li>Edit Board</li>
              <li>Delete Board</li>
            </ul>
          </div>
        </Dropdown>
      </HeaderComponent>
    </div>
  );
}
