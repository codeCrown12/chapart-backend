import app from "./app";
import { Server } from "socket.io";

const server = app.listen()
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001"
    }
})

const activeUsers = new Map()
io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
        activeUsers.set(userId, socket.id)
    })
    socket.on("join-room", (roomId) => {
        socket.join(roomId)
    })
    socket.on("send-msg", (data) => {
        socket.in(data.room_id).emit("msg-received", data)
        socket.emit("msg-sent", data)
    })
})