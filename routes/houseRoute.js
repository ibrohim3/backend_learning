const { Router } = require("express")
const house = Router()
const { createHouse, getHouses, getHouse } = require("../controller/house.controller")

house.post("/", createHouse)
house.get("/", getHouses)
house.get("/:id", getHouse)
module.exports = { house }