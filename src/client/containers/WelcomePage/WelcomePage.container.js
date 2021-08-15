import React, { useState } from 'react';
import './WelcomePage.styles.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import GoogleButton from '../../components/GoogleButton/GoogleButton.component';
import { useFirebase } from '../../firebase/FirebaseContext';
import { Redirect } from 'react-router-dom';

export default function Welcome() {
  const [redirect, setRedirect] = useState();
  const { signIn } = useFirebase();

  function addUser(user) {
    (async () => {
      await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    })();
  }

  const signInUser = async () => {
    const user = await signIn();
    if (user) {
      addUser(user);
    }
    setRedirect('/profile');
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <div className="sign-in-container">
      <div className="welcome-slogan-container">
        <h1 className="welcome-slogan">Take Tough Decisions Together</h1>
      </div>
      <div className="sign-in-buttons-container">
        <GoogleButton className="google-button" onClickHandler={signInUser} />
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
