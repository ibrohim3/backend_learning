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

const updateProduct = async (req, res) => {
    try {

        const { id } = req.params
        const { name, price, description, image, count } = req.body
        const updateData = { name, price, description, image, count }
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true })
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "not found" })
        }
        return res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error: ", error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id
        const removed = await Product.findByIdAndDelete(productID)
        if (!removed) {
            return res.status(404).json({ success: false, message: "not found" })
        }
        return res.status(200).json({ success: true, data: { id: removed._id, name: removed.name } })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

const searchProduct = async (req, res) => {
    try {
        const { q } = req.query
        if (!q || typeof q !== 'string') {
            return res.status(400).json({ success: false, message: "Invalide search query" })
        }
        const results = await Product.find({
            $or: [{ name: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: 'i' } }]
        })
        if (!results || results.length === 0) {
            return res.status(404).json({ success: false, message: "Not found" })
        }
        return res.status(200).json({ success: true, count: results.length, data: results })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error: ", error: error.message })
    }
}
module.exports = { productCreate, getProducts, getProduct, updateProduct, deleteProduct, searchProduct }