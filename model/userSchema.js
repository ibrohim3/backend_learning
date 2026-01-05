const { Schema, model } = require("mongoose")
const { Product } = require("./productSchema")

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, default: '' },
    birthday: { type: String, default: '' },
    jinsi: { type: String, enum: ['male', 'famale'] },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    // product_id: { type: Schema.Types.ObjectId, ref: Product }
})

const User = model("user", userSchema)
module.exports = { User }