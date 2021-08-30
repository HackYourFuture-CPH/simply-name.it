import React, { useContext } from 'react';

import ProfileProps from './ProfileContext';
import BoardCard from '../../components/BoardCard/BoardCard.component';
import DropDownMenuMyBoards, {
  DropDownMenuJoinedBoards,
} from './BoardCardDropdown.component';
import NewBoard from './NewBoard.component';
import './BoardBanners.styles.css';

export default function BoardBanners() {
  const { onMyBoards, joinedBoards, myBoards } = useContext(ProfileProps);

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
                  <DropDownMenuMyBoards boardInfo={board} />
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
                <DropDownMenuJoinedBoards />
              </BoardCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
