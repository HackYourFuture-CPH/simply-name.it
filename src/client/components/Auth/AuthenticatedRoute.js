import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loader from '../Loader';
import { useFirebase } from '../../firebase/FirebaseContext';

function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated, isLoading } = useFirebase();
  if (isLoading) return <Loader />;
  return (
    <div>
      <Route
        // (we need to spread)
        {...rest} // eslint-disable-line
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/welcome',
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
};
