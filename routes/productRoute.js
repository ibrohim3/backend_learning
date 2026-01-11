const Router = require("express")
const product = Router()
const { productCreate, getProducts, getProduct, updateProduct, deleteProduct, searchProduct } = require("../controller/product.controller")
const { productCreateValidation, productUpdateValidation } = require("../validation/product.validation")
const { validate } = require("../middleware/validate")

/**
 * @swagger
 *   tags:
 *    - name: Product 
 *      description: Products management 
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
 * /products/search:
 *   get:
 *     summary: Maxsulot qidirish
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: maxsulot nomi
 *     responses:
 *       200: 
 *         description: Qidirilnmagan maxsulot topildi!
 *       400: 
 *         description: Qidiruv so'rovi xato
 *       404: 
 *         description: Qidiruv bo'yicha maxsulot topilmadi
 *       500:
 *         description: Server xatosi
 */
product.get("/search", searchProduct)

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

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Mxsulotni yangilash
 *     tags:
 *       - Product
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Yangilanadigan maxsulot ID si
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price: 
 *                 type: number
 *               deacription:
 *                 type: string
 *               image: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Maxsulot yangilandi!
 *       400:
 *         description: Noto'g'ri ID yoki bunday nom allaqachon mavjud
 *       404:
 *         description: Maxsulot topilmadi
 *       500: 
 *         description: Server xatosi
 */
product.patch("/:id", validate(productUpdateValidation, 'body'), updateProduct)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Maxsulot o'chirish
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:  
 *           type: string
 *         description: O'chilishi kerak bo'lgan maxsolut ID si
 *     responses:
 *       200: 
 *         description: Maxsulot o'chirildi!
 *       404:
 *         description: Maxsulot topilmadi.
 *       500:
 *         description: Server xatosi
 */
product.delete("/:id", deleteProduct)
module.exports = { product }