import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import crypto from 'crypto';

import {
    CreatePayloadUser,
    LoginUser,
    ResultUser,
    RequestPasswordReset,
    VerifyResetToken,
    ResetPassword
} from '../@types/user';
import { PrismaClient } from '@prisma/client';
import { getMessage } from '../utils/messageHelper';
import TwilioService from '../utils/sms';
import MailService from '../utils/email';
import {
    createUserSchema,
    loginUserSchema,
    generatorResetTokenSchema,
    validatorResetTokenSchema,
    resetPasswordSchema,
    getUserByEmailSchema
} from '../schemas/user';

const { SECRET = '123456', MY_APP } = process.env;

class UserService {
    private prisma: PrismaClient;
    private lang = 'pt';

    constructor() {
        this.prisma = new PrismaClient();
    }

    async generatorToken(data: LoginUser) {
        const { email, password } = data;
        
        try {
            const validator: Joi.ValidationResult = loginUserSchema(this.lang as 'pt')
                .validate({ email, password });
            
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const user = await this.prisma.user.findUnique({
                where: { email }
            });
            
            if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', this.lang as 'pt') };

            const validPassword = await bcrypt.compare((password as string), user.password);
            if (!validPassword) return { status: 401, success: false, message: getMessage('INVALID_PASSWORD', this.lang as 'pt') };
                    
            const { password: _, ...newUser } = user;
            const token = jwt.sign({ data: newUser }, SECRET, { expiresIn: '1h' });
        
            return { status: 200, success: true, data: { token } };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

    async create(data: CreatePayloadUser) {
        const { name, email, password, confirmPassword, phone } = data;

        try {
            const validator: Joi.ValidationResult = createUserSchema(this.lang as 'pt')
                .validate({ name, email, password, confirmPassword, phone });
            
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const existingUser = await this.prisma.user.findFirst({
                where: { OR: [{ email }, { phone }] }
            });

            if (existingUser) {
                const message = existingUser.email === email 
                    ? getMessage('USER_EXISTS_EMAIL', this.lang as 'pt') 
                    : getMessage('USER_EXISTS_PHONE', this.lang as 'pt');

                return { status: 409, success: false, message };
            } 

            const hashedPassword = await bcrypt.hash(password, 10);

            await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    phone: phone.replace(/\D/g, ''),
                    roleId: 1
                },
            });

            return { status: 200, success: true, message: getMessage('USER_CREATED', this.lang as 'pt') };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }  

    async requestPasswordReset(data: RequestPasswordReset) {
        const { email, phone } = data;

        try {
            const validator: Joi.ValidationResult = generatorResetTokenSchema(this.lang as 'pt').validate(data);

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const { token, expiresAt } = await this.generatorResetToken();

            const user = email
                ? await this.prisma.user.findUnique({ where: { email } })
                : await this.prisma.user.findUnique({ where: { phone } });

            if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', this.lang as 'pt') };

            await this.prisma.user.update({ 
                where: { id: user.id },
                data: { resetToken: token, resetTokenExpires: expiresAt }
            });

            const { success } = email
                ? await MailService.sendMail(email, 'Recuperação de Senha', `Seu código de verificação para ${MY_APP} é: ${token}`)
                : await TwilioService.sendSMS(`+55${phone}`, `Seu código de verificação para ${MY_APP} é: ${token}`);

            if (!success) return { success, status: 400, message: getMessage('ERROR_SERVICE_TOKEN', this.lang as 'pt') };

            return { status: 200, success: true, data: { token , ...data } };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    };

    private async generatorResetToken() {
        const token = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
        return { token, expiresAt };
    }

    async verifyResetToken(data: VerifyResetToken) {
        const { token, email, phone } = data;

        try {
            const validator: Joi.ValidationResult = validatorResetTokenSchema(this.lang as 'pt').validate(data);

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const user = email
                ? await this.prisma.user.findUnique({ where: { email } })
                : await this.prisma.user.findUnique({ where: { phone } });

            if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', this.lang as 'pt') };
            
            const { success, message, status } = await this.validateToken(user, token);
            if (!success) return { status, success, message };

            return { status, success, message: getMessage('SUCESS_TOKEN', this.lang as 'pt') };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    };

    private async validateToken(user: ResultUser, token: string) {
        if (!user || user.resetToken !== token)
            return { status: 400, message: getMessage('INVALID_TOKEN', this.lang as 'pt'), success: false };
        if (!user.resetTokenExpires || user.resetTokenExpires < new Date())
            return { status: 400, message: getMessage('EXPIRED_TOKEN', this.lang as 'pt'), success: false };

        return { status: 200, success: true };
    }

    async resetPassword(data: ResetPassword) {
        try {
            const { newPassword, email, phone, token } = data;

            const validator: Joi.ValidationResult = resetPasswordSchema(this.lang as 'pt').validate(data);

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const user = email
                ? await this.prisma.user.findUnique({ where: { email } })
                : await this.prisma.user.findUnique({ where: { phone } });

            if (!user) return { status: 400, success: false, message: getMessage('USER_NO_EXISTE', this.lang as 'pt') };
            
            const { success, message, status } = await this.validateToken(user, token);
            if (!success) return { status, success, message };

            await this.prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword, resetToken: null, resetTokenExpires: null },
            });

            return { success: true, status: 200, message: getMessage('PASSWORD_RESET_SUCESS', this.lang as 'pt') };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

    async getUsers() {
        try {
            const users = await this.prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    active: true,
                    phone: true,
                    createdAt: true,
                    products: true,
                    role: {
                        select: {
                            name: true,
                        }
                    },
                    comments: true,
                },
            });
            
            return { status: 200, success: true, data: users };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

    async getUserByEmail(email: string) {
        try {
            const validator: Joi.ValidationResult = getUserByEmailSchema(this.lang as 'pt').validate({ email });
    
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const user = await this.prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    active: true,
                    phone: true,
                    createdAt: true,
                    products: true,
                    role: {
                        select: {
                            name: true,
                        }
                    },
                    comments: true,
                },
            });
            
            return { status: 200, success: true, data: user };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }
}

export default new UserService();