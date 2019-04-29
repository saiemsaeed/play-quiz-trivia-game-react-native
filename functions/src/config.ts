import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { admin as default, db, functions };
