import { Router } from 'express';
import { register, login, restrictTo } from '../controllers/authController';
import { getAllUsers, loadUser } from '../controllers/userController';
import auth from '../middleware/auth';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.use(auth);

router.route('/getallusers').get(restrictTo('admin'), getAllUsers);

router.route('/loadUser').post(loadUser);

export default router;
