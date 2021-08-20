import React from 'react';

import App from './App';
import { ErrorBoundary } from './ErrorBoundary';
import { FirebaseProvider } from './firebase';
import { UserProvider } from './firebase/UserContext';

function AppContainer() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </FirebaseProvider>
    </ErrorBoundary>
  );
}

export default AppContainer;
