import React, { useState, useEffect, useContext, createContext } from 'react';

import './ProfilePage.style.css';
import { Props } from './ProfilePage.container';

export default function TapSeparator() {
  const {
    onJoinedBoards,
    setOnJoinedBoards,
    onMyBoards,
    setOnMyBoards,
  } = useContext(Props);

  return (
    <div>
      <table>
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
      </table>
    </div>
  );
}
