import { Router } from 'express';
import ProductController from '../controllers/product';
import AuthMiddleware from '../middlewares/auth';

const router = Router();

router.post('/create',AuthMiddleware.validateToken, ProductController.create);
router.get('/getByUser', AuthMiddleware.validateToken, ProductController.getProductByUser);

router.get('/getProductAll', ProductController.getProductAll);

router.put('/updateproduct/:id', AuthMiddleware.validateToken, ProductController.updateProduct);

router.delete('/deleteProduct/:id', AuthMiddleware.validateToken, ProductController.deleteProduct);

export default router;