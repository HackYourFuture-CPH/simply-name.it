import React, { useEffect, useContext } from 'react';

import { Props } from './ProfilePage.container';
import BoardCard from '../../components/BoardCard/BoardCard.component';
import DropDwonContainerMyBoards from './DropDown.container';
import { DropDwonContainerJoinedBoards } from './DropDown.container';
import './BoardBanners.styles.css';
import NewBoard from './NewBoard.component';

export default function BoardBanners() {
  const { onMyBoards, joinedBoards, myBoards } = useContext(Props);

  useEffect(() => {}, []);

  if (!joinedBoards) {
    return null;
  }
  return (
    <div className="existing-boards">
      {onMyBoards && (
        <div>
          <NewBoard />
          <div>
            {myBoards.map((board) => (
              <div key={board.id}>
                <BoardCard
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="Board picture"
                  boardTitle={board.title}
                >
                  <DropDwonContainerMyBoards />
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
                <DropDwonContainerJoinedBoards />
              </BoardCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
