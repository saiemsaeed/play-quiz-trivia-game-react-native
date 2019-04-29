import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class AccountSideMenu extends PureComponent {
  render() {
    return (
      <Menu style={{ borderRight: `0px` }} mode="inline">
        <Menu.Item key="main">
          <Link to="/">Home</Link>
        </Menu.Item>
        <SubMenu
          key="auctionBiding"
          title={
            <span>
              <Icon type="mail" />
              <span>Quiz Controls</span>
            </span>
          }
        >
          <Menu.Item key="categories">
            <Link to="/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="topics">
            <Link to="/topics">Topics</Link>
          </Menu.Item>
          {/* <Menu.Item key="addQuestion">
            <Link to="/questions">Questions</Link>
          </Menu.Item> */}
        </SubMenu>
        {/* <Menu.Item key="settings">
          <Link to="/account/notifications">
            <Icon type="setting" /> Account Settings
          </Link>
        </Menu.Item>
        <Menu.Item key="notifications">
          <Link to="/account/notifications">
            <Icon type="mail" /> Notifications
          </Link>
        </Menu.Item> */}
      </Menu>
    );
  }
}

export default withRouter(AccountSideMenu);
