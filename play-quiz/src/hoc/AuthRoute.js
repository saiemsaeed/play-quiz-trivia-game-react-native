import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated, 'IS?');
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = ({ users }) => ({
  isAuthenticated: users.currentUser ? true : false
});

export default connect(
  mapStateToProps,
  null
)(AuthRoute);
