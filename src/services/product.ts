import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { CreateProduct, ResultProduct } from '../@types/product';
import { getMessage } from 'src/utils/messageHelper';
import { CreateProductSchema, } from 'src/schemas/product';
import { ResultUser } from 'src/@types/user';

class ProductService {
    private prisma: PrismaClient;
    private lang = 'pt';

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: CreateProduct, user: any) {
        const { name, description, originalPrice, discountPrice ,categoryId, images,  conditionId, location, negotiable, contactPhone, donate } = data;
        try {

            const validator: Joi.ValidationResult = CreateProductSchema(this.lang as 'pt')
                .validate({ name, description, originalPrice, discountPrice ,categoryId, images,  conditionId, location, negotiable, contactPhone, donate });

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            let finalDonate = donate ?? false;

            if(originalPrice === 0 ){
                finalDonate = true;
            }
            if(finalDonate && originalPrice !== 0){
                return { status: 400, success: false, message: getMessage('DONATE_TRUE', this.lang as 'pt')};
            }

            const replacePhone = contactPhone.replace(/[^0-9]/g, '');

            const category_id = await this.prisma.category.findUnique({
                where: { id: categoryId },
            });
            if(!category_id){
                return { status: 400, success: false, message: getMessage('CATEGORY_ID_INVALID', this.lang as 'pt') };
            };

            const condition_id = await this.prisma.condition.findUnique({
                where: { id: conditionId },
            });
            if(!condition_id){
                return { status: 400, success: false, message: getMessage('CONDITION_ID_INVALID', this.lang as 'pt') };
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
                    contactPhone: replacePhone,
                    location,
                    discountPrice,
                    name,
                    originalPrice,
                    description,
                    images,
                    negotiable,
                    donate: finalDonate,
                }
            });

            return { status: 201, success: true, message: getMessage('PRODUCT_CREATE_SUCCESS', this.lang as 'pt') };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

    // async updateProduct(data: ResultProduct, user: ResultUser ) {
    //     const { id ,categoryId, conditionId, contactPhone, location, name, originalPrice, description, images } = data;
    //     try {
    //         const validator: Joi.ValidationResult = UpdateProductSchema(this.lang as 'pt')
    //             .validate({ name, originalPrice, categoryId, location, contactPhone, conditionId, description, images });

    //         if (validator.error) {
    //             const errorMessage = validator.error.details.map(err => err.message).join(', ');
    //             return { status: 400, success: false, message: errorMessage };
    //         }

    //         const existingProduct = await this.prisma.product.findUnique({
    //             where: { id: id }
    //         });

    //         if(!existingProduct){
    //             return { status: 404, success: false, message: getMessage('PRODUCT_NOT_FOUND', this.lang as 'pt') };
    //         }

    //         if(existingProduct.userId !== user.id){
    //             return { status: 403, success: false, message: getMessage('USER_NOT_ALLOWED', this.lang as 'pt') };
    //         }
            
    //         await this.prisma.product.update({
    //             where: { id: id },
    //             data: {
    //                 category: {
    //                     connect: { id: categoryId }
    //                 },
    //                 condition: {
    //                     connect: { id: conditionId }
    //                 },
    //                 contactPhone,
    //                 location,
    //                 name,
    //                 originalPrice,
    //                 description,
    //                 images,
    //             }
    //         });
        
    //         return { status: 200, success: true, message: getMessage('PRODUCT_UPDATE_SUCESSFULL', this.lang as 'pt'), data};
    //     }catch (error) {
    //             console.error(error);
    //             return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
    //     }
    // }



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


    async getProductAll(body: ResultProduct) {
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
                    negotiable: true,
                    donate: true
                },
            });
            return { status: 200, success: true, allproduct };
            
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

}
export default new ProductService();