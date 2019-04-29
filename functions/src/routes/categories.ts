import * as express from 'express';
import * as controller from '../controller/categories';

const router = express.Router();

router.route('/').post(controller.createCategory);

router.route('/:name').delete(controller.deleteCategory);

export default router;
