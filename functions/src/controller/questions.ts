import admin, { db } from '../config';
import { Request, Response } from 'express';

const createQuestion = async (request: Request, response: Response) => {
  try {
    const {
      text,
      answers,
      correct,
      topicId
    }: {
      text: string;
      answers: string[];
      correct: string;
      topicId: string;
    } = request.body;
    if (!text || !answers || !correct || !topicId)
      throw { status: 400, message: 'data insufficient' };

    const increment = admin.firestore.FieldValue.increment(1);
    const batch = db.batch();
    const docRef = db.collection('questions').doc();
    const topicRef = db.collection('topics').doc(topicId);
    batch.create(docRef, { text, answers, correct, topicId });
    batch.set(topicRef, { questionsCount: increment }, { merge: true });
    const newQuestion = await batch.commit();
    response.status(200).send(newQuestion);
  } catch (e) {
    response.status(400).send(e);
  }
};

const deleteQuestion = async (request: Request, response: Response) => {
  try {
    const {
      questionId
    }: {
      questionId: string;
    } = request.params;
    const delQuestion = await db
      .collection('questions')
      .doc(questionId)
      .delete();
    response.status(200).send(delQuestion);
  } catch (e) {
    response.status(400).send(e);
  }
};

// const changePassword = (userId, oldPassword, newPassword) => {
//   response.status(200).send({ message: 'User updated successfully!' });
// };

export { createQuestion, deleteQuestion };
