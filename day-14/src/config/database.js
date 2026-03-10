require("dotenv").config()
const mongoose = require("mongoose");
const dns = require("dns")

const connectToDb = async () => {
    dns.setServers(['8.8.8.8', '1.1.1.1'])
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connect to DB");
}

module.exports = connectToDb;