import admin, { db } from '../config';
import { Request, Response } from 'express';

const createUser = async (request: Request, response: Response) => {
  try {
    const {
      email,
      password,
      name,
      gender,
      displayPicture
    }: {
      email: string;
      password: string;
      name: string;
      gender: string;
      displayPicture: string;
    } = request.body;
    const newUser = await admin.auth().createUser({
      email: email.trim(),
      password: password.trim(),
      displayName: name,
      photoURL: displayPicture,
      emailVerified: false
    });

    await db
      .collection('users')
      .doc(newUser.uid)
      .set({
        gender,
        name,
        tokens: []
      });
    response.status(200).send(newUser);
  } catch (e) {
    response.status(400).send(e);
  }
};

// const changePassword = (userId, oldPassword, newPassword) => {
//   response.status(200).send({ message: 'User updated successfully!' });
// };

export { createUser };
