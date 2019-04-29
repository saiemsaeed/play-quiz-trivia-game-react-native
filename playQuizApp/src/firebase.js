import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCX6WpRZ6f8jrQdn-KczAa2Lij8DKPJSoE',
  authDomain: 'playquiz-1337.firebaseapp.com',
  databaseURL: 'https://playquiz-1337.firebaseio.com',
  projectId: 'playquiz-1337',
  storageBucket: 'playquiz-1337.appspot.com',
  messagingSenderId: '473398173292'
};

const app = firebaseApp.initializeApp(config, 'playquiz-1337');

const auth = app.auth();
const functions = app.functions();
const db = app.firestore();
const storage = app.storage();

const currentUser = auth.currentUser;

function registerAuthChange(store) {
  auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch({
        type: 'SIGNIN_SUCCESS',
        payload: user
      });
    } else {
      store.dispatch({
        type: 'SIGNOUT_SUCCESS'
      });
    }
  });
}

export { auth, functions, db, storage, registerAuthChange, currentUser };
