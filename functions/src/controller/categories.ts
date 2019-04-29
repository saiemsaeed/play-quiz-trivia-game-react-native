import admin, { db } from '../config';
import { Request, Response } from 'express';

const createCategory = async (request: Request, response: Response) => {
  try {
    const {
      name,
      userId,
      userName
    }: {
      name: string;
      userId: string;
      userName: string;
    } = request.body;

    if (!name || !userId || !userName)
      throw { status: 400, message: 'data insufficient' };
    const newCategory = await db
      .collection('categories')
      .doc(name)
      .create({ ownerId: userId, ownerName: userName, topics: [] });
    response.status(200).send(newCategory);
  } catch (e) {
    response.status(400).send(e);
  }
};

// const editCategory = async (request: Request, response: Response) => {
//   try {
//     const {
//       name
//     }: {
//       id: string;
//       name: string;
//     } = request.body;
//     const updatedCategory = await db
//       .collection('categories')
//       .doc(id)
//       .update({ name });
//     response.status(200).send(updatedCategory);
//   } catch (e) {
//     response.status(400).send(e);
//   }
// };

const deleteCategory = async (request: Request, response: Response) => {
  try {
    const {
      name
    }: {
      name: string;
    } = request.params;
    const delCat = await db
      .collection('categories')
      .doc(name)
      .delete();
    response.status(200).send(delCat);
  } catch (e) {
    response.status(400).send(e);
  }
};

// const changePassword = (userId, oldPassword, newPassword) => {
//   response.status(200).send({ message: 'User updated successfully!' });
// };

export { createCategory, deleteCategory };
