import React, { useState, useContext } from 'react';
import ProfileProps from './ProfileContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import Dropdown from '../../components/Dropdown/Dropdown.component';

// eslint-disable-next-line react/prop-types
export default function DropDwonContainerMyBoards({ boardInfo }) {
  const [visible, setVisible] = useState(false);
  const {
    setModalVisibility,
    myBoards,
    setclickedBoardId,
    setclickedBoardInfo,
  } = useContext(ProfileProps);
  const history = useHistory();

  if (!myBoards) {
    return null;
  }
  return (
    <div>
      <Dropdown
        variant="dark"
        onClick={() => {
          setVisible(!visible);
        }}
        visible={visible}
      >
        <ul>
          <li>
            <button
              type="button"
              onClick={async () => {
                // eslint-disable-next-line react/prop-types
                await setclickedBoardId(boardInfo.id);
                history.push('/edit-board');
              }}
            >
              Edit board
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={async () => {
                await setclickedBoardInfo(boardInfo);
                setModalVisibility(true);
              }}
            >
              Delete board
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}

export function DropDwonContainerJoinedBoards() {
  const [visible, setVisible] = useState(false);
  return (
    <Dropdown
      variant="dark"
      onClick={() => {
        setVisible(!visible);
      }}
      visible={visible}
    >
      <ul>
        <li> Leave board </li>
      </ul>
    </Dropdown>
  );
}
