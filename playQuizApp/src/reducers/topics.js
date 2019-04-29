import {} from '../actions/users';

import { TOPICS, SUCCESS, FAILURE, REQUEST } from '../constants/ActionTypes';

const initalState = {
  loading: false,
  error: false,
  errorMessage: '',
  topics: [],
  unsubscribe: () => {}
};

export default (state = initalState, action) => {
  switch (action.type) {
    case `${TOPICS}${REQUEST}`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${TOPICS}${SUCCESS}`:
      return {
        ...state,
        loading: false,
        topics: action.topics,
        error: false,
        errorMessage: ''
      };
    case `${TOPICS}${FAILURE}`: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
      };
    }
    case `${TOPICS}_UNSUBSCRIBE`: {
      return {
        ...state,
        unsubscribe: action.unsubscribe
      };
    }
    default:
      return state;
  }
};
