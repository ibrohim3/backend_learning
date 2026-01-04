const Router = require("express")
const product = Router()
const { productCreate, getProducts, getProduct, updateProduct, deleteProduct } = require("../controller/product.controller")

product.post("/", productCreate)
product.get("/", getProducts)
product.get("/:id", getProduct)
product.patch("/:id", updateProduct)
product.delete("/:id", deleteProduct)
module.exports = { product }