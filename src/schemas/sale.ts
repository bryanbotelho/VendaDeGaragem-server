import Joi from 'joi';

export const CreateSaleSchema = (lang = 'pt') =>
  Joi.object({

    id: Joi.number()
    .integer()
    .required(),

    order_number: Joi.number()
      .integer()
      .positive()
      .required(),

    trasaction_id: Joi.string()
      .trim()
      .required(),

    original_price: Joi.number()
      .precision(2)
      .positive()
      .required(),

    discount_price: Joi.number()
      .precision(2)
      .min(0)
      .required(),

    final_price: Joi.number()
      .precision(2)
      .positive()
      .required(),
      
    buyer_id: Joi.string()
      .uuid()
      .required(),

    seller_id: Joi.string()
      .uuid()
      .required(),

    product_id: Joi.string()
      .uuid()
      .required(),

    sale_date: Joi.date().optional()
  })
  
