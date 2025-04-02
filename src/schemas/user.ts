import Joi from 'joi';
import { getMessage } from '../utils/messageHelper';

export const createUserSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': getMessage('FIELD_REQUIRED_NAME', lang),
                'string.min': getMessage('NOME_MIN_LENGTH', lang),
                'string.max': getMessage('NOME_MAX_LENGTH', lang),
                'any.required': getMessage('FIELD_REQUIRED_NAME', lang)
            }),

        password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d!@#\\$%\\^&\\*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]{6,}$'))
            .required()
            .messages({
                'string.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'string.pattern.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'any.required': getMessage('FIELD_REQUIRED_PASSWORD', lang)
            }),

        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.only': getMessage('CONFIRM_PASSWORD_MISMATCH', lang),
                'any.required': getMessage('FIELD_REQUIRED_CONFIRMPASSWORD', lang)
            }),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
                'string.base': getMessage('EMAIL_INVALID', lang),
                'string.email': getMessage('EMAIL_INVALID', lang),
                'any.required': getMessage('FIELD_REQUIRED_EMAIL', lang)
            }),

        phone: Joi.string()
            .required()
            .messages({
                'string.base': getMessage('PHONE_INVALID', lang),
                'any.required': getMessage('FIELD_REQUIRED_PHONE', lang)
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
                'any.required': getMessage('FIELD_REQUIRED_EMAIL', lang)
            }),

        password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d!@#\\$%\\^&\\*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]{6,}$'))
            .required()
            .messages({
                'string.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'string.pattern.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'any.required': getMessage('FIELD_REQUIRED_PASSWORD', lang)
            }),
        });
};

export const generatorResetTokenSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .messages({
                'string.base': getMessage('EMAIL_INVALID', lang),
                'string.email': getMessage('EMAIL_INVALID', lang)
            }),

        phone: Joi.string()
            .messages({
                'string.base': getMessage('PHONE_INVALID', lang),
            }),
    }).or('email', 'phone')
    .messages({
        'object.missing': getMessage('AT_LEAST_ONE_REQUIRED', lang)
    });
};

export const validatorResetTokenSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .messages({
                'string.base': getMessage('EMAIL_INVALID', lang),
                'string.email': getMessage('EMAIL_INVALID', lang)
            }),

        phone: Joi.string()
            .messages({
                'string.base': getMessage('PHONE_INVALID', lang),
            }),
        token: Joi.string()
            .length(6)
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.base': getMessage('INVALID_TOKEN', lang),
                'string.length': getMessage('TOKEN_LENGTH_INVALID', lang),
                'string.pattern.base': getMessage('TOKEN_PATTERN_INVALID', lang),
            }),
    }).or('email', 'phone')
    .messages({
        'object.missing': getMessage('AT_LEAST_ONE_REQUIRED', lang)
    });
};

export const resetPasswordSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .messages({
                'string.base': getMessage('EMAIL_INVALID', lang),
                'string.email': getMessage('EMAIL_INVALID', lang)
            }),

        phone: Joi.string()
            .messages({
                'string.base': getMessage('PHONE_INVALID', lang),
            }),
        token: Joi.string()
            .length(6)
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.base': getMessage('INVALID_TOKEN', lang),
                'string.length': getMessage('TOKEN_LENGTH_INVALID', lang),
                'string.pattern.base': getMessage('TOKEN_PATTERN_INVALID', lang),
                'any.required': getMessage('FIELD_REQUIRED_TOKEN', lang)
            }),
        newPassword: Joi.string()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d!@#\\$%\\^&\\*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]{6,}$'))
            .required()
            .messages({
                'string.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'string.pattern.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'any.required': getMessage('FIELD_REQUIRED_PASSWORD', lang)
            }),

        confirmNewPassword: Joi.string()
            .valid(Joi.ref('newPassword'))
            .required()
            .messages({
                'any.only': getMessage('CONFIRM_PASSWORD_MISMATCH', lang),
                'any.required': getMessage('FIELD_REQUIRED_CONFIRMPASSWORD', lang)
            }),
    }).or('email', 'phone')
    .messages({
        'object.missing': getMessage('AT_LEAST_ONE_REQUIRED', lang)
    });
};