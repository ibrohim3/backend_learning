const { Product } = require("../model/productSchema")

const productCreate = async (req, res) => {
    try {
        const { name, price, description, image, count } = req.body
        const existingProduct = await Product.findOne({ name })
        console.log(existingProduct);
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan maxsulot mavjud."
            })
        } else {
            const newProduct = new Product({ name, price, description, image, count })
            await newProduct.save()
            return res.status(201).json({
                success: true,
                message: "Success",
                data: {
                    id: newProduct._id,
                    productName: newProduct.name
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: ",
            error: error.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        if (!products) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        return res.status(200).json({ success: true, count: products.length, data: products })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error: ", error: error.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        return res.status(200).json({ success: true, data: product })
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error: ", error: error.message })
    }
}
module.exports = { productCreate, getProducts, getProduct }