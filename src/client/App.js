import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './containers/Home/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import ResetPassword from './containers/ResetPassword';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import { useAuthentication } from './hooks/useAuthentication';
import Header from './components/Navigation/Header';
import ProfilePage from './containers/ProfilePage/ProfilePage.container';
import Loader from './components/Loader';
import CreateBoardPage from './containers/CreateBoardPage/CreateBoardPage.container';

function App() {
  const { isLoading } = useAuthentication();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Header />
      <Switch>
        {/* Home page */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* Anonymous pages */}
        <SignIn exact path="/sign-in" />
        <SignUp exact path="/sign-up" />
        <ResetPassword exact path="/reset-password" />
        <CreateBoardPage exact path="/new-board" />

        {/* All routes below are authenticated routes - a user must login first */}
        <AuthenticatedRoute exact path="/profile">
          <ProfilePage />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
}

export default App;
