import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

import './BoardBanners.style.css';
import { Props } from './ProfilePage.container';
import { UserContext } from '../../firebase/UserContext';

import BoardCard from '../../components/BoardCard/BoardCard.component';
import Dropdown from '../../components/Dropdown/Dropdown.component';

const NewBoard = ({ onClick }) => {
  return (
    <div className="board-container">
      <div className="add-new-board">
        <div className="create-new-board-title">New board</div>
        <div className="add-new-button">
          {/* add right path her to New board page */}
          <Link to="/">
            <button type="button" onClick={onClick}>
              +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function BoardBanners({ onClick }) {
  const {
    onJoinedBoards,
    setOnJoinedBoards,
    onMyBoards,
    setOnMyBoards,
    joinedBoards,
    setJoinedBoards,
    myBoards,
  } = useContext(Props);

  useEffect(() => {
    console.log(myBoards);
    console.log(joinedBoards);
  }, []);

  // const { user } = useContext(UserContext);
  // console.log(user);

  if (!joinedBoards) {
    return null;
  }
  return (
    <div className="existing-boards">
      {onMyBoards && (
        <div>
          <NewBoard className="create-new-board" />

          <div>
            {myBoards.map((board) => (
              <div key={board.id}>
                <BoardCard
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="Board picture"
                  boardTitle={board.title}
                >
                  <Dropdown
                    variant="dark"
                    onClick={() => {
                      // setVisible(!visible);
                    }}
                    // visible={visible}
                  >
                    <ul>
                      {/* add right path afterwards */}
                      <Link to="/">
                        <li> Edit board </li>
                      </Link>
                      {/* popup delete page */}
                      <li> Delete board </li>
                    </ul>
                  </Dropdown>
                </BoardCard>
              </div>
            ))}
          </div>
        </div>
      )}

      {!onMyBoards && (
        <div>
          {joinedBoards.map((board) => (
            <div key={board.id}>
              <BoardCard
                src="https://picsum.photos/seed/picsum/200/300"
                alt="Board picture"
                boardTitle={board.title}
              >
                <Dropdown
                  variant="dark"
                  onClick={() => {
                    // setVisible(!visible);
                  }}
                  // visible={visible}
                >
                  <ul>
                    {/* add right path afterwards */}
                    <Link to="/">
                      <li> Edit board </li>
                    </Link>
                    {/* popup delete page */}
                    <li> Delete board </li>
                  </ul>
                </Dropdown>
              </BoardCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
