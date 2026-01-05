const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false
        })
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.details.map(e => e.message)
            })
        }
        req[property] = value
        next()
    }
}
module.exports = { validate }