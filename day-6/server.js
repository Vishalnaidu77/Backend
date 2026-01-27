require("dotenv").config();
const app = require("./src/app")
const mongoose = require("mongoose")

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Database Connected");
    } catch (err) {
        console.log("Database not connected:-", err.message);
    }
}

connectToDb();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})