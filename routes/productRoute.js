const Router = require("express")
const product = Router()
const { productCreate, getProducts, getProduct, updateProduct, deleteProduct, searchProduct } = require("../controller/product.controller")
const { productCreateValidation, productUpdateValidation } = require("../validation/product.validation")
const { validate } = require("../middleware/validate")

/**
 * @swagger
 *   tags:
 *    - name: Product
 *      description: Maxsulotlar
 */
/**
 * @swagger
 * /products:
 *   post: 
 *     tags:
 *       - Product
 *     description: Maxsulot qoshish
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - name
 *               - price
 *               - description
 *               - image
 *               - count
 *             properties: 
 *               name: 
 *                 type: string
 *               price:
 *                 type: number
 *               description: 
 *                 type: string
 *               image: 
 *                 type: string
 *               count: 
 *                 type: number
 *     responses:
 *       201:
 *         description: Maxsulot qo'shildi
 *       400:
 *         description: Xato so'rov yoki validate xatosi
 *       500:
 *         description: Server xatosi
 */
product.post("/", validate(productCreateValidation, 'body'), productCreate)

/**
 * @swagger
 * /products:
 *   get:   
 *     summary: Barcha maxsulotlar ro'yxatini olish
 *     tags: 
 *       - Product
 *     responses:
 *       200: 
 *         description: Barcha maxsulotlar royxati olindi
 *       404:
 *         description: Maxsulot topilmadi
 *       500: 
 *         description: Server xatosi
 */
product.get("/", getProducts)

/**
 * @swagger
 * /products/{id}:
 *   get: 
 *     summary: Id bilan olish
 *     tags: 
 *       - Product
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: maxsulot id
 *     responses:
 *       200:
 *         description: maxsulot topildi
 *       404:
 *         description: maxsulot topilmadi
 *       500:
 *         description: server xatosi
 */
product.get("/:id", getProduct)

product.get("/search", searchProduct)
product.patch("/:id", validate(productUpdateValidation, 'body'), updateProduct)
product.delete("/:id", deleteProduct)
module.exports = { product }