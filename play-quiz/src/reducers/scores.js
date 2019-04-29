import {} from '../actions/users';

import { SCORE, SUCCESS, FAILURE, REQUEST } from '../constants/ActionTypes';

const initalState = {
  loading: false,
  error: false,
  errorMessage: '',
  scores: [],
  unsubscribe: () => {}
};

export default (state = initalState, action) => {
  switch (action.type) {
    case `${SCORE}${REQUEST}`: {
      return {
        ...state,
        loading: true,
        scores: []
      };
    }
    case `${SCORE}${SUCCESS}`:
      return {
        ...state,
        loading: false,
        scores: action.scores.map(({ name, score }) => ({
          name,
          score
        })),
        error: false,
        errorMessage: ''
      };
    case `${SCORE}${FAILURE}`: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
      };
    }
    case `${SCORE}_UNSUBSCRIBE`: {
      console.log(action, '{}');
      return {
        ...state,
        unsubscribe: action.unsubscribe
      };
    }
    default:
      return state;
  }
};
