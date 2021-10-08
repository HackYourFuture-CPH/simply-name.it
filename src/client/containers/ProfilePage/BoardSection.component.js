import React, { useContext } from 'react';
import ProfileProps from './ProfileContext';
import BoardCard from '../../components/BoardCard/BoardCard.component';
import DropDownMenuMyBoards, {
  DropDownMenuJoinedBoards,
} from './BoardCardDropdown.component';
import NewBoard from './NewBoard.component';
import './BoardSection.styles.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';

export default function BoardSection() {
  const { onMyBoards, joinedBoards, myBoards, userId } = useContext(
    ProfileProps,
  );
  const history = useHistory();
  return (
    <div className="profile-page-boards-cards-container">
      {onMyBoards && (
        <div className="profile-page-boards-distribution">
          <NewBoard />
          {Array.isArray(myBoards) &&
            myBoards.map((board) => (
              <BoardCard
                src="https://picsum.photos/seed/picsum/200/300"
                alt="Board picture"
                boardTitle={board.title}
                key={board.id}
                onClick={() => {
                  history.push(`/boards/${board.id}`);
                }}
              >
                <DropDownMenuMyBoards board={board} />
              </BoardCard>
            ))}
        </div>
      )}
      {!onMyBoards && (
        <div>
          {Array.isArray(joinedBoards) &&
            joinedBoards.map((board) => (
              <BoardCard
                src="https://picsum.photos/seed/picsum/200/300"
                alt="Board picture"
                boardTitle={board.title}
                key={board.id}
                onClick={() => {
                  history.push(`users/${userId}/boards/${board.id}`);
                }}
              >
                <DropDownMenuJoinedBoards />
              </BoardCard>
            ))}
        </div>
      )}
    </div>
  );
}
