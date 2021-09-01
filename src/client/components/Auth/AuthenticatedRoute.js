import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loader from '../Loader';
import { useUser } from '../../firebase/UserContext';

function AuthenticatedRoute({ children, isAuthenticated, isLoading }) {
  const { isFetching } = useUser();

  if (isLoading) return <Loader />;

  if (isAuthenticated && isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <Route
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
}

export default AuthenticatedRoute;

AuthenticatedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
