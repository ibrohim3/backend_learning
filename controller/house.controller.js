const { House } = require("../model/houseSchema")

const createHouse = async (req, res) => {
    try {
        const { region, city, house_number, street, family_members, location } = req.body
        if (!region) {
            return res.status(400).json({
                success: false,
                message: "majburiy maydonlar to'ldirilmadi."
            })
        } else {
            const newHouse = new House({
                region, city, house_number, street, family_members, location
            })
            await newHouse.save()
            return res.status(201).json({
                success: true,
                message: "Success",
                data: newHouse
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    }
}

const getHouses = async (req, res) => {
    try {
        const houseList = await House.find({})
        if (!houseList || houseList.length === 0) { return res.status(404).json({ success: false, message: "house is not found" }) }
        return res.status(200).json({ success: true, count: houseList.length, data: houseList })
    } catch (error) { return res.status(500).json({ success: false, message: "Server error: ", error: error.message }) }
}

const getHouse = async (req, res) => {
    try {
        const { id } = req.params
        const house = await House.findById(id)
        if (!house) { return res.status(404).json({ success: false, message: "house not found" }) }
        return res.status(200).json({ success: true, data: house })
    } catch (error) { return res.status(500).json({ success: false, message: "Server error: ", error: error.message }) }
}

const updateHouse = async (req, res) => {
    try {
        const { id } = req.params
        const { region, city, house_number, street, family_members, location } = req.body
        const updateData = { region, city, house_number, street, family_members, location }
        const updatedHouse = await House.findByIdAndUpdate(id, updateData, { new: true })
        if (!updatedHouse) {
            return res.status(404).json({ success: false, message: "House not found." })
        }
        return res.status(200).json({ success: true, message: "Success", data: updatedHouse })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error: ", error: error.message })
    }
}

const deleteHouse = async (req, res) => {
    try {
        const houseId = req.params.id
        const removed = await House.findByIdAndDelete(houseId)
        if (!removed) {
            return res.status(404).json({ success: false, message: "House not found" })
        }
        return res.status(200).json({ success: true, message: "House successfuly deleted!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error: ", error: error.message })
    }
}

const searchHouse = async (req, res) => {
    try {
        const { query } = req.query
        if (!query || typeof query !== "string") {
            return res.status(400).json({ success: false, message: "Invalid search query" })
        }
        const results = await House.find({
            $or: [{ region: { $regex: query, $options: "i" } }, { street: { $regex: query, $options: "i" } }]
        })
        if (!results || results.length === 0) {
            return res.status(404).json({ success: false, message: "No house found by search" })
        }
        return res.status(200).json({ success: true, message: "Found: ", count: results.length, data: results })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error: ", error: error.message })
    }
}
module.exports = { createHouse, getHouses, getHouse, updateHouse, deleteHouse, searchHouse }