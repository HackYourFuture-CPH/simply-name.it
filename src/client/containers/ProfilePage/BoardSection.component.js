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
    <div className="boards-cards-container">
      {onMyBoards && (
        <div className="boards-distribution">
          <NewBoard />
          {Array.isArray(myBoards) &&
            myBoards.map((board) => (
              <button
                type="button"
                onClick={() => {
                  history.push(`users/${userId}/boards/${board.id}`);
                }}
              >
                <BoardCard
                  src="https://picsum.photos/seed/picsum/200/300"
                  alt="Board picture"
                  boardTitle={board.title}
                  key={board.id}
                >
                  <DropDownMenuMyBoards board={board} />
                </BoardCard>
              </button>
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
              >
                <DropDownMenuJoinedBoards />
              </BoardCard>
            ))}
        </div>
      )}
    </div>
  );
}
