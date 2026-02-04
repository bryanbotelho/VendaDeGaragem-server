import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { getMessage } from 'src/utils/messageHelper';
import { ResultUser } from 'src/@types/user';
import { CreateSaleSchema } from 'src/schemas/sale';
import product from './product';
import user from './user';

class SaleService {
  private prisma: PrismaClient;
  private lang = 'pt';

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createSale(saleData: any, user: ResultUser) {
      const { order_number, trasaction_id, original_price, discount_price, final_price, payment_method, payment_status, buyer_id, saller_id, product_id, sale_date } = saleData;
      try {
        const validator: Joi.ValidationResult = CreateSaleSchema(this.lang = 'pt')
        .validate(saleData);

        if (validator.error) {
            const errorMessage = validator.error.details.map(err => err.message).join(', ');
            return { success: false, message: errorMessage };
        }

          if (discount_price > original_price) {
          return { status: 400, success: false, message: getMessage('DISCOUNT_PRICE_INVALID', this.lang as 'pt') };
        }

        if (final_price !== (original_price - discount_price)) {
          return { status: 400, success: false, message: getMessage('FINAL_PRICE_INVALID', this.lang as 'pt') };
        }
        
        const product = await this.prisma.product.findUnique({
          where: { id: product_id }
        });
        if (!product || product.active === false) {
          return { status: 400, success: false, message: getMessage('PRODUCT_NOT_FOUND', this.lang as 'pt') };
        }


        await this.prisma.sale.create({
          where: { id: saleData.id },
          data: {
            user: {
                    connect: { id: user.id }
            },
            order_number,
            trasaction_id,
            original_price,
            discount_price,
            final_price,
            payment_method,
            payment_status,
            buyer_id,
            saller_id,
            product_id,
            sale_date
          }
        });

        return { status: 201, success: true, message: getMessage('SALE_CREATED_SUCCESS', this.lang as 'pt') };
    } catch (error) {
      console.error('Error creating sale:', error);
      return { success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
    }
  }

    async getSaleById(saleId: number, user: ResultUser) {
        try {
            const sale = await this.prisma.sale.findUnique({
                where: { id: saleId },
            });

            if (user.id !== sale?.saller_id && user.id !== sale?.buyer_id) {
                return { success: false, message: getMessage('UNAUTORIZED_ACCESS', this.lang as 'pt') };
            }
            
            return { success: true, data: sale };
        } catch (error) {
            console.error('Error getting sale by ID:', error);
            return { success: false, message: getMessage('SALE_NOT_FOUND', this.lang as 'pt') };
        }
    }

}
export default new SaleService();