import React, { useState, useEffect } from 'react';

import { useHistory, useParams, useLocation } from 'react-router-dom';

import './AddMembersPage.styles.css';
import ArrowButton from '../../components/ArrowButton/ArrowButton.component';

import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import InputComponent from '../../components/InputComponent/InputComponent';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';

export default function AddMembers() {
  const location = useLocation();
  console.log(location);
  const { members, updateMembers } = useParams();
  //const [membersState, setmembersState] = useState(new Set());
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [addButton, setAddButton] = useState(false);

  const history = useHistory();

  let APIurl = `/api/users/search?fullName=${searchInput}`;

  const changeButtonAvail = () => {
    setAddButton(!addButton);
  };

  const goToBoard = () => {
    const path = '/create-board';
    history.push(path);
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleButtonClick = (id) => {
    console.log('you clicked!');
    console.log(id);
    //updateMembers(id);
    //members.add(id);
    //changeButtonAvail();
    console.log(members);
  };

  const cleanUp = (id) => {
    clearTimeout(id);
  };

  useEffect(() => {
    setLoading(true);
    // debouncing

    const id = setTimeout(async () => {
      try {
        searchInput === ''
          ? (APIurl = `/api/users`)
          : (APIurl = `/api/users/search?fullName=${searchInput}`);
        const result = await fetch(APIurl);
        const fetchedData = await result.json();
        console.log(fetchedData);
        console.log('is array', Array.isArray(fetchedData));
        console.log(result.ok);
        result.ok && Array.isArray(fetchedData)
          ? setUsers(fetchedData)
          : setUsers([]);
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
      <ArrowButton color="black" onClick={goToBoard} />
      <PageTitle title={'Add members'} variant={'black'} />
      <div className="search-container">
        <div className="search-input">
          <input
            onChange={(e) => {
              handleInput(e);
            }}
          ></input>
          <InputComponent
            inputValue={}
            placeholder="Search"
            borderShape="round"
            theme="light"
            showSearchIcon={true}
            onChange={(e) => {
              handleInput(e);
            }}
          />
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
                      <GenericButton
                        buttonLabel="Add"
                        buttonSize="small"
                        buttonType="secondary"
                        buttonDisabled={addButton}
                        onClick={() => handleButtonClick(user.id)}
                      />
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
