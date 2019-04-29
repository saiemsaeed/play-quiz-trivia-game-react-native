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
  Radio,
  ActivityIndicator
} from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text } from 'react-native';
import {
  getQuestion,
  changeCorrect,
  changeTimer,
  saveAnswer,
  uploadGame,
  resetInitial
} from '../actions/questions';

const Item = List.Item;
const RadioItem = Radio.RadioItem;

class Questions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      unregisterInterval: () => {}
    };
  }

  componentDidMount() {
    console.log(this.props, 'props');
    this.getNextQuestion(this.props.topicId);
    const unregisterInterval = setInterval(() => {
      this.props.changeTimer();
    }, 1000);
    this.setState({ unregisterInterval });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.questions.timeLeft === 1 &&
      nextProps.questions.timeLeft <= 0 &&
      nextProps.questions.endGame === false
    ) {
      clearInterval(this.state.unregisterInterval);
      this.props.uploadGame(
        this.props.questions.questionsAnswered,
        this.props.questions.score,
        this.props.users.currentUser.uid
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.unregisterInterval);
    this.props.resetInitial();
  }

  getNextQuestion = topicId => {
    this.props.getQuestion(topicId);
  };

  render() {
    const { questionText, view, timerText } = styles;
    if (this.props.questions.endGame) {
      return (
        <Flex justify="center" align="center" style={{ flex: 1 }}>
          <Flex.Item>
            <Text
              style={{
                fontSize: 52,
                alignSelf: 'center'
              }}
            >
              {this.props.questions.score}
            </Text>
            <Text
              style={{
                fontSize: 30,
                alignSelf: 'center'
              }}
            >
              Your Score
            </Text>
            <WhiteSpace />
            <Button onPress={() => Actions.reset('main')}>Play Again?</Button>
          </Flex.Item>
        </Flex>
      );
    }
    if (this.props.questions.loadingNext) {
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
        <View style={view}>
          <WhiteSpace />
          <Flex align="center" justify="center">
            <Text style={timerText}>{this.props.questions.timeLeft}s</Text>
          </Flex>
          <WhiteSpace />
          <Text style={questionText}>
            {this.props.questions.question.text}?
          </Text>
          <WhiteSpace />
          {this.props.questions.question.answers &&
            this.props.questions.question.answers.map(answer => (
              <React.Fragment>
                <RadioItem
                  key={answer}
                  checked={this.props.questions.correct === answer}
                  onChange={event => {
                    if (event.target.checked) {
                      this.props.changeCorrect(answer);
                    }
                  }}
                >
                  {answer}
                </RadioItem>
                <WhiteSpace />
              </React.Fragment>
            ))}
          <Button
            type="primary"
            onPress={() =>
              this.props.saveAnswer(
                this.props.questions.question,
                this.props.questions.correct
              )
            }
          >
            Submit
          </Button>
        </View>
      </Provider>
    );
  }
}

const mapStateToProps = ({ users, questions }) => ({
  questions,
  users
});

const mapDispatchToProps = dispatch => ({
  getQuestion: topicId => dispatch(getQuestion(topicId)),
  changeCorrect: newCorrect => dispatch(changeCorrect(newCorrect)),
  changeTimer: newMili => dispatch(changeTimer(newMili)),
  saveAnswer: (question, answer) => dispatch(saveAnswer(question, answer)),
  resetInitial: () => dispatch(resetInitial()),
  uploadGame: (questions, score, userId) =>
    dispatch(uploadGame(questions, score, userId))
});

const styles = StyleSheet.create({
  timerText: {
    fontSize: 52
  },
  view: {
    paddingLeft: 12,
    paddingRight: 12,
    display: 'flex',
    flex: 1
  },
  questionText: {
    fontSize: 24
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions);
