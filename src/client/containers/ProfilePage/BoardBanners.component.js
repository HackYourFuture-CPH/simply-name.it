import React, { useContext } from 'react';

import ProfileProps from './ProfileContext';
import BoardCard from '../../components/BoardCard/BoardCard.component';
import DropDwonContainerMyBoards, {
  DropDwonContainerJoinedBoards,
} from './DropDown.container';
import NewBoard from './NewBoard.component';
import './BoardBanners.styles.css';

export default function BoardBanners() {
  const { onMyBoards, joinedBoards, myBoards } = useContext(ProfileProps);

  if (!joinedBoards) {
    return null;
  }
  return (
    <div className="boards-cards-container">
      {onMyBoards && (
        <div className="boards-distribution">
          <NewBoard />
          {myBoards.map((board) => (
            <BoardCard
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Board picture"
              boardTitle={board.title}
              key={board.id}
            >
              <DropDwonContainerMyBoards />
            </BoardCard>
          ))}
        </div>
      )}
      {!onMyBoards && (
        <div>
          {joinedBoards.map((board) => (
            <BoardCard
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Board picture"
              boardTitle={board.title}
              key={board.id}
            >
              <DropDwonContainerJoinedBoards />
            </BoardCard>
          ))}
        </div>
      )}
    </div>
  );
}
