import { useEffect, useState } from 'react';
import { useFirebase } from '../firebase/FirebaseContext';

/**
 * Docs: https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
function useAuthentication() {
  // default not authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // default is loading
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useFirebase();
  let isWorking = true;

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    auth.onAuthStateChanged(async (user) => {
      // if user exists it means authenticated
      if (user) {
        console.log('auth works and user exists on auth hook');
        setIsAuthenticated(true);
        setIsLoading(false);
        return isWorking;
        // eslint-disable-next-line no-else-return
      } else {
        console.log('now there is no user on auth');
        setIsAuthenticated(false);
        setIsLoading(false);
        // eslint-disable-next-line no-return-assign
        return (isWorking = false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return { isAuthenticated, isLoading, isWorking };
}

export { useAuthentication };
