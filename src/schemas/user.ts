import Joi from 'joi';
import { getMessage } from '../utils/messageHelper';

export const createUserSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        nome: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': getMessage('FIELD_REQUIRED', lang),
                'string.min': getMessage('NOME_MIN_LENGTH', lang),
                'string.max': getMessage('NOME_MAX_LENGTH', lang),
                'any.required': getMessage('FIELD_REQUIRED', lang)
            }),

        senha: Joi.string()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d!@#\\$%\\^&\\*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]{6,}$'))
            .required()
            .messages({
                'string.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'string.pattern.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'any.required': getMessage('FIELD_REQUIRED', lang)
            }),

        confirmarSenha: Joi.string()
            .valid(Joi.ref('senha'))
            .required()
            .messages({
                'any.only': getMessage('CONFIRM_PASSWORD_MISMATCH', lang),
                'any.required': getMessage('FIELD_REQUIRED', lang)
            }),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
                'string.base': getMessage('EMAIL_INVALID', lang),
                'string.email': getMessage('EMAIL_INVALID', lang),
                'any.required': getMessage('FIELD_REQUIRED', lang)
            }),

        telefone: Joi.string()
            .required()
            .messages({
                'string.base': getMessage('PHONE_INVALID', lang),
                'any.required': getMessage('FIELD_REQUIRED', lang)
            })
    });
};

export const loginUserSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
                'string.base': getMessage('EMAIL_INVALID', lang),
                'string.email': getMessage('EMAIL_INVALID', lang),
                'any.required': getMessage('FIELD_REQUIRED', lang)
            }),

        senha: Joi.string()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d!@#\\$%\\^&\\*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]{6,}$'))
            .required()
            .messages({
                'string.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'string.pattern.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'any.required': getMessage('FIELD_REQUIRED', lang)
            }),
        });
};