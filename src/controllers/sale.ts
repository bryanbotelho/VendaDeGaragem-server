import { Response, Request } from 'express';
import { MyRequest } from '../@types/auth';
import { ResultUser } from 'src/@types/user';
import SaleService from '@services/sale';


class SaleController {

  async createSale(req: MyRequest, res: Response): Promise<any> {
    const { message, success, status } = await SaleService.createSale(req.body, req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });
    return res.status(status).json({ message, success });
  }

  async getSalesByUser(req: MyRequest, res: Response): Promise<any> {
    const { data, success, status, message } = await SaleService.getSalesByUser(req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });
    return res.status(status).json({ success, result: data });
  }

  async processPayment(req: MyRequest, res: Response): Promise<any> {
    const { message, success, status } = await SaleService.processPayment(req.body, req.user as ResultUser);
    if (!success) return res.status(status).json({ message, success });
    return res.status(status).json({ message, success });
  }


}

export default new SaleController();