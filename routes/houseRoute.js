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
 *       - in: q
 *         name: q
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
house.get("/:id", getHouse)
house.patch("/:id", validate(houseUpdateValidation, "body"), updateHouse)
house.delete("/:id", deleteHouse)
module.exports = { house }