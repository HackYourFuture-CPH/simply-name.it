/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { useUser } from '../../firebase/UserContext';
import { useFirebase } from '../../firebase/FirebaseContext';
import { ProfilePropsProvider } from './ProfileContext';
import './ProfilePage.styles.css';
import TabSeparator from './TabSeparator.component';
import BoardSection from './BoardSection.component';
import HeaderComponent from '../../components/HeaderComponent/Header.component';
import Dropdown from '../../components/Dropdown/Dropdown.component';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import DeleteBoardModal from '../DeleteBoardModal/DeleteBoardModal.container';
import ApiError from '../../ErrorBoundary';

export default function ProfilePage() {
  const [visible, setVisible] = useState(false);
  const [joinedBoards, setJoinedBoards] = useState();
  const [myBoards, setMyBoards] = useState();
  const [onMyBoards, setOnMyBoards] = useState(true);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [clickedBoardInfo, setclickedBoardInfo] = useState();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  const history = useHistory();
  const { user } = useUser();
  const userData = user[0];
  const userId = user[0].id;

  const { signOut } = useFirebase();

  const getJoinedBoards = async () => {
    try {
      const response = await fetch(` /api/users/${userId}/boards/?role=member`);
      if (!response.ok) {
        throw new ApiError(response.statusText, response.status);
      } else {
        const data = await response.json();
        setJoinedBoards(data);
      }
    } catch (err) {
      setError(() => {
        throw new ApiError(err.message, err.statusCode);
      });
    }
  };

  const getMyBoards = async () => {
    try {
      const response = await fetch(` /api/users/${userId}/boards/created`);
      if (!response.ok) {
        throw new ApiError(response.statusText, response.status);
      } else {
        const data = await response.json();
        setMyBoards(data);
      }
    } catch (err) {
      setError(() => {
        throw new ApiError(err.message, err.statusCode);
      });
    }
  };
  useEffect(() => {
    (async () => {
      await getMyBoards();
      await getJoinedBoards();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        clickedBoardInfo,
        setclickedBoardInfo,
      }}
    >
      <div
        className={`profile-page-container ${
          modalVisibility ? 'board-overlay' : ''
        }`}
      >
        <div className="header">
          <HeaderComponent colored={true}>
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
                  <button type="button" onClick={signOut}>
                    Log out
                  </button>
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
            <PageTitle variant="black-large" title={userData.fullName} />
          </div>
        </div>
        <div className="users-boards-container">
          <TabSeparator />
          <div className="boards-container">
            <BoardSection />
          </div>
        </div>
        {modalVisibility && (
          <div>
            <DeleteBoardModal
              modalVisibility={modalVisibility}
              setModalVisibility={setModalVisibility}
              boardInfo={clickedBoardInfo}
            />
          </div>
        )}
      </div>
    </ProfilePropsProvider>
  );
}
