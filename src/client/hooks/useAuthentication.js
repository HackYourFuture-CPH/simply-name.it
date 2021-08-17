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
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });
  }, [auth]);

  return { isAuthenticated, isLoading };
}

export { useAuthentication };
