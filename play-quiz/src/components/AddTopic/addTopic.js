import React, { PureComponent } from 'react';
import { Modal, Button, Tooltip, Form, Icon, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { addTopic } from '../../actions/topics';
import { getCategories } from '../../actions/categories';

const Option = Select.Option;

class AddTopic extends PureComponent {
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    if (this.props.categories.categories.length === 0) {
      this.props.getCategories(this.props.users.currentUser.uid);
    }
    this.setState({
      visible: true
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.topics.addLoading === true &&
      nextProps.topics.addLoading === false
    ) {
      this.props.form.resetFields();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addTopic(
          values.name,
          'https://firebasestorage.googleapis.com/v0/b/playquiz-1337.appspot.com/o/placeholder.jpg?alt=media&token=8fe54b8c-7ac8-44d2-8479-4dc2c4b757d9',
          values.tagline,
          this.props.users.currentUser.uid,
          values.category
        );
      }
    });
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Tooltip placement="bottom" title={'New Topic'}>
          <Button type="primary" icon="plus-circle" onClick={this.showModal}>
            Add Topic
          </Button>
        </Tooltip>
        <Modal
          title="Add New Topic"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={this.props.topics.addLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.props.topics.addLoading}
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please enter topic title' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Topic Title"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('tagline', {
                rules: [
                  { required: true, message: 'Please enter topic tagline' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Topic Tagline"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('category', {
                rules: [
                  { required: true, message: 'Category of topic is required' }
                ]
              })(
                <Select style={{ width: '100%' }}>
                  {this.props.categories.categories.map(cat => (
                    <Option value={cat}>{cat}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({ users, topics, categories }) => ({
  users,
  categories,
  topics
});

const mapDispathToProps = dispatch => ({
  addTopic: (name, image, tagline, owner, category) =>
    dispatch(addTopic(name, image, tagline, owner, category)),
  getCategories: userId => dispatch(getCategories(userId))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Form.create({ name: 'AddTopForm' })(AddTopic));
