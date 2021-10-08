// eslint-disable-next-line max-classes-per-file
import React from 'react';
import PropTypes from 'prop-types';
import Error404Page from './containers/404Page/404Page.container';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorType: error };
  }

  render() {
    if (this.state.hasError) {
      if (this.state.errorType instanceof ApiError) {
        if (this.state.errorType.statusCode === 404) {
          return <Error404Page />;
        }
        if (this.state.errorType.statusCode === 403) {
          // return 403 component
        }
        if (this.state.errorType.statusCode === 400) {
          // return 400 component
        }
        if (this.state.errorType.statusCode === 500) {
          // return 500 component
        }
        return <h1>Oops..Something went wrong while requesting the data</h1>;
      }
      return <h1>Uh-oh! Cannot render app, check console.</h1>;
    }
    return this.props.children;
  }
}

export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = `Oops. Something went wrong while requesting the data  ${message}`;
    this.statusCode = statusCode;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
