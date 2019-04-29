import {} from '../actions/users';

import { QUESTIONS, SUCCESS, FAILURE, REQUEST } from '../constants/ActionTypes';
import { string } from 'prop-types';

const initalState = {
  loading: false,
  addLoading: false,
  error: false,
  errorMessage: '',
  questions: [],
  topicId: '',
  topic: '',
  unsubscribe: () => {},
  newQuestionDetails: {
    text: '',
    answers: [],
    correct: ''
  }
};

export default (state = initalState, action) => {
  switch (action.type) {
    case `${QUESTIONS}${REQUEST}`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${QUESTIONS}${SUCCESS}`:
      return {
        ...state,
        loading: false,
        questions: action.payload.map(({ text, answers }) => ({
          text,
          option1: answers[0],
          option2: answers[1],
          option3: answers[2],
          option4: answers[3]
        })),
        error: false,
        errorMessage: ''
      };
    case `${QUESTIONS}${FAILURE}`: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
      };
    }
    case `${QUESTIONS}_UNSUBSCRIBE`: {
      console.log(action, '{}');
      return {
        ...state,
        unsubscribe: action.unsubscribe
      };
    }
    case `${QUESTIONS}_DELETE${REQUEST}`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${QUESTIONS}_DELETE${SUCCESS}`: {
      return {
        ...state,
        loading: false
      };
    }
    case `${QUESTIONS}_DELETE${FAILURE}`: {
      return {
        ...state,
        loading: false
      };
    }
    case `${QUESTIONS}_ADD${REQUEST}`: {
      return {
        ...state,
        addLoading: true
      };
    }
    case `${QUESTIONS}_ADD${SUCCESS}`: {
      return {
        ...state,
        addLoading: false,
        newQuestionDetails: {}
      };
    }
    case `${QUESTIONS}_ADD${FAILURE}`: {
      return {
        ...state,
        addLoading: false
      };
    }
    default:
      return state;
  }
};
