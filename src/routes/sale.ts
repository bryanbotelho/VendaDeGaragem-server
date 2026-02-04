import { Router } from 'express';
import SaleController  from '../controllers/sale';
import AuthMiddleware from '../middlewares/auth';

const router = Router();

router.post('/sales', AuthMiddleware.validateToken, SaleController.createSale);
router.get('/sales/user/:userId', AuthMiddleware.validateToken, SaleController.getSalesByUser);

export default router;

