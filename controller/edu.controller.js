const { Edu } = require("../model/eduSchema")

// Post edu
const eduCreate = async (req, res) => {
    try {
        const { city, street, center_name, branch, rating } = req.body
        if (!center_name || !city) {
            return res.status(400).json({
                success: false,
                message: "center name and city required"
            })
        } else {
            const newEdu = new Edu({
                city, street, center_name, branch, rating
            })
            await newEdu.save()
            return res.status(201).json({
                success: true,
                message: "New edu succesfuly created."
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error:",
            error: error.message
        })
    }
}

// get edus
const eduGetAll = async (req, res) => {
    try {
        const edus = await Edu.find({})
        if (!edus || edus.length == 0) {
            return res.status(404).json({
                success: false,
                message: "Edus not found"
            })
        }
        return res.status(200).json({
            success: true,
            count: edus.length,
            data: edus
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error in get all edus"
        })
    }
}

// get one
const eduGet = async (req, res) => {
    try {
        const eduId = req.params.id
        const edu = await Edu.findById(eduId)
        if (!edu) {
            return res.status(404).json({
                success: false,
                message: "Edu is not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: edu
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

// update
const update = async (req, res) => {
    try {
        const { id } = req.params
        const { city, street, center_name, branch, rating } = req.body
        const updateData = { city, street, center_name, branch, rating }
        const updatedEdu = await Edu.findByIdAndUpdate(
            id, updateData, { new: true }
        )
        if (!updatedEdu) {
            return res.status(404).json({
                success: false,
                message: "Edu is not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Edu is succesfully updated!",
            updated: updatedEdu
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Server error: ",
            error: error.message
        })
    }
}

// delete
const eduDelete = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Edu.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Edu is not found"
            })
        }
        return res.status(200).json({
            success: false,
            message: "Deleted",
            deleted: deleted
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}
module.exports = { eduCreate, eduGetAll, eduGet, update, eduDelete }