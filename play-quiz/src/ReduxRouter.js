import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Login from './pages/Login';
import AuthRoute from './hoc/AuthRoute';
import Dashboard from './pages/Dashboard';
import { Spin } from 'antd';

const history = createHistory();

const ReduxRouter = props => {
  if (props.users.loggedIn == null) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          height: '100vh'
        }}
      >
        <Spin size="large" />
      </div>
    );
  } else if (props.users.loggedIn == false) {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect from="/:anything" to="/" />
        </Switch>
      </Router>
    );
  }
  return (
    <Router history={history}>
      <Switch>
        <AuthRoute path="/" component={Dashboard} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(
  mapStateToProps,
  null
)(ReduxRouter);
