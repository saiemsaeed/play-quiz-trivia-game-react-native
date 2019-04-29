import { TOPICS, SUCCESS } from '../constants/ActionTypes';
import { auth, db, currentUser } from '../firebase';
import axios from 'axios';

export function getTopics(userId) {
  return dispatch => {
    let unsubscribe = db
      .collection('topics')
      .where('owner', '==', userId)
      .onSnapshot(snapshot => {
        const docsData = snapshot.docs.map(doc => ({
          topicId: doc.id,
          ...doc.data()
        }));
        dispatch({
          type: `${TOPICS}${SUCCESS}`,
          topics: docsData
        });
      });

    dispatch({
      type: `${TOPICS}_UNSUBSCRIBE`,
      unsubscribe: unsubscribe
    });
  };
}

export function deleteTopic(topicId) {
  return {
    type: `${TOPICS}_DELETE`,
    payload: axios.delete(`/topics/${topicId}`)
  };
}

export function addTopic(name, image, tagline, owner, category) {
  name = name.toLowerCase();
  return dispatch => {
    const response = dispatch({
      type: `${TOPICS}_ADD`,
      payload: axios.post('/topics', {
        name,
        image,
        category,
        tagline,
        owner
      })
    });

    // response.then(data => {
    //   dispatch({ type: `${TOPICS}_CHANGE_NEW_NAME`, newName: '' });
    // });
  };
}

// export function changeNewCategoryName(newName) {
//   return {
//     type: `${CATEGORIES}_CHANGE_NEW_NAME`,
//     newName
//   };
// }
