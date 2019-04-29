import { SIGNIN, SIGNOUT, CATEGORIES } from '../constants/ActionTypes';
import { auth, db, currentUser } from '../firebase';

export function signin(email, password) {
  return {
    type: SIGNIN,
    payload: auth.signInWithEmailAndPassword(email, password)
  };
}

export function signout() {
  return {
    type: SIGNOUT,
    payload: auth.signOut()
  };
}
