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
    [authUser],
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
 * @property {firebase.auth.Auth} auth - Firebase auth provider
 * @property {boolean} isInitialized - True if Firebase is initialized
 * @property {({email, password}) => Promise<void>} signIn - Signs in the user
 * @property {({email, password}) => Promise<void>} signUp - Signs in the user
 * @property {() => Promise<void>} signOut - Signs out the user
 * @property {({email}) => Promise<void>} resetPassword - Resets the password for the user with the specified e-mail
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
