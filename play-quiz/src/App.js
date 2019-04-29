import React from 'react';
import './App.css';
import axios from 'axios';
import { createPromise } from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import 'antd/dist/antd.css';
import { registerAuthChange } from './firebase';
import ReduxRouter from './ReduxRouter';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.baseURL =
  'https://us-central1-playquiz-1337.cloudfunctions.net/api/';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunk,
      createPromise({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
      }),
      logger
    )
  )
);

registerAuthChange(store);

function App() {
  return (
    <Provider store={store}>
      <ReduxRouter />
    </Provider>
  );
}

export default App;
