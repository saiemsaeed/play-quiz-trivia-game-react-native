import React from 'react';
import { Flex, ActivityIndicator } from '@ant-design/react-native';
import { Scene, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Topics from './Components/Topics';
import Questions from './Components/Questions';
import Login from './Components/Login';
import Categories from './Components/Categories';
import { signout } from './actions/users';
import Signup from './Components/Signup';

const ReduxRouter = props => {
  console.log(props.users);

  if (props.users.loggedIn == null) {
    return (
      <Flex justify="center" align="center" align="center" style={{ flex: 1 }}>
        <Flex.Item>
          <ActivityIndicator size="large" />
        </Flex.Item>
      </Flex>
    );
  } else if (props.users.loggedIn === false) {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="auth">
            <Scene key="login" component={Login} title="Login" />
            <Scene key="signup" component={Signup} title="Sign Up" />
          </Scene>
        </Scene>
      </Router>
    );
  } else if (props.users.loggedIn === true) {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="main">
            <Scene
              rightTitle="Logout"
              onRight={() => props.signout()}
              key="categories"
              component={Categories}
              title="Select Category"
            />
            <Scene key="topics" component={Topics} title="Select Topic" />
            <Scene key="questions" component={Questions} title="Game On Hai" />
          </Scene>
        </Scene>
      </Router>
    );
  }
};

const mapStateToProps = ({ users }) => ({
  users
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxRouter);
