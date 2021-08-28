/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { useUser } from '../../firebase/UserContext';
import { useFirebase } from '../../firebase/FirebaseContext';
import { ProfilePropsProvider } from './ProfileContext';
import './ProfilePage.styles.css';

import TapSeparator from './TapSeparator.component';
import BoardBanners from './BoardBanners.component';

import HeaderComponent from '../../components/HeaderComponent/Header.component';
import Dropdown from '../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import DeleteBoardModal from '../DeleteBoardModal/DeleteBoardModal.container';
// import ApiError from '../../ErrorBoundary';

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  const [joinedBoards, setJoinedBoards] = useState();
  const [myBoards, setMyBoards] = useState();
  const [onMyBoards, setOnMyBoards] = useState();
  const [modalVisibility, setModalVisibility] = useState(false);

  const history = useHistory();
  const { user } = useUser();

  // const userId = user[0].id;

  const { signOut } = useFirebase();

  // const [errorState, setErrorState] = useState();
  // setErrorState(() => {
  //   throw new ApiError();
  // });

  const getJoinedBoards = async () => {
    const response = await fetch(` /api/users/1/boards/?role=member`);
    if (!response.ok) {
      // setErrorState(() => {
      //   throw new ApiError();
      // });
    } else {
      const data = await response.json();
      setJoinedBoards(data);
    }
  };

  const getMyBoards = async () => {
    const response = await fetch(` /api/users/2/boards/created`);
    if (!response.ok) {
      // setErrorState(() => {
      //   throw new ApiError();
      // });
    } else {
      const data = await response.json();
      setMyBoards(data);
    }
  };

  useEffect(() => {
    (async () => {
      await getMyBoards();
      await getJoinedBoards();
    })();
  }, []);

  if (!myBoards || !joinedBoards) {
    return null;
  }
  return (
    <ProfilePropsProvider
      value={{
        onMyBoards,
        setOnMyBoards,
        joinedBoards,
        setJoinedBoards,
        myBoards,
        setMyBoards,
        modalVisibility,
        setModalVisibility,
      }}
    >
      <div className="profile-page-container">
        <div className="header">
          <HeaderComponent colored={true}>
            {/* user can not go welcome only if he signout  */}
            <ArrowButton
              onClick={() => {
                history.push('/profile');
              }}
              color="white"
            />

            <Dropdown
              variant="dark"
              onClick={() => {
                setVisible(!visible);
              }}
              visible={visible}
            >
              <ul>
                <li>
                  {' '}
                  <button type="button" onClick={signOut}>
                    Log out
                  </button>{' '}
                </li>
              </ul>
            </Dropdown>
          </HeaderComponent>
        </div>
        <div className="sub-header">
          <div className="profile-user">
            <UserProfilePicture
              // i need to add the user pic
              profilePictureLink="https://picsum.photos/seed/picsum/200/300"
              size="big"
            />
            <PageTitle variant="black-large" title={user[0].fullName} />
          </div>
        </div>
        <div className="users-boards-container">
          <TapSeparator />
          <div className="boards-container">
            <BoardBanners />
          </div>
        </div>
        {modalVisibility && (
          <div>
            <DeleteBoardModal
              modalVisibility={modalVisibility}
              setModalVisibility={setModalVisibility}
              // boardInfo={myBoards}
            />
          </div>
        )}
      </div>
    </ProfilePropsProvider>
  );
}
