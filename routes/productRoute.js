const Router = require("express")
const product = Router()
const { productCreate } = require("../controller/product.controller")

product.post("/", productCreate)

module.exports = { product }