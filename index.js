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

const PORT = process.env.PORT || 5555
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

const { user } = require("./routes/userRoute")
const { car } = require("./routes/carRoute")
const { edu } = require("./routes/eduRoute")
app.use("/user", user)
app.use("/car", car)
app.use("/edu", edu)