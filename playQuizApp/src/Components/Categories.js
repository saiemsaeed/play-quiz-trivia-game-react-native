import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';
import { getCategories } from '../actions/categories';

const Item = List.Item;

class Categories extends PureComponent {
  componentDidMount() {
    this.props.getCategories();
    console.log(this.props, 'props');
  }

  componentWillUnmount() {
    this.props.categories.unsubscribe();
  }

  render() {
    console.log(this.props.categories.categories);
    if (this.props.categories.loading) {
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
        <List renderHeader={'Categories'}>
          {this.props.categories.categories.map(category => (
            <Item
              key={category}
              onPress={value => {
                Actions.topics({ category });
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
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

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
