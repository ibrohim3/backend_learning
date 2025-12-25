const express = require('express');
const { connect } = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

async function connectToDb() {
    try {
        await connect(process.env.MONGO_URL)
        console.log("mongo ulandi");

    } catch (error) {
        console.error("mongo ulanishda xato: ", error.message);
    }
}
connectToDb()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

const { user } = require("./routes/userRoute")
app.use("/user", user)