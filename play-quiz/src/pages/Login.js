import React, { PureComponent } from 'react';
import { Row, Col, Typography, Form, Input, Button, Alert } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm/loginForm';
import { signin, signout } from '../actions/users';

class Login extends PureComponent {
  // submitForm(e) {
  //   const { dispatch } = this.props;

  //   e.preventDefault();
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       dispatch({
  //         type: 'SEND_LOGIN_DATA',
  //         payload: {
  //           ...values
  //         }
  //       });
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'RESET_LOGIN'
  //   });
  // }

  // componentDidUpdate() {
  //   if (this.props.user.currentUser !== null) {
  //     this.props.history.push('/');
  //   }
  // }
  // componentDidMount() {
  //   if (this.props.user.currentUser !== null) {
  //     this.props.history.push('/');
  //   }
  // }

  render() {
    if (this.props.users.currentUser !== null) {
      return (
        <Typography.Title level={4}>
          {/* Already logged In, Redirecting...
          {setTimeout(() => { */}
          {this.props.history.push('/')}
          {/* }, 3000)} */}
        </Typography.Title>
      );
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="UserLoginForm" style={{ height: `100vh` }}>
        <Row style={{ height: `100%` }} type="flex">
          <Col span={6} />
          <Col span={12}>
            <div style={{ paddingTop: `75px`, paddingBottom: `30px` }}>
              <div>
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              <LoginForm />
            </div>
          </Col>
          <Col span={6} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

const mapDispathToProps = dispatch => ({
  login: (email, password) => dispatch(signin(email, password)),
  signout: () => dispatch(signout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps
  )(Form.create({ name: 'login' })(Login))
);
