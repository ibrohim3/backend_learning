const { Car } = require("../model/carSchema")

// Car Add
const carAdd = async (req, res) => {
    try {
        const {
            title,
            model,
            description,
            color,
            horsePower,
            carType,
            charging,
            weight,
            gasoline,
            yearMachine,
            price
        } = req.body
        if (!model || !carType) {
            return res.status(400).json({
                success: false,
                message: "Majburiy maydonlar to'ldirilmadi"
            })
        } else {
            const newCar = new Car({
                title,
                model,
                description,
                color,
                horsePower,
                carType,
                charging,
                weight,
                gasoline,
                yearMachine,
                price
            })
            await newCar.save()
            return res.status(201).json({
                success: true,
                message: "Moshina muvaffaqiyatli qo'shildi"
            })
        }
    } catch (error) {
        console.log("xato: ", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        })

    }
}

// Car Get All
const carGet = async (req, res) => {
    try {
        const carList = await Car.find({})
        return res.status(200).json({
            success: true,
            message: "Barcha moshinalar ro'yxati olindi",
            count: carList.length,
            innerData: carList
        })
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Moshinalarni olishda xato yuz berdi"
        })
    }
}

// Car Get By Id
const carGetById = async (req, res) => {
    try {
        const carId = req.params.id;

        if (!carId) {
            return res.status(400).json({
                success: false,
                message: "ID noto'g'ri formatda"
            })
        }

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Moshina topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Moshina topildi",
            car
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi id"
        });
    }
}

// Update Car
const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { title,
            model,
            description,
            color,
            horsePower,
            carType,
            charging,
            weight,
            gasoline,
            yearMachine,
            price } = req.body

        const updatedCar = await Car.findOneAndUpdate(
            { _id: id },
            {
                title,
                model,
                description,
                color,
                horsePower,
                carType,
                charging,
                weight,
                gasoline,
                yearMachine,
                price
            },
            { new: true }

        )
        if (!updatedCar) {
            return res.status(404).json({
                success: false,
                message: "Moshina topilmadi"
            })
        }

        res.status(200).json({
            success: true,
            message: "Muvaffaqiyatli yangilandi",
            cars: updatedCar
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        })
    }
}

// Delete Car
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCar = await Car.findByIdAndDelete(id)

        if (!deletedCar) {
            return res.status(404).json({
                success: false,
                message: "Moshina topilmadi"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Moshina muvaffaqiyatli o'chirildi",
            data: deletedCar
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        })
    }
}

// Search Car
const searchCar = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Qidiruv maydoni to'ldirilmadi"
            });
        }
        const results = await Car.find({
            $or: [
                { model: { $regex: query, $options: "i" } },
                { title: { $regex: query, $options: "i" } },
            ]
        });
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Moshina topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Qidiruv natijalari",
            count: results.length,
            data: results
        });
    } catch (error) {
        console.error("xatolik: ", error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi: ", error,
        });
    }
};

module.exports = {
    carAdd,
    carGet,
    carGetById,
    updateCar,
    deleteCar,
    searchCar
}