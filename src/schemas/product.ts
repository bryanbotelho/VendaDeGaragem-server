import Joi from 'joi';
import { getMessage } from '../utils/messageHelper';


export const createProductSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        name: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': getMessage('FIELD_REQUIRED_NAME', lang),
            'string.min': getMessage('NOME_MIN_LENGTH', lang),
            'string.max': getMessage('NOME_MAX_LENGTH', lang),
            'any.required': getMessage('FIELD_REQUIRED_NAME', lang)
        }),
    
        originalPrice: Joi.number()
        .greater(0)
        .required()
        .messages({
            'number.base': getMessage('ORIGINAL_PRICE_INVALID_', lang),
            'number.greater': getMessage('ORIGINAL_PRICE_THAN_ZERO', lang),
            'any.required': getMessage('FIELD_REQUIRED_ORIGINAL_PRICE', lang),
        }),

        categoryId: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({

        }),

        location: Joi.string()
        .trim()
        .min(3)
        .required()
        .messages({
            'string.base': getMessage('LOCATION_INVALID', lang),
            'string.empty': getMessage('LOCATION_EMPTY', lang),
            'string.min': getMessage('LOCATION_MIN_LENGTH', lang),
            'string.max': getMessage('LOCATION_MAX_LENGTH', lang)
        }),

        contactPhone: Joi.string()
        .trim()
        .pattern(/^(\+?(\d{1,3}))?(\(?\d{2,3}\)?\s?)?\d{4,5}[-\s]?\d{4}$/)
        .required()
        .messages({
            'string.base': getMessage('CONTACT_PHONE_INVALID', lang),
            'string.pattern.base': getMessage('CONTACT_PHONE_PATTERN_INVALID', lang),
            'string.empty': getMessage('CONTACT_PHONE_EMPTY', lang),
        })


    
    
    
    });
};