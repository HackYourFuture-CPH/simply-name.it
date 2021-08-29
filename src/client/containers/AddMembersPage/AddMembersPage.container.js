import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './AddMembersPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';
import InputComponent from '../../components/InputComponent/InputComponent.js';
export default function AddMembers({
  members,
  addMember,
  userId,
  toggleShowMembers,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const membersSet = new Set(members);

  const handleArrowButton = () => {
    toggleShowMembers();
  };

  const handleAddButton = (id) => {
    addMember(id);
  };

  const cleanUp = (id) => {
    clearTimeout(id);
  };

  useEffect(() => {
    setLoading(true);

    const APIurl =
      searchInput === ''
        ? `/api/users`
        : `/api/users/search?fullName=${searchInput}`;
    const id = setTimeout(async () => {
      try {
        const result = await fetch(APIurl);
        const fetchedData = await result.json();
        setUsers(fetchedData);
      } catch (error) {
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => cleanUp(id);
  }, [searchInput]);

  const renderUser = (user) => {
    if (user.id !== userId) {
      return (
        <div className="users-list-item" key={user.id}>
          <UserProfilePicture
            size="small"
            profilePictureLink="https://picsum.photos/seed/picsum/200/300"
          />
          <p>{user.fullName}</p>
          {!membersSet.has(user.id) ? (
            <GenericButton
              buttonLabel="add"
              buttonSize="small"
              buttonType="secondary"
              buttonDisabled={false}
              onClick={() => handleAddButton(user.id)}
            />
          ) : (
            <GenericButton
              buttonLabel="added"
              buttonSize="small"
              buttonType="secondary"
              buttonDisabled={true}
              onClick={() => ''}
            />
          )}
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className="add-members-container">
      <div className="arrow-button">
        <ArrowButton color="black" onClick={() => handleArrowButton()} />
      </div>

      <div className="add-members-title">
        <PageTitle title="Add members" variant="black-large" />
      </div>

      <div className="members-search-container">
        <InputComponent
          placeholder="Search"
          borderShape="round"
          theme="light"
          inputValue={searchInput}
          showSearchIcon={true}
          onChange={(e) => {
            setSearchInput(e);
          }}
        />
      </div>
      <div className="users-list-container">
        {loading && <p className="loading-text">loading....</p>}
        {!loading && (
          <>
            {users.length === 0 && searchInput !== '' ? (
              <p className="nothing-found-text">...nothing found :(</p>
            ) : (
              <>
                {users.map((user) => {
                  return renderUser(user);
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

AddMembers.propTypes = {
  addMember: PropTypes.func.isRequired,
  toggleShowMembers: PropTypes.func.isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
};
