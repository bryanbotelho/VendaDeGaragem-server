import { ResultComment } from './comment';
import { ResultUser } from './user';

export interface ResultProduct {
    id: number;
    name: string;
    description?: string;
    originalPrice: number;
    discountPrice?: number;
    categoryId: number;
    conditionId: number;
    images?: string;
    location: string;
    contactPhone: string;
    createdAt: Date;
    negotiable: boolean;
    userId: number;
    user: ResultUser;
    comments: ResultComment[];
}
export interface CreateProduct {
    name: string;
    originalPrice: number;
    description?: string;
    categoryId: number;
    conditionId: number;
    images?: string;
    location: string;
    contactPhone: string;
}
export interface updateProduct {
    name: string;
    description?: string;
    originalPrice: number;
    discountPrice?: number;
    categoryId: number;
    conditionId: number;
    images?: string;
    location: string;
    contactPhone: string;
    createdAt: Date;
    negotiable: boolean;
    userId: number;
}