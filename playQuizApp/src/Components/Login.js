import React, { PureComponent } from 'react';
import {
  Provider,
  Button,
  Toast,
  Flex,
  Text,
  InputItem,
  WhiteSpace,
  List,
  Modal,
  ActivityIndicator
} from '@ant-design/react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';
import { auth } from '../firebase';
import { signin } from '../actions/users';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: 'saiem.saeed7@gmail.com',
      password: 'abc123',
      loading: false
    };
  }

  componentDidMount(nextProps) {
    // if (nextProps.users.loggedIn) {
    //   Actions.main();
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.loggedIn) {
      Actions.main();
    }
  }
  authenticate = () => {
    this.setState({ loading: true });
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        console.log(data);
        Modal.alert('LoggedIn', 'You are successfully loggedIn', [
          {
            text: 'OK',
            onPress: () => {
              Actions.main();
            }
          }
        ]);
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        Modal.alert('Error Loggin In', 'Email or Password provided is wrong', [
          { text: 'OK', onPress: () => console.log('ok') }
        ]);
        this.setState({ loading: false });
      });
  };

  render() {
    const { login: loginStyle } = styles;
    if (this.props.users.loggedIn == null) {
      return (
        <Flex
          justify="center"
          align="center"
          align="center"
          style={{ flex: 1 }}
        >
          <Flex.Item>
            <ActivityIndicator size="large" />
          </Flex.Item>
        </Flex>
      );
    }
    return (
      <Provider>
        {/* <Header text={'Login'} /> */}
        <View>
          <List>
            <InputItem
              clear
              value={this.state.email}
              onChange={value => {
                this.setState({ email: value });
              }}
              placeholder="Email"
            />
            <WhiteSpace size="lg" />
            <InputItem
              clear
              value={this.state.password}
              type="password"
              onChange={value => {
                this.setState({ password: value });
              }}
              placeholder="Password"
            />
          </List>

          <Button
            loading={this.state.loading}
            type="primary"
            style={loginStyle}
            onPress={this.authenticate}
            disabled={this.state.loading}
          >
            Login
          </Button>
          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />
          <Button
            type="primary"
            style={loginStyle}
            onPress={() => Actions.signup()}
            disabled={this.state.loading}
          >
            Signup
          </Button>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    marginLeft: 20,
    marginRight: 20
  }
});

const mapStateToProps = ({ users }) => ({ users });

const mapDispathToProps = dispatch => ({
  signin: (email, password) => dispatch(signin(email, password))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Login);
