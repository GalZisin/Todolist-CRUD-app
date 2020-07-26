import { Router } from 'express';
import { restrictTo } from '../controllers/authController';
import {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  deleteTask,
  updateMyTask,
  deleteMyTask,
} from '../controllers/taskController';
import auth from '../middleware/auth';

const router = Router();

router.use(auth);
router.route('/getMyTasks').get(getMyTasks);

router.route('/getAllTasks').get(restrictTo('admin'), getAllTasks);

router.route('/createTask').post(createTask);

router.route('/deleteTask/:Id').delete(restrictTo('admin'), deleteTask);
router.route('/updateTask/:Id').patch(restrictTo('admin'), updateTask);

router.route('/deleteMyTask/:Id').delete(deleteMyTask);
router.route('/updateMyTask/:Id').patch(updateMyTask);
// router.route('/').get(getTasks).post(createTask);

// router.route('/:taskId').get(getTask).delete(deleteTask).put(updateTask);

// export default router;
export default router;
