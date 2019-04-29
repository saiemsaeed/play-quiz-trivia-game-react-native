import {} from '../actions/users';

import {
  CATEGORIES,
  SUCCESS,
  FAILURE,
  REQUEST
} from '../constants/ActionTypes';

const initalState = {
  loading: false,
  error: false,
  errorMessage: '',
  categories: [],
  unsubscribe: () => {}
};

export default (state = initalState, action) => {
  switch (action.type) {
    case `${CATEGORIES}${REQUEST}`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${CATEGORIES}${SUCCESS}`:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: false,
        errorMessage: ''
      };
    case `${CATEGORIES}${FAILURE}`: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
      };
    }
    case `${CATEGORIES}_UNSUBSCRIBE`: {
      return {
        ...state,
        unsubscribe: action.unsubscribe
      };
    }
    default:
      return state;
  }
};
