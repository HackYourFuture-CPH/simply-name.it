import React, { useContext } from 'react';

import ProfileProps from './ProfileContext';
import BoardCard from '../../components/BoardCard/BoardCard.component';
import DropDownMenuMyBoards, {
  DropDownMenuJoinedBoards,
} from './BoardCardDropdown.component';
import NewBoard from './NewBoard.component';
import './BoardSection.styles.css';

export default function BoardSection() {
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
              <DropDownMenuMyBoards />
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
              <DropDownMenuJoinedBoards />
            </BoardCard>
          ))}
        </div>
      )}
    </div>
  );
}
