const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    firstname: { type: String, required: true },
    lastname: { type: String, default: '' },
    birthday: { type: String, default: '' },
    jinsi: { type: String, enum: ['male', 'female'] },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    product: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
    ]
})

const User = model("User", userSchema)
module.exports = { User }