import {} from '../actions/users';

import {
  SIGNOUT,
  SIGNIN,
  SIGNUP,
  SUCCESS,
  FAILURE,
  REQUEST
} from '../constants/ActionTypes';

const initalState = {
  loggedIn: null,
  currentUser: null,
  loading: false,
  error: false,
  errorMessage: ''
};

export default (state = initalState, action) => {
  switch (action.type) {
    case `${SIGNIN}${REQUEST}`: {
      console.log(action, 'ac');
      return {
        ...state,
        loading: true,
        currentUser: null,
        loggedIn: false
      };
    }
    case `${SIGNIN}${SUCCESS}`:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: false,
        errorMessage: '',
        loggedIn: true
      };
    case `${SIGNIN}${FAILURE}`: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
        currentUser: null,
        loggedIn: false
      };
    }
    case `${SIGNUP}${REQUEST}`:
      return {
        ...state,
        loading: true
      };
    case `${SIGNUP}${SUCCESS}`:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: ''
      };
    case `${SIGNUP}${FAILURE}`:
      return {
        ...state,
        loading: false
      };
    case `${SIGNOUT}${REQUEST}`:
      return {
        ...state,
        loading: true
      };
    case `${SIGNOUT}${SUCCESS}`:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: false,
        errorMessage: '',
        loggedIn: false
      };
    case `${SIGNOUT}${FAILURE}`:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
};
