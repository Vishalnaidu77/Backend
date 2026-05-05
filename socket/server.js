import app from './src/app.js'
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer(app)
const io = new Server(httpServer, {

})


io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (msg) => {
        console.log(msg);
        socket.broadcast.emit("demo", msg)
    })
})

const PORT = 8000

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))