// eslint-disable-next-line max-classes-per-file
import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error instanceof ApiError);
    return { hasError: true, errorType: error };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Uh-oh! Cannot render app, check console.</h1>;
    }

    return this.props.children;
  }
}

export class ApiError extends Error {
  constructor(message) {
    super(message);
    this.message = `Oops. Something went wrong while requesting the data  ${message}`;
  }

  render() {
    return this.message;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
