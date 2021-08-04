import React from 'react';
import './404Page.styles.css';
import error from '../../assets/images/error.svg';

function Error404Page() {
  return (
    <div className="center-container">
      <img src={error} className="error404" alt="error404" />

      <div className="main-text">
        <h2>Page not found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
      </div>
    </div>
  );
}

export default Error404Page;
