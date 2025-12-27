const Router = require("express")
const user = Router()

const { postLogin, postRegister, getUsers, getUserById, updateUser, deleteUser, userSearch, } = require("../controller/user.controller")

user.post("/login", postLogin)
user.post("/", postRegister)
user.get("/", getUsers)
user.get("/userSearch", userSearch)
user.get("/:id", getUserById)
user.patch("/:id", updateUser)
user.delete("/:id", deleteUser)

module.exports = { user }