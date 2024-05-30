import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express();                      //express app

const server = http.createServer(app);      //creates http server
const io = new Server(server, {             //socket.io server based on http
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});



//listen for connections:
io.on('connection', (socket) => {
    //executes every time someone connects to server
    console.log("A user connected to: ", socket.id);

    //executes every time someone disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected on: ", socket.id);
    })
});


export { app, io, server }

