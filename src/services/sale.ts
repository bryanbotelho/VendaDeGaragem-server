import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { getMessage } from 'src/utils/messageHelper';
import { ResultUser } from 'src/@types/user';
import { CreateSale } from 'src/@types/sales';

class SaleService {
  private prisma: PrismaClient;
  private lang = 'pt';

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createSale(saleData: any, user: ResultUser) {
      const { } = saleData;
      try {
        const validator: Joi.ValidationResult = CreateSaleSchema(this.lang = 'pt')
        .validate(saleData);
       
        
        if (validator.error) {
            const errorMessage = validator.error.details.map(err => err.message).join(', ');
            return { success: false, message: errorMessage };
        }
    
        return { status: 201, success: true, message: getMessage('SALE_CREATED_SUCCESS', this.lang as 'pt') };
    } catch (error) {
      console.error('Error creating sale:', error);
      return { success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
    }
}
export default new SaleService();