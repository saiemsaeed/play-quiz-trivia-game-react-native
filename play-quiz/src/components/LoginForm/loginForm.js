import React, { PureComponent } from 'react';
import { Form, Button, Alert, Typography, Input } from 'antd';
import { connect } from 'react-redux';
import './loginForm.scss';
import { signin } from '../../actions/users';

class LoginForm extends PureComponent {
  submitForm = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.signin(values.email, values.password);
      }
    });
  };

  componentDidMount() {
    console.log(this.props, 'PROPS');
  }

  componentDidUpdate() {
    console.log(this.props, 'UPDATE PROPS');
  }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'RESET_LOGIN'
  //   });
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{
          marginTop: `10px`,
          background: `#fff`,
          border: `1px solid #d8d6d6`,
          borderRadius: `3px`
        }}
      >
        <div
          style={{
            padding: `25px 20px 14px`,
            borderBottom: `1px solid #d8d6d6`
          }}
        >
          <Typography.Title
            level={4}
            style={{
              fontWeight: 600,
              lineHeight: `1.15`,
              margin: 0,
              fontSize: `18px`
            }}
          >
            Login to your account
          </Typography.Title>
        </div>
        <div
          style={{
            padding: `20px 20px 20px`
          }}
        >
          {this.props.users.error ? (
            <Alert
              style={{ marginBottom: `15px` }}
              message={this.props.users.errorMessage}
              type="error"
            />
          ) : null}
          <Form style={{ marginTop: '5px' }} onSubmit={this.submitForm}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password'
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            {this.props.type !== 'modal' ? (
              <Form.Item style={{ marginTop: `17px` }}>
                <Button
                  loading={this.props.users.loading}
                  style={{ width: `100%` }}
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            ) : null}
          </Form>
          <Typography.Paragraph style={{ marginTop: `7px` }}>
            By Logging in you agree with PlayQuiz's terms and conditions.
          </Typography.Paragraph>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ users }) => ({ users: users });

const mapDispathToProps = dispatch => ({
  signin: (email, password) => dispatch(signin(email, password))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Form.create({ name: 'login' })(LoginForm));
