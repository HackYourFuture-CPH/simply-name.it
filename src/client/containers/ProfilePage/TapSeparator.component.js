import React, { useState, useEffect, useContext, createContext } from 'react';

import './TapSeprator.style.css';
import { Props } from './ProfilePage.container';

export default function TapSeparator() {
  const {
    onJoinedBoards,
    setOnJoinedBoards,
    onMyBoards,
    setOnMyBoards,
  } = useContext(Props);

  return (
    <>
      <input
        type="radio"
        name="boards"
        id="tab-1"
        className="tab-1"
        checked="checked"
      />
      <span>My Boards</span>
      <input type="radio" name="boards" id="tab-2" className="tab-2" />
      <span>Joined Boards</span>
    </>
  );
}
/* <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                setOnMyBoards(true);
              }}
            >
              My boards
            </th>

            <th
              onClick={() => {
                setOnMyBoards(false);
              }}
            >
              {' '}
              Joined boards{' '}
            </th>
          </tr>
        </thead>
      </table> */
