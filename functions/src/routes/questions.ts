import * as express from 'express';
import * as controller from '../controller/questions';

const router = express.Router();

router.route('/').post(controller.createQuestion);

router.route('/:questionId').delete(controller.deleteQuestion);

// router.route('/:userId').delete(controller.);

export default router;
