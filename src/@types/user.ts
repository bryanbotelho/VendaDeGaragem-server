import { ResultComment } from './comment';
import { ResultProduct } from './product';
import { ResultRating } from './rating';

export interface CreateUser {
    name: string,
    email: string,
    password: string,
    phone: string,
}

export interface CreatePayloadUser extends CreateUser {
    confirmPassword: string,
}

export interface LoginUser {
    email: string,
    password?: string,
}

export interface ResultUser {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date;
    active: boolean;
    resetToken: string | null;
    resetTokenExpires: Date | null;
    roles?: ResultUserRole[];
    roleId?: number;
    comments?: ResultComment[];
    ratingsGiven?: ResultRating[];
    ratingsReceived?: ResultRating[];
    products?: ResultProduct[];
}
  
export interface ResultUserRole {
    userId: number;
    roleId: number;
    user: ResultUser;
    role: Role;
}
  
export interface Role {
    id: number;
    name: string;
    users: ResultUserRole[];
}

export interface RequestPasswordReset {
    email?: string;
    phone?: string;
}

export interface VerifyResetToken extends RequestPasswordReset {
    token: string;
}

export interface ResetPassword extends VerifyResetToken {
    newPassword: string;
    confirmNewPassword: string;
}