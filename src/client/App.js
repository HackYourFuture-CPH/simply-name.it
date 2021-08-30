/* eslint-disable react/no-children-prop */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './containers/Home/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import ResetPassword from './containers/ResetPassword';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import Header from './components/Navigation/Header';
import ProfilePage from './containers/ProfilePage/ProfilePage.container';
import CreateBoard from './containers/CreateBoardPage/CreateBoardPage.container';
import Welcome from './containers/WelcomePage/WelcomePage.container';
import { useFirebase } from './firebase/FirebaseContext';
import EditedBoard from './containers/EditBoardPage/EditBoardPage.container';
import ResultPage from './containers/ResultPage/ResultPage.container';

function App() {
  const { isLoading, isAuthenticated } = useFirebase();

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
          exact
          path="/boards/new-board"
          children={
            <AuthenticatedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <CreateBoard />
            </AuthenticatedRoute>
          }
        />
        <Route
          exact
          path="/boards/:boardId/results"
          children={
            <AuthenticatedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <ResultPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          exact
          path="/boards/:boardId/edit-board"
          children={
            <AuthenticatedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <EditedBoard />
            </AuthenticatedRoute>
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
