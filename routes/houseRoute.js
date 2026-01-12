const { Router } = require("express")
const house = Router()
const { createHouse, getHouses, getHouse, updateHouse, deleteHouse, searchHouse } = require("../controller/house.controller")
const { houseCreateValidation, houseUpdateValidation } = require("../validation/house.validation")
const { validate } = require("../middleware/validate")

/**
 * @swagger
 * tags:
 *   - name: House
 *     description: House management
 */
/**
 * @swagger
 * /house:
 *   post:
 *     summary: Yangi uy malumotini qo'shish
 *     tags: 
 *       - House
 *     description: Yangi uy malumotini qo'shish
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - region
 *             properties:
 *               region:
 *                 type: string
 *               city: 
 *                 type: string
 *               house_number:
 *                 type: number
 *               street:
 *                 type: string
 *               family_members:
 *                 type: number
 *               location: 
 *                 type: string
 *     responses:
 *       201:
 *         description: Uy malumoti muvaffaqiyatli qo'shildi
 *       400:
 *         description: Validatsiya xatosi yoki maydonlar to'ldirilmadi
 *       500:
 *         description: Server xatosi   
 */
house.post("/", validate(houseCreateValidation, "body"), createHouse)

/**
 * @swagger
 * /house:
 *   get:
 *     summary: Barcha uylar malumotini olish
 *     tags:
 *       - House
 *     responses:
 *       200: 
 *         description: Malumotlar olindi
 *       500: 
 *         description: Server xatosi
 */

house.get("/", getHouses)

/**
 * @swagger
 * /house/search:
 *   get:
 *     summary: Uy qidirish
 *     tags:
 *       - House
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema: 
 *           type: string
 *         description: Region yoki mahalla nomi 
 *     responses:
 *        200:
 *          description: Topilgan uy
 *        400:
 *          description: Qidiruv malumoti xato 
 *        404: 
 *          description: Qidiruv bo'yicha malumot topilmadi
 *        500: 
 *          description: Server xatosi
 */
house.get("/search", searchHouse)

/**
 * @swagger
 * /house/{id}:
 *   get:
 *     summary: 1 ta uy malumotinish olish
 *     tags:
 *       - House
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: Uy ID si
 *     responses: 
 *       200:
 *         description: Uy malumoti olindi
 *       400: 
 *         description: ID xato 
 *       404:
 *         description: Uy malumoti topilmadi
 *       500: 
 *         description: Server xatosi
 */
house.get("/:id", getHouse)

/**
 * @swagger
 * /house/{id}:
 *   patch:
 *     summary: Uy malumotini yangilash
 *     tags:
 *       - House
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi ID si
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region:
 *                 type: string
 *               city:
 *                 type: string
 *               house_number:
 *                 type: number
 *               street: 
 *                 type: string
 *               family_members:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *        200:
 *          description: Uy malumoti yangilandi
 *        404: 
 *          description: Uy malumoti topilmadi
 *        500: 
 *          description: Server xatosi
 */
house.patch("/:id", validate(houseUpdateValidation, "body"), updateHouse)

/**
 * @swagger
 * /house/{id}:
 *   delete:
 *     summary: Uy malumotini o'chirish
 *     tags:
 *       - House
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: string
 *         description: O'chirilishi kk bo'lgan uy ID si
 *     responses:
 *       200:
 *         description: Uy malumoti muvaffaqiyatli o'chirildi
 *       404:
 *         description: Malumot topilmadi
 *       500: 
 *         description: Server xatos
 */
house.delete("/:id", deleteHouse)
module.exports = { house }