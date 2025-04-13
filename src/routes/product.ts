import { Router } from 'express';
import ProductController from '../controllers/product';
import AuthMiddleware from '../middlewares/auth';

const router = Router();

router.post('/create',AuthMiddleware.validateToken, ProductController.create);
router.get('/getByUser', AuthMiddleware.validateToken, ProductController.getProductByUser);

export default router;