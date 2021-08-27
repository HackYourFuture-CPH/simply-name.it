import React, { useState, useContext } from 'react';
import { Props } from './ProfilePage.container';
import { useHistory } from 'react-router';
import Dropdown from '../../components/Dropdown/Dropdown.component';

export default function DropDwonContainerMyBoards() {
  const [visible, setVisible] = useState(false);
  const { setModalVisibility } = useContext(Props);
  const history = useHistory();
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
          <li
            onClick={() => {
              history.push('/edit-board');
            }}
          >
            Edit board
          </li>
          <li
            onClick={() => {
              setModalVisibility(true);
            }}
          >
            Delete board
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
