const { User } = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")

// Login User
const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        console.log(user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Username is invalid!"
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Username or Password is invalid!"
            })
        }
        const token = jwt.sign({ username: user.username }, "secret");
        return res.json({
            message: "Token",
            token: token
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error: An error occured during the login process."
        });
    }
};
// Post Register
const postRegister = async (req, res) => {
    try {
        const {
            username,
            password,
            firstname,
            lastname,
            birthday,
            jinsi,
            address,
            phone,
        } = req.body;
        const existingUser = await User.findOne({ username })

        console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan foydalanuvchi mavjud",
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                firstname,
                lastname,
                birthday,
                jinsi,
                address,
                phone,
                password: hashedPassword,
            });
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: "Ro'yxatdan o'tish muvaffaqiyatli yakunl-andi!",
                data: {
                    id: newUser._id,
                    username: newUser.username
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server xatosi: Ro'yxatdan o'tish jarayonida xato yuz berdi."
        })

    }
}
// getUsers
const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            success: true,
            message: "Barcha foydalanuvchilar ro'yxati olingan.",
            count: users.length,
            innerData: users
        });
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).json({
            success: false,
            message: "Server xatosi: Foydalanuvchilarni olishda xato yuzberdi"
        })

    }
}
// getUserById,
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }
        const user = await User.findById(id).populate("product_id");;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// updateUser
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, lastname, phone, address, password } = req.body;

        const updateData = { username, lastname, phone, address };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        if (username) {
            const existingUser = await User.findOne({ username });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({
                    success: false,
                    message: "Bu username allaqachon mavjud"
                });
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User topilmadi"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User muvaffaqiyatli yangilandi",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message
        });
    }
};

// deleteUser
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const userSearch = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid search query",
            });
        }
        const result = await User.find({
            $or: [
                { firstname: { $regex: query, $options: "i" } },
                { lastname: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
            ],
        });
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found matching the query",
            });
        }
        res.json({ success: true, message: "Found", count: result.length, data: result });
    } catch (error) {
        console.log("Error fetching user", error);
        res.status(500).json({
            message: "Server error: Failed to fetch users",
            error: error.message
        });
    }
};

module.exports = {
    postRegister,
    getUsers, getUserById,
    updateUser,
    deleteUser,
    postLogin,
    userSearch
} 