import {} from '../actions/users';

import {
  CATEGORIES,
  SUCCESS,
  FAILURE,
  REQUEST
} from '../constants/ActionTypes';

const initalState = {
  loading: false,
  addLoading: false,
  error: false,
  errorMessage: '',
  categories: [],
  unsubscribe: () => {},
  newCategoryName: ''
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
      console.log(action, '{}');
      return {
        ...state,
        unsubscribe: action.unsubscribe
      };
    }
    case `${CATEGORIES}_DELETE${REQUEST}`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${CATEGORIES}_DELETE${SUCCESS}`: {
      return {
        ...state,
        loading: false
      };
    }
    case `${CATEGORIES}_DELETE${FAILURE}`: {
      return {
        ...state,
        loading: false
      };
    }
    case `${CATEGORIES}_ADD${REQUEST}`: {
      return {
        ...state,
        addLoading: true
      };
    }
    case `${CATEGORIES}_ADD${SUCCESS}`: {
      return {
        ...state,
        addLoading: false
      };
    }
    case `${CATEGORIES}_ADD${FAILURE}`: {
      return {
        ...state,
        addLoading: false
      };
    }
    case `${CATEGORIES}_CHANGE_NEW_NAME`: {
      return {
        ...state,
        newCategoryName: action.newName
      };
    }
    default:
      return state;
  }
};
