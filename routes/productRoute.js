const Router = require("express")
const product = Router()
const { productCreate, getProducts, getProduct } = require("../controller/product.controller")

product.post("/", productCreate)
product.get("/", getProducts)
product.get("/:id", getProduct)
module.exports = { product }