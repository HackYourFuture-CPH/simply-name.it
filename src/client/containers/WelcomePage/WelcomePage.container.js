import React, { useEffect, useState } from 'react';
import './WelcomePage.styles.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import GoogleButton from '../../components/GoogleButton/GoogleButton.component';
import { useFirebase } from '../../firebase/FirebaseContext';
import { Redirect } from 'react-router-dom';

export default function Welcome() {
  const [redirect, setRedirect] = useState();
  const { signIn, auth } = useFirebase();
  const [error, setError] = useState();

  useEffect(() => {
    async function addUser() {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch('/api/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setRedirect('/profile');
        const userData = await response.json();
        localStorage.setItem('id', userData);
      } else {
        setError(
          `Error adding user: ${response.status}. ${response.statusText}`,
        );
      }
    }

    addUser();
  }, [auth.currentUser]);

  const signInUser = async () => {
    await signIn();
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  if (error) {
    console.log(error);
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
