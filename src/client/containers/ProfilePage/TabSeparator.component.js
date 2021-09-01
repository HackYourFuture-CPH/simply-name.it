import React, { useContext } from 'react';
import './TabSeparator.styles.css';
import ProfileProps from './ProfileContext';

export default function TapSeparator() {
  const { setOnMyBoards } = useContext(ProfileProps);

  return (
    <>
      <input
        type="radio"
        name="boards"
        id="tab-1"
        className="tabs tab-1"
        defaultChecked
        onClick={() => {
          setOnMyBoards(true);
        }}
      />
      <span className="tab-title">My Boards</span>
      <input
        type="radio"
        name="boards"
        id="tab-2"
        className="tabs tab-2"
        onClick={() => {
          setOnMyBoards(false);
        }}
      />
      <span className="tab-title">Joined Boards</span>
    </>
  );
}
