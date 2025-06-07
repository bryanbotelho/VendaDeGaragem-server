import { ResultProduct } from './product';
import { ResultUser } from './user';

export interface ResultComment {
    id: number;
    productId: number;
    userId: number;
    text: string;
    createdAt: Date;
    product: ResultProduct;
    user: ResultUser;
}