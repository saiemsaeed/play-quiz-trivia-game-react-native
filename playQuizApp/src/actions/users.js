import axios from 'axios';
import { SIGNIN, SIGNOUT, SIGNUP } from '../constants/ActionTypes';
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

// export function signup(email, password, name, gender) {
//   return {
//     type: SIGNUP,
//     payload: axios.post('/users', {
//       email,
//       password,
//       name,
//       gender,
//       displayPicture:
//         'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
//     })
//   };
// }
