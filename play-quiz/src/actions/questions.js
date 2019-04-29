import { QUESTIONS, SUCCESS } from '../constants/ActionTypes';
import { auth, db, currentUser } from '../firebase';
import axios from 'axios';

export function getQuestions(topicId) {
  return dispatch => {
    console.log(topicId);
    let unsubscribe = db
      .collection('questions')
      .where('topicId', '==', topicId)
      .onSnapshot(snapshot => {
        const docsData = snapshot.docs.map(doc => doc.data());
        dispatch({
          type: `${QUESTIONS}${SUCCESS}`,
          payload: docsData
        });
      });

    dispatch({
      type: `${QUESTIONS}_UNSUBSCRIBE`,
      unsubscribe: unsubscribe
    });
  };
}

export function deleteQuestion(questionId) {
  return {
    type: `${QUESTIONS}_DELETE`,
    payload: axios.delete(`/questions/${questionId}`)
  };
}

export function addQuestion(text, answers, correct, topicId) {
  return dispatch => {
    const response = dispatch({
      type: `${QUESTIONS}_ADD`,
      payload: axios.post('/questions', {
        text,
        answers,
        correct,
        topicId
      })
    });

    // response.then(data => {
    //   dispatch({ type: `${QUESTIONS}_CHANGE_NEW_NAME`, newName: '' });
    // });
  };
}

// export function changeNewCategoryName(newName) {
//   return {
//     type: `${CATEGORIES}_CHANGE_NEW_NAME`,
//     newName
//   };
// }
