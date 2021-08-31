import React, { useState, useContext } from 'react';
import ProfileProps from './ProfileContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import Dropdown from '../../components/Dropdown/Dropdown.component';

// eslint-disable-next-line react/prop-types
export default function DropDownMenuMyBoards({ board }) {
  const [visible, setVisible] = useState(false);
  const { setModalVisibility, setclickedBoardInfo } = useContext(ProfileProps);
  const history = useHistory();
  return (
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
              await setclickedBoardInfo(board);
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
              await setclickedBoardInfo(board);
              setModalVisibility(true);
            }}
          >
            Delete board
          </button>
        </li>
      </ul>
    </Dropdown>
  );
}

export function DropDownMenuJoinedBoards() {
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
        <li>
          <button type="button">Leave board</button>
        </li>
      </ul>
    </Dropdown>
  );
}
