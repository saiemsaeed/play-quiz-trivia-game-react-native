import {} from '../actions/users';

import { TOPICS, SUCCESS, FAILURE, REQUEST } from '../constants/ActionTypes';

const initalState = {
  loading: false,
  addLoading: false,
  error: false,
  errorMessage: '',
  topics: [],
  unsubscribe: () => {},
  newTopicDetails: {
    image: '',
    name: '',
    tagline: ''
  }
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
      console.log(action, '{}');
      return {
        ...state,
        unsubscribe: action.unsubscribe
      };
    }
    case `${TOPICS}_DELETE${REQUEST}`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${TOPICS}_DELETE${SUCCESS}`: {
      return {
        ...state,
        loading: false
      };
    }
    case `${TOPICS}_DELETE${FAILURE}`: {
      return {
        ...state,
        loading: false
      };
    }
    case `${TOPICS}_ADD${REQUEST}`: {
      return {
        ...state,
        addLoading: true
      };
    }
    case `${TOPICS}_ADD${SUCCESS}`: {
      return {
        ...state,
        addLoading: false
      };
    }
    case `${TOPICS}_ADD${FAILURE}`: {
      return {
        ...state,
        addLoading: false
      };
    }
    case `${TOPICS}_CHANGE_NEW_NAME`: {
      return {
        ...state,
        newCategoryName: action.newName
      };
    }
    default:
      return state;
  }
};
