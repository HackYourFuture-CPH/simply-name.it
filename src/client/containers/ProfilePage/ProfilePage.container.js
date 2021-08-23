/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './ProfilePage.style.css';

import TapSeparator from './TapSeparator.component';
import BoardBanners from './BoardBanners.component';

import HeaderComponent from '../../components/HeaderComponent/Header.component';
import Dropdown from '../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import BoardCard from '../../components/BoardCard/BoardCard.component';
import BoardMenuButton from '../../components/BoardMenuButton/BoardMenuButton.component';

export const Props = createContext();

// export default function ProfilePage() {
//   const { signOut } = useFirebase();
//   return (
//     <div>
//       This is your private profilePage
//       <button onClick={signOut}>sign out </button>
//     </div>
//   )

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [joinedBoards, setJoinedBoards] = useState();
  const [myBoards, setMyBoards] = useState();
  const [onMyBoards, setOnMyBoards] = useState();
  const [currentTab, setCurrentTab] = useState('my-boards');

  const { userId } = useParams();
  // console.log(userId);

  const handleTabChange = (e) => {
    console.log(e.innerText);
  };

  const getUserData = async () => {
    setLoading(true);
    const response = await fetch(`/api/users/2`);
    if (!response.ok) {
      setError(true);
    } else {
      const data = await response.json();
      setUserData(data[0]);
      setLoading(false);
    }
  };

  // here if no boards so no Error , result white page
  const getJoinedBoards = async () => {
    const response = await fetch(` /api/users/1/boards/?role=member`);
    const data = await response.json();
    setJoinedBoards(data);
    setLoading(false);
  };

  const getMyBoards = async () => {
    const response = await fetch(` /api/users/2/boards/created`);
    const data = await response.json();
    setMyBoards(data);
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
    getJoinedBoards();
    getMyBoards();
  }, []);

  if (!userData || !myBoards || !joinedBoards) {
    return null;
  }
  return (
    <Props.Provider
      value={{
        onMyBoards,
        setOnMyBoards,
        joinedBoards,
        setJoinedBoards,
        myBoards,
        setMyBoards,
        joinedBoards,
        setJoinedBoards,
      }}
    >
      <div className="profile-page-container">
        <div>
          <div className="header-container">
            <div className="header">
              <HeaderComponent colored={true}>
                <Link to="/welcome">
                  <ArrowButton
                    // onClick={console.log(' clicked')}
                    color="white"
                  />
                </Link>
                <Dropdown
                  variant="dark"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                  visible={visible}
                >
                  <ul>
                    <li> Log out </li>
                  </ul>
                </Dropdown>
              </HeaderComponent>
            </div>
            <div className="sub-header">
              <UserProfilePicture
                profilePictureLink="https://picsum.photos/seed/picsum/200/300"
                size="big"
              />
              <PageTitle variant="black-large" title={userData.fullName} />
            </div>
          </div>
          <div className="users-boards-container">
            <TapSeparator />
            <div className="boards-container">
              <BoardBanners />
            </div>
          </div>
        </div>
      </div>
    </Props.Provider>
  );
}
