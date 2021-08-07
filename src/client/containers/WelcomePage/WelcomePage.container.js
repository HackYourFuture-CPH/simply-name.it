import React from 'react';
import './WelcomePage.styles.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import GoogleButton from '../../components/GoogleButton/GoogleButton.component';

export default function Welcome() {
  const onClick = () => {
    console.log('you clicked!');
  };
  return (
    <div className="sign-in-container">
      <div className="welcome-slogan-container">
        <h1 className="welcome-slogan">Take Tough Decisions Together</h1>
      </div>
      <div className="sign-in-buttons">
        <GoogleButton className="google-button" />
        <GenericButton
          className="generic-button"
          buttonLabel="Log in"
          buttonSize="large"
          buttonType="secondary"
          buttonDisabled={false}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
