import React, { PureComponent } from 'react';
import Card from '../Card/card';
import { connect } from 'react-redux';
import { Button, Select } from 'antd';
import AddTopic from '../AddTopic/addTopic';
import {
  getTopics,
  deleteTopic,
  addTopic
  //   addCategory,
  //   changeNewCategoryName
} from '../../actions/topics';

const Option = Select.Option;

class Topics extends PureComponent {
  componentDidMount() {
    if (this.props.users && this.props.users.currentUser) {
      this.props.getTopics(this.props.users.currentUser.uid);
    }
  }
  componentDidUpdate() {}
  componentWillReceiveProps(nextProps) {
    console.log(this.props, 'THIS PROPS');
    console.log(nextProps, 'NEXT PROPS');
    if (nextProps.users.currentUser != this.props.users.currentUser) {
      this.props.getTopics(nextProps.users.currentUser.uid);
    }
  }

  render() {
    const { topics } = this.props.topics;
    return (
      <>
        <AddTopic />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {topics.map(topic => {
            return <Card {...topic} />;
          })}
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ users, topics }) => ({
  users,
  topics
});

const mapDispathToProps = dispatch => ({
  getTopics: userId => dispatch(getTopics(userId)),
  deleteTopic: catId => dispatch(deleteTopic(catId)),
  addTopic: (name, image, tagline, owner, category) =>
    dispatch(addTopic(name, image, tagline, owner, category))
  //   changeNewCategoryName: newName => dispatch(changeNewCategoryName(newName))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Topics);
