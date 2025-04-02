import { ResultComment } from './comment';
import { ResultUser } from './user';

export interface ResultProduct {
    id: number;
    name: string;
    description?: string;
    originalPrice: number;
    discountPrice?: number;
    category: string;
    condition: string;
    images?: string;
    location: string;
    contactPhone: string;
    createdAt: Date;
    negotiable: boolean;
    userId: number;
    user: ResultUser;
    comments: ResultComment[];
}