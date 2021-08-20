import React from 'react';
import { Link } from 'react-router-dom';

import { useFirebase } from '../../firebase/FirebaseContext';

export default function Header() {
  const { signOut, isAuthenticated } = useFirebase();

  if (isAuthenticated) {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign in</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign up</Link>
        </li>
        <li>
          <Link to="/reset-password">Reset password</Link>
        </li>
      </ul>
    </nav>
  );
}
