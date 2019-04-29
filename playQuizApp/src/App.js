import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import logger from 'redux-logger';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { createPromise } from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import { registerAuthChange } from './firebase';

import ReduxRouter from './ReduxRouter';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu'
// });

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

// type Props = {};
export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    );
  }
}
