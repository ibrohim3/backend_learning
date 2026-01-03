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

module.exports = { productCreate }