import React, { useContext } from 'react';
import './TapSeparator.styles.css';
import ProfileProps from './ProfileContext';

export default function TapSeparator() {
  const { setOnMyBoards } = useContext(ProfileProps);

  return (
    <>
      <input
        type="radio"
        name="boards"
        id="tab-1"
        className="tab-1"
        defaultChecked
        onClick={() => {
          setOnMyBoards(true);
        }}
      />
      <span>My Boards</span>
      <input
        type="radio"
        name="boards"
        id="tab-2"
        className="tab-2"
        onClick={() => {
          setOnMyBoards(false);
        }}
      />
      <span>Joined Boards</span>
    </>
  );
}
