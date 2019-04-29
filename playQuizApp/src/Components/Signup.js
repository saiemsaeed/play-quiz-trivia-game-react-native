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
  ActivityIndicator,
  Radio
} from '@ant-design/react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';
import { auth } from '../firebase';
import { signup } from '../actions/users';

const RadioItem = Radio.RadioItem;

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      gender: '',
      name: '',
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
    axios
      .post('/users', {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        gender: this.state.gender,
        displayPicture:
          'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
      })
      .then(data => {
        console.log(data);
        Modal.alert('Signed Up', 'You are successfully Signed Up', [
          {
            text: 'OK',
            onPress: () => {
              Actions.login();
            }
          }
        ]);
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        Modal.alert('Error Signing Up', 'Email or Password provided is wrong', [
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
          <InputItem
            clear
            value={this.state.name}
            type="text"
            onChange={value => {
              this.setState({ name: value });
            }}
            placeholder="Name"
          />
          <Text style={{ marginTop: 12, fontSize: 16, paddingLeft: 12 }}>
            Gender
          </Text>
          <RadioItem
            checked={this.state.gender === 'male'}
            onChange={event => {
              if (event.target.checked) {
                this.setState({ gender: 'male' });
              }
            }}
          >
            Male
          </RadioItem>
          <RadioItem
            checked={this.state.gender === 'female'}
            onChange={event => {
              if (event.target.checked) {
                this.setState({ gender: 'female' });
              }
            }}
          >
            Female
          </RadioItem>
        </List>
        <Button
          loading={this.state.loading}
          type="primary"
          style={loginStyle}
          onPress={this.authenticate}
          disabled={this.state.loading}
        >
          Signup
        </Button>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <Button
          loading={this.state.loading}
          type="primary"
          style={loginStyle}
          onPress={() => Actions.pop()}
          disabled={this.state.loading}
        >
          Login
        </Button>
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
  signup: (email, password, name, gender) =>
    dispatch(signup(email, password, name, gender))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Login);
