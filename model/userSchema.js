const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, default: '' },
    birthday: { type: String, default: '' },
    jinsi: { type: String, enum: ['male', 'famale'] },
    address: { type: String, default: '' },
    phone: { type: String, default: '' }
})

const User = model("user", userSchema)
module.exports = { User }