import { Response, Request } from 'express';
import ProductService from '../services/product';
import { MyRequest } from '../@types/auth';
import { ResultUser } from 'src/@types/user';
import { ResultProduct } from 'src/@types/product';


class ProductController {

  async create(req: MyRequest, res: Response): Promise <any> {
    const { message, success, status } = await ProductService.create(req.body, req.user);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ message, success });
  }


  // async updateProduct( req: MyRequest, res: Response): Promise <any> {
  //   const { data, success, status, message } = await ProductService.updateProduct(req.body, req.user as ResultUser);
  //   if (!success) return res.status(status).json({ message, success });

  //   return res.status(status).json({ success, message, data });
  // }


  async getProductByUser ( req: MyRequest, res: Response): Promise <any> {
    const { data, success, status, message } = await ProductService.getProductByUser(req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ success, result:data });

  };
  
  async getProductAll  (req: Request, res: Response): Promise <any> {
    const { message, success, status, allproduct } = await ProductService.getProductAll(req.body as ResultProduct);
    if (!success) return res.status(status).json({ message, success });
    
    return res.status(status).json({ success, message, allproduct });
  }

}

export default new ProductController();