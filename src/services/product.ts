import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { CreateProduct } from '../@types/product';
import { getMessage } from 'src/utils/messageHelper';
import { CreateProductSchema } from 'src/schemas/product';
import { ResultUser } from 'src/@types/user';
import { Message } from 'twilio/lib/twiml/MessagingResponse';
import product from '@controllers/product';




class ProductService {
    private prisma: PrismaClient;
    private lang = 'pt';

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: CreateProduct, user: any) {
        const { categoryId, conditionId, contactPhone, location, name, originalPrice, description, images } = data;
        try {

            const validator: Joi.ValidationResult = CreateProductSchema(this.lang as 'pt')
                .validate({ name, originalPrice, categoryId, location, contactPhone, conditionId });

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            await this.prisma.product.create({

                data: {
                    user: {
                        connect: { id: user.id }
                    },
                    category: {
                        connect: { id: categoryId }
                    },
                    condition: {
                        connect: { id: conditionId }
                    },
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


    async getProductByUser(user: ResultUser) {
        try {
            const products = await this.prisma.product.findMany({
                where: { userId: user.id },
            });

            return { status: 200, success: true, data: products };
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }


    async getProductAll(user: any) {
        try {
            const allproduct = await this.prisma.product.findMany({
                select: {
                    userId: true,
                    id: true,
                    name: true,
                    originalPrice: true,
                    discountPrice: true,
                    conditionId: true,
                    categoryId: true,
                    location: true,
                    contactPhone: true,
                },
            });
            return { status: 200, success: true, data: allproduct };
            
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

}
export default new ProductService();