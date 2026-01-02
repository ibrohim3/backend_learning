const { Router } = require("express")
const house = Router()
const { createHouse, getHouses, getHouse, updateHouse, deleteHouse, searchHouse } = require("../controller/house.controller")

house.post("/", createHouse)
house.get("/", getHouses)
house.get("/search", searchHouse)
house.get("/:id", getHouse)
house.patch("/:id", updateHouse)
house.delete("/:id", deleteHouse)
module.exports = { house }