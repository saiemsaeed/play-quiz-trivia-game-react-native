import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import Header from '../components/Header/Header';
import AuthRoute from '../hoc/AuthRoute';
import AccountSideMenu from '../components/AccountSideMenu/AccountSideMenu';
import Categories from '../components/Categories/categories';
import Topics from '../components/Topics/topics';
import Questions from '../components/Questions/questions';
import Main from '../components/Main/main';
import score from '../components/Score/score';

class Dashboard extends PureComponent {
  render() {
    return (
      <>
        <div style={{ boxShadow: `0px 0px 15px -10px #000` }}>
          <div
            style={{ maxWidth: `95%`, margin: `0 auto`, paddingTop: `26px` }}
          >
            <Header />
          </div>
        </div>
        <div style={{ width: `95%`, margin: `0 auto`, marginTop: `20px` }}>
          <Row type="flex">
            <Col span={5}>
              <div
                style={{
                  height: '100%',
                  borderRight: `1px solid #ededed`
                }}
              >
                <AccountSideMenu />
              </div>
            </Col>
            <Col span={19} style={{}}>
              <div style={{ padding: `0px 0px 0px 25px`, height: '100%' }}>
                <AuthRoute
                  path="/"
                  exact
                  comingFrom={this.props.location}
                  component={Main}
                />
                <AuthRoute
                  path="/topics"
                  comingFrom={this.props.location}
                  component={Topics}
                />
                <AuthRoute
                  exact
                  path="/categories"
                  comingFrom={this.props.location}
                  component={Categories}
                />
                <AuthRoute
                  exact
                  path="/scores"
                  comingFrom={this.props.location}
                  component={score}
                />
                <AuthRoute
                  path="/questions/:topic"
                  comingFrom={this.props.location}
                  component={Questions}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(connect()(Dashboard));
