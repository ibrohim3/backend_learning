const { Router } = require("express")
const house = Router()
const { createHouse, getHouses, getHouse, updateHouse, deleteHouse, searchHouse } = require("../controller/house.controller")
const { houseCreateValidation, houseUpdateValidation } = require("../validation/house.validation")
const { validate } = require("../middleware/validate")

house.post("/", validate(houseCreateValidation, "body"), createHouse)
house.get("/", getHouses)
house.get("/search", searchHouse)
house.get("/:id", getHouse)
house.patch("/:id", validate(houseUpdateValidation, "body"), updateHouse)
house.delete("/:id", deleteHouse)
module.exports = { house }