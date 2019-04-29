import * as express from 'express';
import * as controller from '../controller/users';

const router = express.Router();

router.route('/').post(controller.createUser);
//   .delete(controller.deleteUser);

// router.route('/:userId').delete(controller.);

export default router;
