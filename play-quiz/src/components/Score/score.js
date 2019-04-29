import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import { withRouter } from 'react-router-dom';

import {
  getScore
  //   addCategory,
  //   changeNewCategoryName
} from '../../actions/score';

class Scores extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topic: null
    };
  }

  componentDidMount() {
    if (this.props.users && this.props.users.currentUser) {
      this.props.getScore();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.users.currentUser != this.props.users.currentUser) {
      this.props.getScore();
    }
  }

  render() {
    const columns = [
      {
        title: 'User',
        dataIndex: 'name',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['aescend', 'descend']
      },
      {
        title: 'Score',
        dataIndex: 'score'
      }
    ];
    return (
      <>
        <Table
          loading={this.props.scores.loading}
          columns={columns}
          dataSource={this.props.scores.scores}
        />
      </>
    );
  }
}

const mapStateToProps = ({ users, scores }) => ({
  users,
  scores
});

const mapDispathToProps = dispatch => ({
  getScore: () => dispatch(getScore())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps
  )(Scores)
);
