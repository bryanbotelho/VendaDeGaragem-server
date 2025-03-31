import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { CreateUser, LoginUser } from '../@types/user';
import { PrismaClient } from '@prisma/client';
import { getMessage } from '../utils/messageHelper';
import { createUserSchema, loginUserSchema } from '../schemas/user';

const { SECRET = '123456' } = process.env;

class UserService {
    private static prisma = new PrismaClient();

    public static async generatorToken(data: LoginUser, lang: 'pt' | 'en' = 'pt') {
        const { email, senha } = data;
        
        try {
            const validator: Joi.ValidationResult = loginUserSchema(lang)
                .validate({ email, senha });
            
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, message: errorMessage };
            }

            const user = await this.prisma.user.findUnique({
                where: { email }
            });
            
            if (!user) return { status: 404, message: getMessage('USER_NO_EXISTE', lang) };
            console.log(user);
            
            const validPassword = await bcrypt.compare((senha as string), user.senha);
            if (!validPassword) return { status: 401, message: getMessage('INVALID_PASSWORD', lang) };
                    
            const { senha: _, ...newUser } = user;
            const token = jwt.sign({ data: newUser }, SECRET, { expiresIn: '1h' });
        
            return { status: 200, data: { token } };

        } catch (error) {
            console.error(error);
            return { status: 500, message: getMessage('SERVER_ERROR', lang) };
        }
    }

    public static async create(data: CreateUser, lang: 'pt' | 'en' = 'pt') {
        const { nome, email, senha, confirmarSenha, telefone } = data;

        try {
            const validator: Joi.ValidationResult = createUserSchema(lang)
                .validate({ nome, email, senha, confirmarSenha, telefone });
            
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, message: errorMessage };
            }

            if (senha !== confirmarSenha) {
                return { status: 400, message: getMessage('PASSWORDS_DO_NOT_MATCH', lang) };
            }

            const existingUser = await this.prisma.user.findFirst({
                where: { OR: [{ email }, { telefone }] }
            });

            if (existingUser) {
                const message = existingUser.email === email 
                    ? getMessage('USER_EXISTS_EMAIL', lang) 
                    : getMessage('USER_EXISTS_PHONE', lang);

                return { status: 409, message };
            } 

            const hashedPassword = await bcrypt.hash(senha, 10);

            const user = await this.prisma.user.create({
                data: {
                    nome,
                    email,
                    senha: hashedPassword,
                    telefone: telefone.replace(/\D/g, ''),
                },
            });

            await this.prisma.userRole.create({
                data: {
                    userId: user.id,
                    roleId: 1
                }
            });

            return { status: 200, message: getMessage('USER_CREATED', lang) };

        } catch (error) {
            console.error(error);
            return { status: 500, message: getMessage('SERVER_ERROR', lang) };
        }
    }
}

export default UserService;