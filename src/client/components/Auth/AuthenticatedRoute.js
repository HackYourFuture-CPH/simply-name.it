import PropTypes from 'prop-types';
import React from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Redirect, Route } from 'react-router-dom';

function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated, isWorking } = useAuthentication();
  return (
    <div>
      {console.log(isAuthenticated, ' on router')}
      <Route
        // (we need to spread)
        {...rest} // eslint-disable-line
        render={({ location }) =>
          isWorking ? (
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
