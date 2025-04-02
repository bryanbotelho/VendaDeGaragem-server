import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import crypto from 'crypto';

import { CreatePayloadUser, LoginUser, ResultUser } from '../@types/user';
import { PrismaClient } from '@prisma/client';
import { getMessage } from '../utils/messageHelper';
import {
    createUserSchema,
    loginUserSchema,
    generatorResetTokenSchema,
    validatorResetTokenSchema,
    resetPasswordSchema
} from '../schemas/user';

const { SECRET = '123456' } = process.env;

class UserService {
    private static prisma = new PrismaClient();

    constructor() {}

    public static async generatorToken(data: LoginUser, lang: 'pt' | 'en' = 'pt') {
        const { email, password } = data;
        
        try {
            const validator: Joi.ValidationResult = loginUserSchema(lang)
                .validate({ email, password });
            
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const user = await this.prisma.user.findUnique({
                where: { email }
            });
            
            if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', lang) };

            const validPassword = await bcrypt.compare((password as string), user.password);
            if (!validPassword) return { status: 401, success: false, message: getMessage('INVALID_PASSWORD', lang) };
                    
            const { password: _, ...newUser } = user;
            const token = jwt.sign({ data: newUser }, SECRET, { expiresIn: '1h' });
        
            return { status: 200, success: true, data: { token } };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', lang) };
        }
    }

    public static async create(data: CreatePayloadUser, lang: 'pt' | 'en' = 'pt') {
        const { name, email, password, confirmPassword, phone } = data;

        try {
            const validator: Joi.ValidationResult = createUserSchema(lang)
                .validate({ name, email, password, confirmPassword, phone });
            
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            if (password !== confirmPassword) {
                return { status: 400, success: false, message: getMessage('PASSWORDS_DO_NOT_MATCH', lang) };
            }

            const existingUser = await this.prisma.user.findFirst({
                where: { OR: [{ email }, { phone }] }
            });

            if (existingUser) {
                const message = existingUser.email === email 
                    ? getMessage('USER_EXISTS_EMAIL', lang) 
                    : getMessage('USER_EXISTS_PHONE', lang);

                return { status: 409, success: false, message };
            } 

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    phone: phone.replace(/\D/g, ''),
                },
            });

            await this.prisma.userRole.create({
                data: {
                    userId: user.id,
                    roleId: 1
                }
            });

            return { status: 200, success: true, message: getMessage('USER_CREATED', lang) };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', lang) };
        }
    }  

    public static async requestPasswordReset(data: { email?: string; phone?: string }, lang: 'pt' | 'en' = 'pt') {
        const { email, phone } = data;

        try {
            const validator: Joi.ValidationResult = generatorResetTokenSchema(lang).validate(data);

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const { token, expiresAt } = await this.generatorResetToken();

            if (email) {
                const user = await this.prisma.user.findUnique({ where: { email } });
                if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', lang) };

                await this.prisma.user.update({
                    where: { email },
                    data: { resetToken: token, resetTokenExpires: expiresAt },
                });

                return { status: 200, success: true, data: token };
            }

            if (phone) {
                const user = await this.prisma.user.findUnique({ where: { phone } });
                if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', lang) };

                await this.prisma.user.update({
                    where: { phone },
                    data: { resetToken: token, resetTokenExpires: expiresAt },
                });

                return { status: 200, success: true, data: token };
            }

            return { status: 402, success: false, message: getMessage('SERVER_ERROR', lang) };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', lang) };
        }
    };

    private static async generatorResetToken() {
        const token = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
        return { token, expiresAt };
    }

    public static async verifyResetToken(
        data: { email?: string, phone?: string, token: string }, 
        lang: 'pt' | 'en' = 'pt'
    ) {
        const { token, email, phone } = data;

        try {
            const validator: Joi.ValidationResult = validatorResetTokenSchema(lang).validate(data);

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            if (email) {
                const user = await this.prisma.user.findUnique({ where: { email } });
                if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', lang) };

                const { success, message, status } = await this.validateToken(user, token, lang);

                if (!success) return { status, success, message };

                return { status, success, message: getMessage('SUCESS_TOKEN', lang) };
            }

            if (phone) {
                const user = await this.prisma.user.findUnique({ where: { phone } });
                if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', lang) }; 

                const { success, message, status } = await this.validateToken(user, token, lang);

                if (!success) return { status, success, message };

                return { status, success, message: getMessage('SUCESS_TOKEN', lang) };
            }

            return { status: 500, success: false, message: getMessage('SERVER_ERROR', lang) };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', lang) };
        }
    };

    private static async validateToken(user: ResultUser, token: string, lang: 'pt' | 'en') {
        if (!user || user.resetToken !== token)
            return { status: 400, message: getMessage('INVALID_TOKEN', lang), success: false };
        if (!user.resetTokenExpires || user.resetTokenExpires < new Date())
            return { status: 400, message: getMessage('EXPIRED_TOKEN', lang), success: false };

        return { status: 200, success: true };
    }

    public static async resetPassword(
        data: { email?: string, phone?: string, newPassword: string, confirmNewPassword: string, token: string },
        lang: 'pt' | 'en' = 'pt'
    ) {
        try {
            const { confirmNewPassword, newPassword, email, phone, token } = data;

            const validator: Joi.ValidationResult = resetPasswordSchema(lang).validate(data);

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            if (newPassword !== confirmNewPassword)
                return { status: 400, success: false, message: getMessage('PASSWORDS_DO_NOT_MATCH', lang) };

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            if (email) {
                const user = await this.prisma.user.findUnique({ where: { email } });
                if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', lang) };
                
                const { success, message, status } = await this.validateToken(user, token, lang);

                if (!success) return { status, success, message };

                await this.prisma.user.update({
                    where: { email },
                    data: { password: hashedPassword, resetToken: null, resetTokenExpires: null },
                });

                return { success: true, status: 200, message: getMessage('PASSWORD_RESET_SUCESS', lang) };
            }

            if (phone) {
                const user = await this.prisma.user.findUnique({ where: { phone } });
                if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', lang) }; 

                const { success, message, status } = await this.validateToken(user, token, lang);

                if (!success) return { status, success, message };

                await this.prisma.user.update({
                    where: { phone },
                    data: { password: hashedPassword, resetToken: null, resetTokenExpires: null },
                });

                return { success: true, status: 200, message: getMessage('PASSWORD_RESET_SUCESS', lang) };
            }

            return { success: false, status: 402, message: getMessage('SERVER_ERROR', lang) };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', lang) };
        }
        
    }
}

export default UserService;