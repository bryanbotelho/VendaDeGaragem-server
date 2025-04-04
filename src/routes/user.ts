import { Router } from 'express';
import UserController from '../controllers/user';
import ProductController from '../controllers/product';

import Auth from '../middlewares/auth';

const router = Router();

router.post('/login', UserController.generatorToken);
router.post('/create', UserController.create);
router.post('/requestPasswordReset', Auth.validateToken, UserController.requestPasswordReset);
router.post('/verifyResetToken', UserController.verifyResetToken);
router.post('/resetPassword', UserController.resetPassword);

router.get('/getUsers', UserController.getUsers);
router.get('/getUserByEmail', UserController.getUserByEmail);

export default router;