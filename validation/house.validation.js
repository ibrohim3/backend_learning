const Joi = require("joi")

const houseCreateValidation = Joi.object({
    region: Joi.string().required().trim().min(3).max(20),
    city: Joi.string().required().trim().min(3).max(20),
    house_number: Joi.number().integer().positive().required(),
    street: Joi.string().required().trim().min(3).max(20),
    family_members: Joi.number().required().positive(),
    location: Joi.string().required().trim().min(3).max(20)
})

const houseUpdateValidation = Joi.object({
    region: Joi.string().optional().trim().min(3).max(20),
    city: Joi.string().optional().trim().min(3).max(20),
    house_number: Joi.number().integer().positive().optional(),
    street: Joi.string().optional().trim().min(3).max(20),
    family_members: Joi.number().optional().positive(),
    location: Joi.string().optional().trim().min(3).max(20)
})

module.exports = { houseCreateValidation, houseUpdateValidation }