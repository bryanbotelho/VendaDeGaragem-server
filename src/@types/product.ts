import { ResultComment } from './comment';
import { ResultUser } from './user';

export interface ResultProduct {
    id: number;
    name: string;
    description: string;
    originalPrice: number;
    discountPrice?: number;
    category?: any;
    categoryId?: number;
    conditionId?: number;
    condition?: any;
    images?: string;
    location: string;
    contactPhone: string;
    createdAt: Date;
    negotiable: boolean;
    userId?: number;
    user?: ResultUser;
    comments: ResultComment[];
}
export interface CreateProduct {
    name: string;
    originalPrice: number;
    description: string;
    categoryId: number;
    quantidade: number;
    discountPrice: number;
    conditionId: number;
    images?: string;
    location: string;
    donate: boolean;
    negotiable: boolean;
    contactPhone: string;
    active: boolean;
}
export interface UpdateProduct {
    id?: number;
    name?: string;
    description?: string;
    quantidade?: number;
    originalPrice?: number;
    discountPrice?: number;
    categoryId?: number;
    conditionId?: number;
    images?: string[]; 
    location?: string;
    contactPhone: string;
    negotiable?: boolean;
    donate?: boolean;
    
}
