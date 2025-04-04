import { Router } from 'express';
import ProductController from '../controllers/product';
import AuthMiddleware from '../middlewares/auth';

const router = Router();

router.post('/create',AuthMiddleware.validateToken, ProductController.create);

export default router;