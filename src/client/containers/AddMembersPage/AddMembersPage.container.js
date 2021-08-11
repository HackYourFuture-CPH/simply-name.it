import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './AddMembersPage.styles.css';

import Error404Page from '../404Page/404Page.container';
import PageTitle from '../../components/PageTitle/PageTitle.component';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import InputComponent from '../../components/InputComponent/InputComponent';
import UserProfilePicture from '../../components/UserProfilePicture/UserProfilePicture.component';

export default function AddMembers() {
  const [searchInput, setSearchInput] = useState('_');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  const history = useHistory();

  const onClick = () => {
    const path = '/create-board';
    history.push(path);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('/api/users/')
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => {
  //       setUsers(data);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setError(e);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const handleInput = (e) => {
    console.log(searchInput);
    searchInput === '' ? setSearchInput('_') : setSearchInput(e.target.value);
  };

  const cleanUp = (id) => {
    clearTimeout(id);
  };

  useEffect(() => {
    setLoading(true);
    // debouncing
    const id = setTimeout(async () => {
      try {
        const result = await fetch(`/api/users/search?fullName=${searchInput}`);
        const fetchedData = await result.json();
        result.ok ? setUsers(fetchedData) : setUsers([]);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }, 2000);

    return () => cleanUp(id);
  }, [searchInput]);

  return (
    <div className="AddMembers-container">
      {error ? (
        <Error404Page />
      ) : (
        <>
          <div>
            <button onClick={onClick}>arrow button</button>
          </div>
          <PageTitle title={'Add members'} variant={'black-large'} />
          <div className="search-container">
            <div className="search-input">
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
              ></input>
              <InputComponent
                placeholder="Search"
                borderShape="round"
                theme="light"
                showSearchIcon={true}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="search-button">
              <GenericButton
                buttonLabel="&#128269;"
                buttonSize="small"
                buttonType="primary"
                buttonDisabled={false}
                onClick={console.log('searching')}
              />
            </div>
          </div>
          <div className="users-list-container">
            {loading && <p>loading....</p>}
            {!loading && (
              <>
                {users.length === 0 ? (
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
                            buttonDisabled={false}
                            onClick={() => console.log('you clicked!')}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
