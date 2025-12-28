const Joi = require("joi")

const carCreateValidation = Joi.object({
    title: Joi.string().required().trim().min(5).max(30),
    model: Joi.string().required().trim().min(5),
    description: Joi.string(),
    color: Joi.string().required().min(3).max(20),
    horsePower: Joi.number().required(),
    carType: Joi.string().required(),
    charging: Joi.string(),
    weight: Joi.string().required(),
    gasoline: Joi.string().required(),
    yearMachine: Joi.string().required(),
    price: Joi.string().required()
})

const carUpdateValidation = Joi.object({
    title: Joi.string().optional().trim().min(5).max(30),
    model: Joi.string().optional().trim().min(5),
    description: Joi.string(),
    color: Joi.string().optional().min(3).max(20),
    horsePower: Joi.number().optional(),
    carType: Joi.string().optional(),
    charging: Joi.string(),
    weight: Joi.string().optional(),
    gasoline: Joi.string().optional(),
    yearMachine: Joi.string().optional(),
    price: Joi.string().optional()
})

module.exports = { carCreateValidation, carUpdateValidation }