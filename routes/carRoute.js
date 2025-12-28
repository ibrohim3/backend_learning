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

car.post("/", validate(carCreateValidation, "body"), carAdd)
car.get("/", carGet)
car.get("/:id", carGetById)
car.patch("/:id", validate(carUpdateValidation, "body"), updateCar)
car.delete("/:id", deleteCar)
car.get("search/:query", searchCar)

module.exports = { car }