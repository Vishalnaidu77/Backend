import mongoose from 'mongoose';
import 'dotenv/config';
import dns from 'dns'

const connectDB = async () => {
    try {
        dns.setServers(['8.8.8.8', '1.1.1.1'])
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
