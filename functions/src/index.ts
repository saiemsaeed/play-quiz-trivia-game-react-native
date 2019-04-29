import admin, { db, functions } from './config';
import * as express from 'express';
import * as cors from 'cors';
import usersRoute from './routes/users';
import categoriesRoute from './routes/categories';
import topicsRoute from './routes/topics';
import questionsRoute from './routes/questions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const app = express();

app.use(cors({ origin: '*' }));
app.use('/users', usersRoute);
app.use('/categories', categoriesRoute);
app.use('/topics', topicsRoute);
app.use('/questions', questionsRoute);

export const api = functions.https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
