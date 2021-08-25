import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './containers/Home/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import ResetPassword from './containers/ResetPassword';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import BoardProvider from './containers/BoardPage/BoardProvider';
import ProfilePage from './containers/ProfilePage/ProfilePage.container';
import Welcome from './containers/WelcomePage/WelcomePage.container';
import { useFirebase } from './firebase/FirebaseContext';
import BoardPage from './containers/BoardPage/BoardPage.container';

function App() {
  const { isLoading, isAuthenticated } = useFirebase();

  return (
    <Router>
      <Switch>
        {/* Home page */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* Anonymous pages */}
        <SignIn exact path="/sign-in" />
        <SignUp exact path="/sign-up" />
        <ResetPassword exact path="/reset-password" />
        <Welcome exact path="/welcome" isAuthenticated={isAuthenticated} />

        {/* All routes below are authenticated routes - a user must login first */}
        <AuthenticatedRoute
          exact
          path="/profile"
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        >
          <ProfilePage />
        </AuthenticatedRoute>
        <Route
          path="/board/:boardId"
          // eslint-disable-next-line react/no-children-prop
          children={
            <AuthenticatedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <BoardProvider>
                <BoardPage />
              </BoardProvider>
            </AuthenticatedRoute>
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
