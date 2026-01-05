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
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Validatsiya xatosi
 *       500:
 *         description: Server xatosi
 */

user.post('/', validate(userRegisterValidation, 'body'), postRegister)





user.post('/login', postLogin)
user.get('/', getUsers)
user.get('/userSearch', userSearch)
user.get('/:id', getUserById)
user.patch('/:id', validate(userUpdateValidation), updateUser)
user.delete('/:id', deleteUser)

module.exports = { user }
