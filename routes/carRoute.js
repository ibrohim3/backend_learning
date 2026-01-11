const { Router } = require("express")
const car = Router()
const {
    carAdd,
    carGet,
    carGetById,
    updateCar,
    deleteCar,
    searchCar
} = require("../controller/car.controller")
const { carCreateValidation, carUpdateValidation } = require("../validation/car.validation")
const { validate } = require("../middleware/validate")
/**
 * @swagger
 * tags:
 *  - name: Car
 *    description: Cars management
 */
/**
 * @swagger
 * /car:
 *  post:
 *    summary: Moshina qo'shish
 *    tags:
 *      - Car
 *    description: Moshina qo'shish
 *    requestBody: 
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            required: 
 *              - model
 *              - carType
 *            properties:
 *              title:
 *                type: string
 *              model:
 *                type: string
 *              description:
 *                type: string
 *              color:
 *                type: string
 *              horsePower:
 *                type: number
 *              carType:
 *                type: string
 *              charging: 
 *                type: string
 *              weight:
 *                type: string
 *              gasoline: 
 *                type: string
 *              yearMachine:
 *                type: string
 *              price:
 *                type: string
 *    responses:
 *      201:
 *        description: Car succesfully edded
 *      400: 
 *        description: Bad request or validation error
 *      500: 
 *        description: Internal server error
 */
car.post("/", validate(carCreateValidation, "body"), carAdd)

/**
 * @swagger
 * /car:
 *   get:
 *     summary: Barcha moshinalar ro'yxatini olish
 *     tags: 
 *       - Car
 *     responses: 
 *       200: 
 *         description: Xamma moshinalar royxati olindi
 *       500: 
 *         description: Server error
 */
car.get("/", carGet)

/**
 * @swagger
 * /car/search:
 *   get: 
 *     summary: Moshina qidirish
 *     tags:
 *       - Car
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Moshina modeli yoki title kiriting
 *     responses:
 *       200:
 *         description: Topilgan moshina
 *       400:
 *         description: Qidiruv malumoti xato
 *       404:
 *         description: Qidiruv bo'yicha moshina topilmadi
 *       500:
 *         description: Server error
 */
car.get("/search", searchCar)

/**
 * @swagger
 * /car/{id}:
 *  get:
 *    summary: car ID si bilan qidirish
 *    tags:
 *      - Car
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Foydalanuvchi ID
 *    responses: 
 *      200:
 *        description: Moshina topildi
 *      400: 
 *        description: Moshina ID sida xato
 *      404: 
 *        description: Moshina topilmadi
 *      500: 
 *        description: Server xatosi
 */
car.get("/:id", carGetById)

/**
 * @swagger
 * /car/{id}:
 *   patch:
 *     summary: Moshina ma'lumotini yangilash
 *     tags:
 *       - Car
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Yangilanadigan moshina ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model
 *               - carType
 *             properties:
 *               title:
 *                 type: string
 *               model:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               horsePower:
 *                 type: number
 *               carType:
 *                 type: string
 *               charging:
 *                 type: string
 *               weight:
 *                 type: string
 *               gasoline:
 *                 type: string
 *               yearMachine:
 *                 type: string
 *               price:
 *                 type: string
 *     responses:
 *       200:
 *         description: Moshina muvaffaqiyatli yangilandi
 *       404:
 *         description: Moshina topilmadi
 *       500:
 *         description: Server xatosi
 */
car.patch("/:id", validate(carUpdateValidation, "body"), updateCar);

/**
 * @swagger
 * /car/{id}:
 *   delete:
 *     summary: Moshina malumotlarini o'chirish 
 *     tags:
 *       - Car
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O'chiriladigan moshini ID si
 *     responses:
 *       200:
 *         description: Moshina malumoti o;chirildi.
 *       404: 
 *         description: Moshina malumoti topilmadi
 *       500:
 *         descripyion: Server xatosi
 */
car.delete("/:id", deleteCar)

module.exports = { car }