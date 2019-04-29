import React, { PureComponent } from 'react';
import Card from '../Card/card';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import AddQuestion from '../AddQuestion/addQuestion';
import { withRouter } from 'react-router-dom';

import {
  getQuestions,
  deleteQuestion,
  addQuestion
  //   addCategory,
  //   changeNewCategoryName
} from '../../actions/questions';

class Questions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      topic: null
    };
  }

  componentDidMount() {
    const { topic } = this.props.match.params;
    this.setState({ topic });
    if (this.props.users && this.props.users.currentUser) {
      this.props.getQuestions(topic);
    }
  }
  componentDidUpdate() {}
  componentWillReceiveProps(nextProps) {
    console.log(this.props, 'THIS PROPS');
    console.log(nextProps, 'NEXT PROPS');
    if (nextProps.users.currentUser != this.props.users.currentUser) {
      this.props.getQuestions(this.state.topic);
    }
  }

  render() {
    const columns = [
      {
        title: 'Text',
        dataIndex: 'text',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['aescend', 'descend']
      },
      {
        title: 'Option1',
        dataIndex: 'option1'
      },
      {
        title: 'Option2',
        dataIndex: 'option2'
      },
      {
        title: 'Option3',
        dataIndex: 'option3'
      },
      {
        title: 'Option4',
        dataIndex: 'option4'
      }
      // {
      //   title: 'Action',
      //   key: 'action',
      //   render: (text, record) => (
      //     <span>
      //       <Tooltip title="Delete Category">
      //         <Button
      //           type="primary"
      //           shape="circle"
      //           icon="delete"
      //           onClick={() => {
      //             this.props.deleteCategory(record.key);
      //           }}
      //         />
      //       </Tooltip>
      //     </span>
      //   )
      // }
    ];
    return (
      <>
        <AddQuestion topic={this.state.topic} />
        <Table
          loading={this.props.questions.loading}
          columns={columns}
          dataSource={this.props.questions.questions}
          // onChange={onChange}
        />
        {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {topics.map(topic => {
            return <Card {...topic} />;
          })}
        </div> */}
      </>
    );
  }
}
const mapStateToProps = ({ users, topics, questions }) => ({
  users,
  questions
});

const mapDispathToProps = dispatch => ({
  getQuestions: topicId => dispatch(getQuestions(topicId)),
  // deleteQuestion: catId => dispatch(deleteQuestion(catId)),
  addQuestion: (text, answers, correct, topicId) =>
    dispatch(addQuestion(text, answers, correct, topicId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispathToProps
  )(Questions)
);
