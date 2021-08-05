import React from 'react';
import './WelcomePage.styles.css';

import background from '../../assets/images/pages-background/Login.svg';
import Button from '../../components/Button/Button.component';
import GoogleButton from '../../components/GoogleButton/GoogleButton.component';

export default function Welcome() {
  const onClick = () => {
    console.log('you clicked!');
  };
  return (
    <div className="sign-in-div">
      {/* <img
        src={background}
        className="welcome-background"
        alt="background blobs"
      /> */}
      <div className="welcome-slogan-container">
        <h1 className="welcome-slogan">Take Tough Decisions Together</h1>
      </div>
      <div className="sign-in-buttons">
        <GoogleButton className="google-button" />
        <Button
          className="generic-button"
          buttonLabel="Login"
          onClick={onClick}
          size="large"
          buttonColor="white"
          buttonBorder="purple-gradient"
          buttonLabelColor="purple"
        />
      </div>
    </div>
  );
}
