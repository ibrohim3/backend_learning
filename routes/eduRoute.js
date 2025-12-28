const { Router } = require("express")
const edu = Router()
const { eduCreate, eduGetAll, eduGet, update, eduDelete } = require("../controller/edu.controller")

edu.post("/", eduCreate)
edu.get("/", eduGetAll)
edu.get("/:id", eduGet)
edu.patch("/:id", update)
edu.delete("/:id", eduDelete)
module.exports = { edu }
