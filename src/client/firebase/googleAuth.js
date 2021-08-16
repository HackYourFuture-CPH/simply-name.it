import * as firebase from 'firebase/app';
import 'firebase/auth';

const googleProvider = new firebase.auth.GoogleAuthProvider();

/* eslint-disable no-alert */
function handleAuthErrors({ code, message }) {
  switch (code) {
    case FIREBASE_ERROR_CODES.WRONG_PASSWORD:
      return alert('Wrong password.');
    case FIREBASE_ERROR_CODES.WEAK_PASSWORD:
      return alert('Your password is too weak.');
    case FIREBASE_ERROR_CODES.INVALID_EMAIL:
      return alert(message);
    case FIREBASE_ERROR_CODES.USER_NOT_FOUND:
      return alert(message);

    default:
      return alert(message);
  }
}

const FIREBASE_ERROR_CODES = {
  WEAK_PASSWORD: 'auth/weak-password',
  WRONG_PASSWORD: 'auth/wrong-password',
  INVALID_EMAIL: 'auth/invalid-email',
  USER_NOT_FOUND: 'auth/user-not-found',
};

export async function signIn() {
  try {
    const googleAuth = await firebase.auth().signInWithPopup(googleProvider);
    return googleAuth;
  } catch (error) {
    handleAuthErrors(error);
  }
}

export function signOut() {
  firebase.auth().signOut();
}
