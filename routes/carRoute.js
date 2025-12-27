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

car.post("/", carAdd)
car.get("/", carGet)
car.get("/:id", carGetById)
car.patch("/:id", updateCar)
car.delete("/:id", deleteCar)
car.get("search/:query", searchCar)

module.exports = { car }