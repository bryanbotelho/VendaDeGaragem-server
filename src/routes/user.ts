import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();

router.post('/login', UserController.generatorToken);
router.post('/create', UserController.create);

export default router;