import React, { useEffect, useState } from 'react';
import './WelcomePage.styles.css';
import GenericButton from '../../components/GenericButton/GenericButton.component';
import GoogleButton from '../../components/GoogleButton/GoogleButton.component';
import { useFirebase } from '../../firebase/FirebaseContext';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../firebase/UserContext';

export default function Welcome() {
  const [redirect, setRedirect] = useState();
  const { signIn } = useFirebase();
  const { user } = useUser();

  useEffect(() => {
    console.log('gets to here');
    if (user) {
      setRedirect('/profile');
    }
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="sign-in-container">
      <div className="welcome-slogan-container">
        <h1 className="welcome-slogan">Take Tough Decisions Together</h1>
      </div>
      <div className="sign-in-buttons-container">
        <GoogleButton className="google-button" onClickHandler={signIn} />
        <GenericButton
          className="generic-button"
          buttonLabel="Log in"
          buttonSize="large"
          buttonType="secondary"
          buttonDisabled={false}
          onClick={signIn}
        />
      </div>
    </div>
  );
}
