import { Response, Request } from 'express';
import { MyRequest } from '../@types/auth';
import { ResultUser } from 'src/@types/user';
import SaleService from '@services/sale';


class SaleController {

  async createSale(req: MyRequest, res: Response): Promise<any> {
    const { message, success, status } = await SaleService.createSale(req.body, req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ success, message });
  }

  async getSalesByUser(req: MyRequest, res: Response): Promise<any> {
    const { data, success, status, message } = await SaleService.getSalesByUser(req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });

    return res.status(status).json({ success, result: data });
  }


}

export default new SaleController();