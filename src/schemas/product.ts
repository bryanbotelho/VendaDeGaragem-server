import Joi from 'joi';
import { getMessage } from '../utils/messageHelper';


export const CreateProductSchema = (lang: 'pt' | 'en' = 'pt') => {
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
        .precision(2)
        .required()
        .messages({
            'number.base': getMessage('ORIGINAL_PRICE_INVALID', lang),
            'number.greater': getMessage('ORIGINAL_PRICE_THAN_ZERO', lang),
            'any.required': getMessage('FIELD_REQUIRED_ORIGINAL_PRICE', lang),
        }),

        categoryId: Joi.number()
        .greater(0)
        .min(1)
        .required()
        .messages({
            'number.base': getMessage('CATEGORY_ID_INVALID', lang),
            'number.greater':getMessage('CATEGORY_ID_GREATER', lang),
            'number.min':getMessage('CATEGORY_ID_MIN_LENGTH', lang),
            'number.empty':getMessage('CATEGORY_ID_EMPTY', lang),
            'any.required':getMessage('CATEGORY_ID_REQUIRED', lang),

        }),

        conditionId: Joi.number()
        .greater(0)
        .min(1)
        .required()
        .messages({
           'number.base': getMessage('CONDITION_ID_INVALID', lang),
            'number.greater':getMessage('CONDITION_ID_GREATER', lang),
            'number.min':getMessage('CONDITION_ID_MIN_LENGTH', lang),
            'number.empty':getMessage('CONDITION_ID_EMPTY', lang),
            'any.required':getMessage('CONDITION_ID_REQUIRED', lang),
        }),

        location: Joi.string()
        .trim()
        .min(3)
        .required()
        .messages({
            'string.base': getMessage('LOCATION_INVALID', lang),
            'string.empty': getMessage('LOCATION_EMPTY', lang),
            'string.min': getMessage('LOCATION_MIN_LENGTH', lang),
            'string.max': getMessage('LOCATION_MAX_LENGTH', lang),
        }),

        contactPhone: Joi.string()
        .required()
        .messages({
            'string.base': getMessage('CONTACT_PHONE_INVALID', lang),
            'string.empty': getMessage('CONTACT_PHONE_EMPTY', lang),
        }),
    
    });
};
// export const UpdateProductSchema = (lang: 'pt' | 'en' = 'pt') => {
//     return Joi.object({
//         name: Joi.string()
//         .trim()
//         .min(3)
//         .max(30)
//         .required()
//         .messages({
//             'string.base': getMessage('FIELD_REQUIRED_NAME', lang),
//             'string.min': getMessage('NOME_MIN_LENGTH', lang),
//             'string.max': getMessage('NOME_MAX_LENGTH', lang),
//             'any.required': getMessage('FIELD_REQUIRED_NAME', lang)
//         }),
    
//         originalPrice: Joi.number()
//         .greater(0)
//         .precision(2)
//         .required()
//         .messages({
//             'number.base': getMessage('ORIGINAL_PRICE_INVALID', lang),
//             'number.greater': getMessage('ORIGINAL_PRICE_THAN_ZERO', lang),
//             'any.required': getMessage('FIELD_REQUIRED_ORIGINAL_PRICE', lang),
//         }),

//         categoryId: Joi.number()
//         .greater(0)
//         .min(1)
//         .required()
//         .messages({
//             'number.base': getMessage('CATEGORY_ID_INVALID', lang),
//             'number.greater':getMessage('CATEGORY_ID_GREATER', lang),
//             'number.min':getMessage('CATEGORY_ID_MIN_LENGTH', lang),
//             'number.empty':getMessage('CATEGORY_ID_EMPTY', lang),
//             'any.required':getMessage('CATEGORY_ID_REQUIRED', lang),

//         }),

//         conditionId: Joi.number()
//         .greater(0)
//         .min(1)
//         .required()
//         .messages({
//            'number.base': getMessage('CONDITION_ID_INVALID', lang),
//             'number.greater':getMessage('CONDITION_ID_GREATER', lang),
//             'number.min':getMessage('CONDITION_ID_MIN_LENGTH', lang),
//             'number.empty':getMessage('CONDITION_ID_EMPTY', lang),
//             'any.required':getMessage('CONDITION_ID_REQUIRED', lang),
//         }),

//         location: Joi.string()
//         .trim()
//         .min(3)
//         .required()
//         .messages({
//             'string.base': getMessage('LOCATION_INVALID', lang),
//             'string.empty': getMessage('LOCATION_EMPTY', lang),
//             'string.min': getMessage('LOCATION_MIN_LENGTH', lang),
//             'string.max': getMessage('LOCATION_MAX_LENGTH', lang),
//         }),

//         contactPhone: Joi.string()
//         .required()
//         .messages({
//             'string.base': getMessage('CONTACT_PHONE_INVALID', lang),
//             'string.empty': getMessage('CONTACT_PHONE_EMPTY', lang),
//         }),
//     });
// };
