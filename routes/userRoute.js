const { Router } = require('express')
const user = Router()
const {
    postLogin,
    postRegister,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    userSearch
} = require('../controller/user.controller')
const {
    userRegisterValidation,
    userUpdateValidation
} = require('../validation/user.validation')
const { validate } = require('../middleware/validate')
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Yangi foydalanuvchini ro'yxatdan o'tkazish
 *     tags:
 *       - Users
 *     description: Yangi foydalanuvchi yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchi uchun yagona username
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi akkaunti paroli
 *               firstname:
 *                 type: string
 *                 description: Foydalanuvchi ismi
 *               lastname:
 *                 type: string
 *                 description: Foydalanuvchi familiyasi
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Tug‘ilgan sana (YYYY-MM-DD)
 *               gender:
 *                 type: string
 *                 description: Foydalanuvchi jinsi
 *               address:
 *                 type: string
 *                 description: Foydalanuvchi manzili
 *               phone:
 *                 type: string
 *                 description: Foydalanuvchi telefon raqami
 *               product_id:
 *                 type: string
 *                 description: Product ID
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Server xatosi
 */
user.post('/', validate(userRegisterValidation, 'body'), postRegister)
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login qilish
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Foydalanuvchi nomi
 *               password:
 *                 type: string
 *                 description: Parol
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli kirildi
 *       401:
 *         description: Parol yoki foydalanuvchi nomi xato
 *       500:
 *         description: Server xatosi
 */
user.post('/login', postLogin)
/**
 * @swagger
 * /user:
 *    get:
 *      summary: Hamma foydalanuvchilarni olish
 *      tags:
 *        - Users
 *      responses:
 *        200:
 *          description: Hammasi foydalanuvchilar royxati
 *        500: 
 *          description: Server xatosi
 */
user.get('/', getUsers)
/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Foydalanuvchi qidirish
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi nomi, ismi yoki familiyasi
 *     responses:
 *       200:
 *         description: Topilgan foydalanuvchilar
 *       400:
 *         description: Qidiruv malumoti xato
 *       404:
 *         description: Qidiruv bo‘yicha topilmadi
 *       500:
 *         description: Server xatosi
 */
user.get('/search', userSearch)
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: 1 ta foydalanuvchini ID si orqali olish
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi olindi
 *       400:
 *         description: Foydalanuchi ID si xato
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
user.get('/:id', getUserById)
/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Foydalanuvchi ma'lumotlarini yangilash
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Yangilanadigan foydalanuvchi ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Yangilanishi mumkin bo'lgan username
 *               lastname:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Agar o'zgartirilsa, password hash qilinadi
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *       400:
 *         description: Username allaqachon mavjud yoki noto‘g‘ri ID
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
user.patch('/:id', validate(userUpdateValidation), updateUser);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Foydalanuvchini o‘chirish
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O‘chiriladigan foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
user.delete('/:id', deleteUser);
module.exports = { user }
