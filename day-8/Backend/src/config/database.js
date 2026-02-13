const mongoose = require("mongoose")
const dns = require("dns")

const connectToDb = async () => {
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"])
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected Successfully");
    } catch (err) {
        console.log("DB Not Connected", err.message);
    }
}

module.exports = connectToDb