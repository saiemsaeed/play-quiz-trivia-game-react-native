import { QUESTIONS, SUCCESS, FAILURE, REQUEST } from '../constants/ActionTypes';

const initalState = {
  loadingNext: false,
  error: false,
  errorMessage: '',
  question: {},
  topicId: '',
  topic: '',
  saving: false,
  correct: '',
  questionsAnswered: [],
  endGame: false,
  score: 0,
  timeLeft: 60
};

export default (state = initalState, action) => {
  switch (action.type) {
    case `${QUESTIONS}${REQUEST}`: {
      return {
        ...state,
        loadingNext: true
      };
    }
    case `${QUESTIONS}${SUCCESS}`:
      return {
        ...state,
        question: action.question,
        correct: '',
        error: false,
        errorMessage: '',
        loadingNext: false
      };
    case `${QUESTIONS}${FAILURE}`: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message,
        question: {},
        correct: ''
      };
    }
    case 'SET_TOPIC': {
      return {
        ...state,
        topicId: action.topicId,
        topic: action.topic
      };
    }
    case 'CHANGE_CORRECT': {
      return {
        ...state,
        correct: action.newCorrect
      };
    }
    case 'CHANGE_TIME': {
      return {
        ...state,
        timeLeft: state.timeLeft - 1
      };
    }
    case 'SAVE_ANSWER': {
      return {
        ...state,
        questionsAnswered: [
          ...state.questionsAnswered,
          action.questionAnswered
        ],
        score: action.answer === 'correct' ? state.score + 1 : state.score
      };
    }
    case 'GAME_END_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GAME_END_SUCCESS': {
      return {
        ...state,
        loading: false,
        endGame: true
      };
    }
    case 'RESET': {
      return {
        ...state,
        loadingNext: false,
        error: false,
        errorMessage: '',
        question: {},
        topicId: '',
        topic: '',
        saving: false,
        correct: '',
        questionsAnswered: [],
        endGame: false,
        score: 0,
        timeLeft: 60
      };
    }
    default:
      return state;
  }
};
