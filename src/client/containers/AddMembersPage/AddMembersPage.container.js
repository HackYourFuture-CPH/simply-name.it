import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useHistory, useParams, useLocation } from 'react-router-dom';

import './AddMembersPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';

export default function AddMembers({
  members,
  updateMembers,
  toggleShowMembers,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  // const [addButton, setAddButton] = useState(false);
  const membersSet = new Set(members);
  console.log(membersSet);
  console.log(members);

  let APIurl = `/api/users/search?fullName=${searchInput}`;

  // const changeButtonAvail = () => {
  //   setAddButton(!addButton);
  // };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleArrowButton = () => {
    toggleShowMembers();
  };

  const handleAddButton = (id) => {
    updateMembers(id);
  };

  const cleanUp = (id) => {
    clearTimeout(id);
  };

  useEffect(() => {
    setLoading(true);

    const id = setTimeout(async () => {
      try {
        searchInput === ''
          ? (APIurl = `/api/users`)
          : (APIurl = `/api/users/search?fullName=${searchInput}`);
        const result = await fetch(APIurl);
        const fetchedData = await result.json();
        result.ok ? setUsers(fetchedData) : setUsers([]);

        setLoading(false);
      } catch (error) {
        error = JSON.parse(JSON.stringify(error));
        console.log(error);
      }
    }, 1500);

    return () => cleanUp(id);
  }, [searchInput]);

  return (
    <div className="AddMembers-container">
      <ArrowButton color="black" onClick={() => handleArrowButton()} />
      <PageTitle title={'Add members'} variant={'black'} />
      <div className="search-container">
        <div className="search-input">
          <input
            value={searchInput}
            onChange={(e) => {
              handleInput(e);
            }}
          ></input>
        </div>
      </div>
      <div className="users-list-container">
        {loading && <p>loading....</p>}
        {!loading && (
          <>
            {(users.length === 0 || !Array.isArray(users)) && // is Array does not work
            searchInput != '' ? (
              <p>Nothing found :(</p>
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
                          onClick={() => handleAddButton(user.id)}
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
  updateMembers: PropTypes.func.isRequired,
  toggleShowMembers: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
};
