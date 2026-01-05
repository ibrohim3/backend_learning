const Router = require("express")
const user = Router()

const { postLogin, postRegister, getUsers, getUserById, updateUser, deleteUser, userSearch, } = require("../controller/user.controller")
const { userRegisterValidation, userUpdateValidation } = require("../validation/user.validation")
const { validate } = require("../middleware/validate")

user.post("/login", postLogin)
user.post("/", validate(userRegisterValidation, "body"), postRegister)
user.get("/", getUsers)
user.get("/userSearch", userSearch)
user.get("/:id", getUserById)
user.patch("/:id", validate(userUpdateValidation), updateUser)
user.delete("/:id", deleteUser)

module.exports = { user }

/** swagger
 * 
 */