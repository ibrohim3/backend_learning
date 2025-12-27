const { Router } = require("express")
const edu = Router()
const { eduCreate, eduGetAll, eduGet, update } = require("../controller/edu.controller")

edu.post("/", eduCreate)
edu.get("/", eduGetAll)
edu.get("/:id", eduGet)
edu.patch("/:id", update)
module.exports = { edu }
