import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { createServer } from 'http'
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer = createServer(app)
initSocket(httpServer)

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed!", err);
    });
