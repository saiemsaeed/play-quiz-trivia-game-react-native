import * as express from 'express';
import * as controller from '../controller/topics';

const router = express.Router();

router.route('/').post(controller.createTopic);

router.route('/:topicId').delete(controller.deleteTopic);

// router.route('/:userId').delete(controller.);

export default router;
