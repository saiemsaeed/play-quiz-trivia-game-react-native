import React, { PureComponent } from 'react';
import { Modal, Button, Tooltip, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/questions';
import { getCategories } from '../../actions/categories';

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

  componentDidMount() {
    // const { topic } = this.props.match.params;
    // console.log(topic);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.questions.addLoading == true &&
      nextProps.questions.addLoading == false
    ) {
      nextProps.form.resetFields();
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { text } = values;
        const answers = [values['0'], values['1'], values['2'], values['3']];
        const correct = values['0'];
        this.props.addQuestion(text, answers, correct, this.props.topic);
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
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Tooltip placement="bottom" title={'New Topic'}>
          <Button type="primary" icon="plus-circle" onClick={this.showModal}>
            Add Questions
          </Button>
        </Tooltip>
        <Modal
          title="Add New Question"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={this.props.questions.loading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.props.questions.addLoading}
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('text', {
                rules: [{ required: true, message: 'Please enter topic title' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Question Text"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('0', {
                rules: [{ required: true, message: 'Option can not be empty' }]
              })(<Input placeholder="Correct Option Text Here" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('1', {
                rules: [{ required: true, message: 'Option can not be empty' }]
              })(<Input placeholder="Option Text 1" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('2', {
                rules: [{ required: true, message: 'Option can not be empty' }]
              })(<Input placeholder="Option Text 2" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('3', {
                rules: [{ required: true, message: 'Option can not be empty' }]
              })(<Input placeholder="Option Text 3" />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = ({ users, topics, categories, questions }) => ({
  users,
  categories,
  topics,
  questions
});

const mapDispathToProps = dispatch => ({
  addQuestion: (text, answers, correct, topicId) =>
    dispatch(addQuestion(text, answers, correct, topicId)),
  getCategories: userId => dispatch(getCategories(userId))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Form.create({ name: 'AddTopForm' })(AddTopic));
