/* eslint-disable react/no-children-prop */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import BoardProvider from './containers/BoardPage/BoardProvider';
import ProfilePage from './containers/ProfilePage/ProfilePage.container';
import CreateBoard from './containers/CreateBoardPage/CreateBoardPage.container';
import Welcome from './containers/WelcomePage/WelcomePage.container';
import { useFirebase } from './firebase/FirebaseContext';
import EditedBoard from './containers/EditBoardPage/EditBoardPage.container';
import BoardPage from './containers/BoardPage/BoardPage.container';
import ResultPage from './containers/ResultPage/ResultPage.container';

function App() {
  const { isLoading, isAuthenticated } = useFirebase();

  return (
    <Router>
      <Switch>
        {/* Home page */}
        <Route exact path="/">
          <Welcome isAuthenticated={isAuthenticated} />
        </Route>
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
