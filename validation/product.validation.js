const Joi = require("joi")

const productCreateValidation = Joi.object({
    name: Joi.string().trim().required().min(3).max(20),
    price: Joi.number().integer().positive().required(),
    description: Joi.string().trim().required().min(3).max(200),
    image: Joi.string().required(),
    count: Joi.number().integer().min(0).required()
})

const productUpdateValidation = Joi.object({
    name: Joi.string().trim().optional().min(3).max(20),
    price: Joi.number().integer().positive().optional(),
    description: Joi.string().trim().optional().min(3).max(200),
    image: Joi.string().optional(),
    count: Joi.number().integer().min(0).optional()
})

module.exports = { productCreateValidation, productUpdateValidation }