import { TOPICS, SUCCESS, SCORE } from '../constants/ActionTypes';
import { auth, db, currentUser } from '../firebase';
import axios from 'axios';

export function getScore() {
  return dispatch => {
    let unsubscribe = db.collection('games').onSnapshot(snapshot => {
      const gamesData = snapshot.docs.map(async doc => {
        const gameData = await doc.data();
        const userDetail = await db
          .collection('users')
          .doc(gameData.userId)
          .get();
        console.log(userDetail, 'USER DETAIL');
        return {
          ...gameData,
          name: userDetail.data().name
        };
      });
      console.log(gamesData, 'GAME DATA');
      Promise.all(gamesData).then(data => {
        dispatch({
          type: `${SCORE}${SUCCESS}`,
          scores: data
        });
      });
    });

    dispatch({
      type: `${SCORE}_UNSUBSCRIBE`,
      unsubscribe: unsubscribe
    });
  };
}
