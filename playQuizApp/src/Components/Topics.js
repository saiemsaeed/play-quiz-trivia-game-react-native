import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Provider,
  Button,
  Toast,
  Flex,
  InputItem,
  WhiteSpace,
  List,
  Modal,
  Text,
  ActivityIndicator
} from '@ant-design/react-native';
import { StyleSheet, View } from 'react-native';
import { getTopics } from '../actions/topics';

const Item = List.Item;

class Topics extends PureComponent {
  componentDidMount() {
    console.log(this.props, 'Mount');
    this.props.getTopics(this.props.category);
  }
  componentDidUpdate() {
    console.log(this.props, 'UPDATE');
    console.log(this.props.topics);
  }

  componentWillUnmount() {
    this.props.topics.unsubscribe();
  }

  render() {
    if (this.props.topics.loading) {
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
        <List renderHeader={'Topics'}>
          {this.props.topics.topics.map(topic => (
            <Item
              key={topic.name}
              onPress={() => {
                Actions.questions({
                  topicId: topic.topicId,
                  topic: topic.name
                });
              }}
            >
              {topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
            </Item>
          ))}
        </List>
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

const mapStateToProps = ({ topics }) => ({
  topics
});

const mapDispatchToProps = dispatch => ({
  getTopics: cagtegory => dispatch(getTopics(cagtegory))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topics);
