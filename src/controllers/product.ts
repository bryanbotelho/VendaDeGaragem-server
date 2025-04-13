import { Response } from 'express';
import ProductService from '../services/product';
import { MyRequest } from '../@types/auth';
import { ResultUser } from 'src/@types/user';


class ProductController {

  async create(req: MyRequest, res: Response): Promise <any> {
    const { message, success, status } = await ProductService.create(req.body, req.user);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ message, success });
  }


  async getProductByUser ( req: MyRequest, res: Response): Promise <any> {
    const { data, success, status, message } = await ProductService.getProductByUser(req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ success, result:data });

  };
  
  async getProductAll  (req: MyRequest, res: Response): Promise <any> {
    const { message, success, status, data: allproduct } = await ProductService.getProductAll(req.body);
    if (!success) return res.status(status).json({ message, success, });
    
    return res.status(status).json({ success, message, data: allproduct });
  }

}

export default new ProductController();