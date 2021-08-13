import PropTypes from 'prop-types';
import React from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Redirect, Route } from 'react-router-dom';

function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuthentication();
  return (
    <div>
      {console.log(isAuthenticated, ' on router')}
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
