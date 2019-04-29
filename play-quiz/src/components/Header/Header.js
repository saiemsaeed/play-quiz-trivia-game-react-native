import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Col, Tooltip, Icon } from 'antd';
import Logo from '../Logo';
import { withRouter } from 'react-router-dom';
import UserAccount from '../UserAccount/UserAccount';
// const Search = Input.Search;

class Header extends PureComponent {
  render() {
    return (
      <>
        <Row type="flex">
          <Col span={5}>
            <div>
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </Col>
          <Col span={14}>
            <div style={{ display: `flex`, flexDirection: `column` }}>
              {/* <Search
                placeholder="What do you want to bid on?"
                onSearch={value => {
                  this.props.history.push(
                    `/search?${qs.stringify(
                      { query: value },
                      { format: 'RFC3986' }
                    )}`
                  );
                }}
              /> */}
            </div>
          </Col>

          <Col span={5}>
            <Row type="flex" align="middle" justify="end">
              {/* <Tooltip placement="bottom" title={'New Auction'}>
                <Link
                  to=""
                  style={{ marginRight: `30px`, fontSize: `22px` }}
                >
                  <Icon type="plus-circle" />
                </Link>
              </Tooltip> */}

              {/* <Tooltip placement="bottom" title={'Notifications'}>
                <Link
                  to=""
                  style={{ marginRight: `30px`, fontSize: `22px` }}
                >
                  <Icon type="bell" />
                </Link>
              </Tooltip> */}

              <UserAccount />
            </Row>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={24}>
            <div
              style={{
                maxWidth: `1100px`,
                margin: `0 auto`,
                textAlign: `center`
              }}
            >
              {/* <CategoriesMenu /> */}
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Header);
