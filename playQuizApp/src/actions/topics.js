import { TOPICS, SUCCESS } from '../constants/ActionTypes';
import { auth, db, currentUser } from '../firebase';

export function getTopics(category) {
  return dispatch => {
    const unsubscribe = db
      .collection('topics')
      .where('category', '==', category)
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
      unsubscribe
    });
  };
}
