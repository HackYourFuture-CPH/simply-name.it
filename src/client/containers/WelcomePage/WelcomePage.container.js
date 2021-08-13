import React, { useState } from 'react';
import './WelcomePage.styles.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import GoogleButton from '../../components/GoogleButton/GoogleButton.component';
import { useFirebase } from '../../firebase/FirebaseContext';
import { Redirect } from 'react-router-dom';

export default function Welcome() {
  const [redirect, setRedirect] = useState();
  const [userProfile, setUserProfile] = useState();
  const { signIn } = useFirebase();

  const onClick = () => {
    console.log('?');
  };

  const signInUser = async () => {
    console.log('google clicked');
    const userData = await signIn();
    console.log(userData.user.uid, userData.user.displayName);
    setUserProfile(() => {
      return {
        userFirebase: userData.user.uid,
        userName: userData.user.displayName,
      };
    });
    setRedirect('/profile');
  };
  console.log(userProfile);

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div className="sign-in-container">
      <div className="welcome-slogan-container">
        <h1 className="welcome-slogan">Take Tough Decisions Together</h1>
      </div>
      <div className="sign-in-buttons-container">
        <GoogleButton className="google-button" onClick={onClick} />
        <GenericButton
          className="generic-button"
          buttonLabel="Log in"
          buttonSize="large"
          buttonType="secondary"
          buttonDisabled={false}
          onClick={signInUser}
        />
      </div>
    </div>
  );
}
