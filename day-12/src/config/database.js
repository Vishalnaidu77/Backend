const dns = require("dns");
const mongoose = require("mongoose")

const connectToDb = async () => {
    dns.setServers(['8.8.8.8', '1.1.1.1'])
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB");
}

module.exports = connectToDb;