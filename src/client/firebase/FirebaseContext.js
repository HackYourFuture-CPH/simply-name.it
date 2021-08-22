import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { signIn, signOut, getUserToken } from './googleAuth';
import { auth } from './configure';

const FirebaseContext = createContext();

export function FirebaseProvider({ children, initialAuth }) {
  const [authUser, setAuthUser] = useState(initialAuth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // default is loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      return;
    }

    if (!auth) {
      setIsLoading(false);
      return;
    }
    auth.onAuthStateChanged((user) => {
      // if user exists it means authenticated
      if (user) {
        setIsAuthenticated(true);
        setIsLoading(false);
        setAuthUser(() => {
          return {
            fullName: user.displayName,
            email: user.email,
            firebaseUId: user.uid,
            profilePicture: user.photoURL,
          };
        });
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
        setAuthUser(null);
      }
    });
  }, [authUser]);

  const value = useMemo(
    () => ({
      authUser,
      isAuthenticated,
      isLoading,
      getUserToken,
      isInitialized: !!auth,
      signIn: () => signIn(),
      signOut: () => signOut(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser, isLoading],
  );

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // This time we know what we are doing :)
  // eslint-disable-next-line react/forbid-prop-types
  initialAuth: PropTypes.object,
};

FirebaseProvider.defaultProps = {
  initialAuth: null,
};

/**
 * Gets the current value for FirebaseContext
 *
 * @typedef {object} FirebaseContextType
 * @property {object} authUser - Passes the info of the user
 * @property {boolean} isAuthenticated True when user is authenticated
 * @property {boolean} isLoading - False when authentication ends
 * @property {() => Promise<void>} getUserToken - gets the user token
 * @property {boolean} isInitialized - True if Firebase is initialized
 * @property {() => Promise<void>} signIn - Signs in the user
 * @property {() => Promise<void>} signOut - Signs out the user
 *
 * @returns {FirebaseContextType}
 */
export function useFirebase() {
  const firebase = useContext(FirebaseContext);

  if (!firebase) {
    throw new Error('This component must be under FirebaseProvider');
  }

  return firebase;
}
