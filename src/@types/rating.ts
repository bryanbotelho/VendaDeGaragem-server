import { ResultUser } from './user';

export interface ResultRating {
    id: number;
    reviewerId: number;
    ratedId: number;
    stars: number;
    comment?: string;
    createdAt: Date;
    reviewer: ResultUser;
    rated: ResultUser;
}