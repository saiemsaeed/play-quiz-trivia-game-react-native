import { CATEGORIES, SUCCESS, REQUEST } from '../constants/ActionTypes';
import { db } from '../firebase';

export function getCategories() {
  return dispatch => {
    dispatch({
      type: `${CATEGORIES}${REQUEST}`
    });

    const unsubscribe = db.collection('categories').onSnapshot(snapshot => {
      const docsData = snapshot.docs.map(doc => doc.id);
      dispatch({
        type: `${CATEGORIES}${SUCCESS}`,
        payload: docsData
      });
    });

    dispatch({
      type: `${CATEGORIES}_UNSUBSCRIBE`,
      unsubscribe
    });
  };
}
