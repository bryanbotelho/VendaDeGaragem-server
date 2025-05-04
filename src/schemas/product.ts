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
        .min(0)
        .precision(2)
        .required()
        .messages({
            'number.base': getMessage('ORIGINAL_PRICE_INVALID', lang),
            'number.min': getMessage('ORIGINAL_PRICE_ZERO', lang),
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
    
        description: Joi.string()
        .min(10)
        .max(300)
        .required()
        .messages({
            'string.base': getMessage('DESCRIPTION_INVALID', lang),
            'string.min': getMessage('DESCRIPTION_TOO_SHORT', lang),
            'string.max': getMessage('DESCRIPTION_TOO_LONG', lang),
            'string.required': getMessage('FIELD_REQUIRED_DESCRIPTION', lang),
        }),

        images: Joi.array()
        .items(Joi.string().uri())
        .min(1)
        .messages({
            'array.base': getMessage('IMAGES_INVALID', lang),
            'array.min': getMessage('IMAGES_MIN_ONE', lang),
        }),

        negotiable: Joi.boolean()
        .messages({
            'boolean.base': getMessage('NEGOTIABLE_INVALID', lang),
        }),
        
        discountPrice: Joi.number()
        .required()
        .min(0)
        .messages({
            'number.base': getMessage('DISCOUNT_PRICE_INVALID', lang),
            'num.min': getMessage('DISCOUNT_PRICE_MIN', lang),
            'number.required': getMessage('DISCOUNT_PRICE_REQUIRED', lang),
        }),

        donate: Joi.boolean()
        .messages({
            'boolean.base': getMessage('DONATE_INVALID', lang),
         }),

         quantidade: Joi.number()
         .integer()
         .greater(0)
         .messages({
            'number.integer': getMessage('QUANTITY_INTEGER', lang),
            'number.greater': getMessage('QUANTITY_GREATER', lang),
         }),

    });
};
export const UpdateProductSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        name: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .messages({
            'string.base': getMessage('FIELD_REQUIRED_NAME', lang),
            'string.min': getMessage('NOME_MIN_LENGTH', lang),
            'string.max': getMessage('NOME_MAX_LENGTH', lang),
        }),
        description: Joi.string()
        .min(10)
        .max(300)
        .messages({
            'string.base': getMessage('DESCRIPTION_INVALID', lang),
            'string.min': getMessage('DESCRIPTION_TOO_SHORT', lang),
            'string.max': getMessage('DESCRIPTION_TOO_LONG', lang),
        }),
    
        originalPrice: Joi.number()
        .precision(2)
        .messages({
            'number.base': getMessage('ORIGINAL_PRICE_INVALID', lang),
        }),
        discountPrice: Joi.number()
        .min(0)
        .messages({
            'number.base': getMessage('DISCOUNT_PRICE_INVALID', lang),
            'num.min': getMessage('DISCOUNT_PRICE_MIN', lang),
        }),

        categoryId: Joi.number()
        .greater(0)
        .min(1)
        .messages({
            'number.base': getMessage('CATEGORY_ID_INVALID', lang),
            'number.greater':getMessage('CATEGORY_ID_GREATER', lang),
            'number.min':getMessage('CATEGORY_ID_MIN_LENGTH', lang),
            'number.empty':getMessage('CATEGORY_ID_EMPTY', lang),

        }),

        conditionId: Joi.number()
        .greater(0)
        .min(1)
        .messages({
           'number.base': getMessage('CONDITION_ID_INVALID', lang),
            'number.greater':getMessage('CONDITION_ID_GREATER', lang),
            'number.min':getMessage('CONDITION_ID_MIN_LENGTH', lang),
            'number.empty':getMessage('CONDITION_ID_EMPTY', lang),
           
        }),

        images: Joi.array()
        .items(Joi.string().uri())
        .min(1)
        .messages({
            'array.base': getMessage('IMAGES_INVALID', lang),
            'array.min': getMessage('IMAGES_MIN_ONE', lang),
        }),

        location: Joi.string()
        .trim()
        .min(3)
        .messages({
            'string.base': getMessage('LOCATION_INVALID', lang),
            'string.empty': getMessage('LOCATION_EMPTY', lang),
            'string.min': getMessage('LOCATION_MIN_LENGTH', lang),
        }),

       contactPhone: Joi.string()
        .messages({
            'string.base': getMessage('CONTACT_PHONE_INVALID', lang),
            'string.empty': getMessage('CONTACT_PHONE_EMPTY', lang),
        }),

        negotiable: Joi.boolean()
        .messages({
            'boolean.base': getMessage('NEGOTIABLE_INVALID', lang),
            
        }),

        donate: Joi.boolean()
        .messages({
            'boolean.base': getMessage('DONATE_INVALID', lang),
         }),
        
         quantidade: Joi.number()
         .integer()
         .greater(0)
         .messages({
            'number.integer': getMessage('QUANTITY_INTEGER', lang),
            'number.greater': getMessage('QUANTITY_GREATER', lang),
         }),

    });
};
export const DeleteProductSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        id: Joi.number()
        .greater(0)
        .min(1)
        .required()
        .messages({
            'number.base': getMessage('DELETE_PRODUCT_ID_INVALID', lang),
            'number.greater':getMessage('DELETE_PRODUCT_ID_GREATER', lang),
            'number.min':getMessage('DELETE_PRODUCT_ID_MIN_LENGTH', lang),
            'number.empty':getMessage('DELETE_PRODUCT_ID_EMPTY', lang),
            'any.required':getMessage('DELETE_PRODUCT_ID_REQUIRED', lang),
        })
    });
};
