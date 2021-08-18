import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFirebase } from './FirebaseContext';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { isAuthenticated, getUserToken, authUser } = useFirebase();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function addUser() {
      const token = await getUserToken();
      const response = await fetch('/api/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(authUser),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setError(
          `Error adding user: ${response.status}. ${response.statusText}`,
        );
      }
    }

    if (isAuthenticated) {
      console.log('authenticated');
      addUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUser() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('This component must be under UserProvider');
  }

  return user;
}
