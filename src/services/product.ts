import { PrismaClient } from '@prisma/client';
import { CreateProduct } from '../@types/product';
import { getMessage } from 'src/utils/messageHelper';



class ProductService {
    private prisma: PrismaClient;
    private lang = 'pt';

    constructor() {
        this.prisma = new PrismaClient();
    }
  
  async create(data: CreateProduct, user: any){
    const { categoryId, condition, contactPhone, location, name, originalPrice, description, images } = data;
    try {

      await this.prisma.product.create({

        data: {
          user : { 
            connect: { id: user.id }
          },
          category: {
            connect: { id: categoryId }
          },
          condition, 
          contactPhone,
          location,
          name,
          originalPrice,
          description,
          images,
        }
      });

      return { status: 201, success: true, message: getMessage('PRODUCT_CREATE_SUCCESS', this.lang as 'pt') };

    } catch (error) {
      console.error(error);
        return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
    }


  }
  
  }
  export default new ProductService();