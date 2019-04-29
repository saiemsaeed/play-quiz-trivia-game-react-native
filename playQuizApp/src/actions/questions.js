import { QUESTIONS, SUCCESS, REQUEST } from '../constants/ActionTypes';
import { db } from '../firebase';

const _ = require('lodash');

export function getQuestion(topicId) {
  return dispatch => {
    dispatch({
      type: `${QUESTIONS}${REQUEST}`
    });

    db.collection('questions')
      .where('topicId', '==', topicId)
      .get()
      .then(snapshot => {
        const snapDocs = snapshot.docs;
        console.log(snapDocs.length);
        const oneDoc = _.chain(snapDocs)
          .shuffle()
          .slice(1)
          .first()
          .value()
          .data();
        // const oneDoc = _.first(snapDocs).data();
        dispatch({
          type: `${QUESTIONS}${SUCCESS}`,
          question: oneDoc
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
}

export function setTopicId(topicId, topic) {
  return {
    type: 'SET_TOPIC',
    topicId,
    topic
  };
}

export function changeCorrect(newCorrect) {
  return {
    type: 'CHANGE_CORRECT',
    newCorrect
  };
}

export function changeTimer() {
  return {
    type: 'CHANGE_TIME'
  };
}

export function saveAnswer(question, ans) {
  return dispatch => {
    dispatch(getQuestion(question.topicId));

    const answer = question.correct === ans ? 'correct' : 'wrong';

    const questionAnswered = { ...question, answer: ans };

    dispatch({
      type: 'SAVE_ANSWER',
      answer,
      questionAnswered
    });
  };
}

export function uploadGame(questions, score, userId) {
  return {
    type: 'GAME_END',
    payload: db.collection('games').add({
      questions,
      score,
      userId
    })
  };
}

export function resetInitial() {
  return {
    type: 'RESET'
  };
}
