import { Response, Request } from 'express';
import ProductService from '../services/product';
import { MyRequest } from '../@types/auth';
import { ResultUser } from 'src/@types/user';
import { UpdateProduct } from 'src/@types/product';


class ProductController {

  async create(req: MyRequest, res: Response): Promise <any> {
    const { message, success, status } = await ProductService.create(req.body, req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ message, success });
  }


  async updateProduct( req: MyRequest, res: Response): Promise <any> {
    const id = parseInt(req.params.id, 10);
    const { data, success, status, message, } = await ProductService.updateProduct(id, req.body as UpdateProduct, req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ success, message, result: data });
  }


  async getProductByUser ( req: MyRequest, res: Response): Promise <any> {
    const { data, success, status, message } = await ProductService.getProductByUser(req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ success, result:data });

  };
  
  async getProductAll  (req: Request, res: Response): Promise <any> {
    const { message, success, status, allproduct } = await ProductService.getProductAll(req.query);
    if (!success) return res.status(status).json({ message, success });
    
    return res.status(status).json({ success, message, Result: allproduct });
  }

  async deleteProduct ( req: MyRequest, res: Response ): Promise <any> {
    const id = parseInt(req.params.id, 10);
    const {success, status, message } = await ProductService.deleteProduct( id , req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });
    
    return res.status(status).json({ success, message, });

  }
}

export default new ProductController();