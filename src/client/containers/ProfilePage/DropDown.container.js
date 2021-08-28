import React, { useState, useContext } from 'react';
import ProfileProps from './ProfileContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import Dropdown from '../../components/Dropdown/Dropdown.component';

export default function DropDwonContainerMyBoards() {
  const [visible, setVisible] = useState(false);
  const { setModalVisibility } = useContext(ProfileProps);
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
            onClick={() => {
              history.push('/edit-board');
            }}
          >
            Edit board
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
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

export function DropDwonContainerJoinedBoards() {
  const [visible, setVisible] = useState(false);
  const { setModalVisibility } = useContext(ProfileProps);
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
            onClick={() => {
              setModalVisibility(true);
            }}
          >
            Leave board
          </button>
        </li>
      </ul>
    </Dropdown>
  );
}
