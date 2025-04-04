import { Response } from 'express';
import ProductService from '../services/product';
import { MyRequest } from '../@types/auth';


class ProductController {

  async create(req: MyRequest, res: Response): Promise <any> {
    const { message, success, status } = await ProductService.create(req.body, req.user);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ message, success });
  }

}
export default new ProductController();