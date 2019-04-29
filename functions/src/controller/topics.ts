import admin, { db } from '../config';
import { Request, Response } from 'express';

const createTopic = async (request: Request, response: Response) => {
  try {
    const {
      name,
      image,
      category,
      tagline,
      owner
    }: {
      name: string;
      image: string;
      category: string;
      tagline: string;
      owner: string;
    } = request.body;

    if (!name || !image || !category || !tagline || !owner)
      throw { status: 400, message: 'data insufficient' };
    const newTopic = await db
      .collection('topics')
      .add({ category, image, name, tagline, owner });
    response.status(200).send(newTopic);
  } catch (e) {
    response.status(400).send(e);
  }
};

const deleteTopic = async (request: Request, response: Response) => {
  try {
    const {
      topicId
    }: {
      topicId: string;
    } = request.params;
    const delTopic = await db
      .collection('topics')
      .doc(topicId)
      .delete();
    response.status(200).send(delTopic);
  } catch (e) {
    response.status(400).send(e);
  }
};

// const changePassword = (userId, oldPassword, newPassword) => {
//   response.status(200).send({ message: 'User updated successfully!' });
// };

export { createTopic, deleteTopic };
