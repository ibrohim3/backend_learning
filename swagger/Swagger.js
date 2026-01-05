const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Foydalanuvchilar API",
            version: '1.0.0',
            description: "Foydalanuvchilar bilan ishlovchi CRUD API"
        },
        servers: [{
            url: 'http://localhost:5555'
        },]
    },
    apis: ['../routes/*.js']
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)

module.exports = { swaggerUi, swaggerSpec }