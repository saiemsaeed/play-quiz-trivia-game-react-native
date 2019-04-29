import { combineReducers } from 'redux';
import users from './users';
import categories from './categories';
import topics from './topics';
import questions from './questions';

const reducers = {
  users,
  categories,
  topics,
  questions
};

export default combineReducers(reducers);
