/* eslint-disable react/button-has-type */
import React from 'react';
import { useFirebase } from '../../firebase/FirebaseContext';

export default function ProfilePage() {
  const { signOut } = useFirebase();
  return (
    <div>
      This is your private profilePage
      <button onClick={signOut}>sign out </button>
    </div>
  );
}
