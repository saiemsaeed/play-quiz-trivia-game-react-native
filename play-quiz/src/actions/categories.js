import { CATEGORIES, SUCCESS, REQUEST } from '../constants/ActionTypes';
import { auth, db, currentUser } from '../firebase';
import axios from 'axios';

export function getCategories(userId) {
  return dispatch => {
    dispatch({
      type: `${CATEGORIES}${REQUEST}`
    });

    let unsubscribe = db
      .collection('categories')
      .where('ownerId', '==', userId)
      .onSnapshot(snapshot => {
        const docsData = snapshot.docs.map(doc => doc.id);
        dispatch({
          type: `${CATEGORIES}${SUCCESS}`,
          payload: docsData
        });
      });

    dispatch({
      type: `${CATEGORIES}_UNSUBSCRIBE`,
      unsubscribe: unsubscribe
    });
  };
}

export function deleteCategory(catId) {
  return {
    type: `${CATEGORIES}_DELETE`,
    payload: axios.delete(`/categories/${catId}`)
  };
}

export function addCategory(name, userId, userName) {
  name = name.toLowerCase();
  return dispatch => {
    const response = dispatch({
      type: `${CATEGORIES}_ADD`,
      payload: axios.post('/categories', {
        name,
        userId,
        userName
      })
    });

    response.then(data => {
      dispatch({ type: `${CATEGORIES}_CHANGE_NEW_NAME`, newName: '' });
    });
  };
}

export function changeNewCategoryName(newName) {
  return {
    type: `${CATEGORIES}_CHANGE_NEW_NAME`,
    newName
  };
}
