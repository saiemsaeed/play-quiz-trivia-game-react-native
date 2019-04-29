import React, { PureComponent } from 'react';
import {
  Dropdown,
  Icon,
  Avatar,
  Button,
  Card,
  Menu,
  Divider,
  Typography
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../actions/users';

class UserAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.menu = this.menu.bind(this);
  }

  menu() {
    const LoggedIn = this.props.currentUser;
    return (
      <Card style={{ width: `260px` }}>
        <div style={{ padding: `10px` }}>
          <Typography.Text className="levelFourHeading" level={2}>
            Hello,{' '}
            {this.props.users.currentUser !== null
              ? this.props.users.currentUser.displayName
              : ''}
          </Typography.Text>

          <div>
            <Button
              loading={this.props.user}
              onClick={this.props.signout}
              style={{ width: '100%' }}
              type="primary"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* <Divider style={{ margin: `7px 0px` }} />
        <div>
          <Menu style={{ borderRight: `0px` }}>
            <Menu.Item disabled={LoggedIn ? false : true} key="1">
              <Link to="/account/auction-item">Auction Item</Link>
            </Menu.Item>

            <Menu.Item disabled={LoggedIn ? false : true} key="2">
              <Link to="/auction-item">My Account</Link>
            </Menu.Item>
            <Menu.Item disabled={LoggedIn ? false : true} key="3">
              <Link to="/auction-item">Orders Tracking</Link>
            </Menu.Item>
          </Menu>
        </div> */}
      </Card>
    );
  }

  render() {
    const menuComponent = this.menu();
    return (
      <Dropdown overlay={menuComponent} trigger={['click']}>
        {this.props.users.currentUser.photoURL ? (
          <Avatar
            style={{
              'background-image': `url("${
                this.props.users.currentUser.photoURL
              }")`,
              'background-size': 'cover'
            }}
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: '#585990'
            }}
          />
        )}
      </Dropdown>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });
const mapDispathToProps = dispatch => ({
  signout: () => dispatch(signout())
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(UserAccount);
