const Joi = require("joi")

const userRegisterValidation = Joi.object({
    username: Joi.string().required().trim().min(3).max(30),
    password: Joi.string().required().min(8).max(30).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/),
    firstname: Joi.string().trim().required(),
    lastname: Joi.string(),
    birthday: Joi.string().optional(),
    gender: Joi.string().optional(),
    address: Joi.string(),
    phone: Joi.string().pattern(/^\+998\d{9}$/),
})

module.exports = { userRegisterValidation }