import { combineReducers } from 'redux';
import users from './users';
import categories from './categories';
import topics from './topics';
import questions from './questions';
import scores from './scores';

const reducers = {
  users,
  categories,
  topics,
  questions,
  scores
};

export default combineReducers(reducers);
