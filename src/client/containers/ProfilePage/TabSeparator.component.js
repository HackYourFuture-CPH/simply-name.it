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
        className="profile-page-tabs tab-1"
        defaultChecked
        onClick={() => {
          setOnMyBoards(true);
        }}
      />
      <span className="profile-page-tab-title">My Boards</span>
      <input
        type="radio"
        name="boards"
        id="tab-2"
        className="profile-page-tabs tab-2"
        onClick={() => {
          setOnMyBoards(false);
        }}
      />
      <span className="profile-page-tab-title">Joined Boards</span>
    </>
  );
}
