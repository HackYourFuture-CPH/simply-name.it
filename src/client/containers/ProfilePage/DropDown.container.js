import React, { useState, useContext } from 'react';
import { Props } from './ProfilePage.container';

import Dropdown from '../../components/Dropdown/Dropdown.component';

export default function DropDwonContainerMyBoards() {
  const [visible, setVisible] = useState(false);

  const { setModalVisibility } = useContext(Props);

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
          <li> Edit board </li>

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
