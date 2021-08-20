import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './AddMembersPage.styles.css';

import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import InputComponent from '../../components/InputComponent/InputComponent';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';

export default function AddMembers() {
  const members = new Set();
  const [membersState, setmembersState] = useState(new Set());
  const [searchInput, setSearchInput] = useState('_');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [addButton, setAddButton] = useState(false);
  const [dummy, setDummy] = useState('initial dummy');

  const history = useHistory();

  let APIurl = `/api/users/search?fullName=${searchInput}`;

  const changeButtonAvail = () => {
    setAddButton(!addButton);
  };

  const goToBoard = () => {
    const path = '/create-board';
    history.push(path);
  };

  x;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleInput = (e) => {
    console.log(searchInput);
    setSearchInput(e.target.value);
  };

  const handleButtonClick = (id) => {
    console.log('you clicked!');
    console.log(id);
    changeButtonAvail();
    members.add(id);
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
    }, 2000);

    return () => cleanUp(id);
  }, [searchInput]);

  return (
    <div className="AddMembers-container">
      <div>
        <button onClick={goToBoard}>arrow button</button>
      </div>
      <PageTitle title={'Add members'} variant={'black'} />
      <div className="search-container">
        <div className="search-input">
          <input
            onChange={(e) => {
              handleInput(e);
            }}
          ></input>
          {/* <InputComponent
                placeholder="Search"
                borderShape="round"
                theme="light"
                showSearchIcon={true}
                onChange={(e) => {
                  handleInput(e);
                }}
              /> */}
        </div>
        {/* <div className="search-button">
              <GenericButton
                buttonLabel="&#128269;"
                buttonSize="small"
                buttonType="primary"
                buttonDisabled={false}
                onClick={console.log('searching')}
              />
            </div> */}
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
