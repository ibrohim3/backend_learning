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
module.exports = { createHouse, getHouses, getHouse }