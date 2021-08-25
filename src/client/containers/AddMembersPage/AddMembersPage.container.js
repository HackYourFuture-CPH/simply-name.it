import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './AddMembersPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';

export default function AddMembers({ members, addMember, toggleShowMembers }) {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const membersSet = new Set(members);

  let APIurl = `/api/users/search?fullName=${searchInput}`;

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleArrowButton = () => {
    toggleShowMembers();
  };

  const handleAddButton = (id) => {
    addMember(id);
  };

  const handleAddedButton = (name) => {
    alert(`${name} is already added!`);
  };
  const cleanUp = (id) => {
    clearTimeout(id);
  };

  useEffect(() => {
    setLoading(true);

    const id = setTimeout(async () => {
      searchInput === ''
        ? (APIurl = `/api/users`)
        : (APIurl = `/api/users/search?fullName=${searchInput}`);
      try {
        const result = await fetch(APIurl);
        const fetchedData = await result.json();
        setUsers(fetchedData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => cleanUp(id);
  }, [searchInput]);

  return (
    <div className="AddMembers-container">
      <div className="arrow-button">
        <ArrowButton color="black" onClick={() => handleArrowButton()} />
      </div>

      <div className="add-members-title">
        <PageTitle title="Add members" variant="black-large" />
      </div>

      <div className="search-container">
        <div className="search-input">
          <input
            placeholder="search..."
            value={searchInput}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
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
                  return (
                    <div className="users-list-item" key={user.id}>
                      <UserProfilePicture
                        size="small"
                        profilePictureLink="https://picsum.photos/seed/picsum/200/300"
                      />
                      <p>{user.fullname}</p>
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
                          onClick={() => handleAddedButton(user.fullname)}
                        />
                      )}
                    </div>
                  );
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
  members: PropTypes.array,
};
