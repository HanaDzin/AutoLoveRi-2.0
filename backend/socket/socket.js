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

//key = userId, value = socketId
const userSocketMap = {};

//listen for connections:
io.on('connection', (socket) => {
    //executes every time someone connects to server
    console.log("A user connected to: ", socket.id);

    //since we updated the user-socket map, we emit the event to all connected clients:
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //catch the userId passed from context to save it into map:
    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    //executes every time someone disconnects
    socket.on("disconnect", () => {
        console.log("User disconnected on: ", socket.id);
    
    //when users disconnects, remove it from the map:
    delete userSocketMap[userId];
    //since we updated the user-socket map, we emit the event to all connected clients:
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    })
});


export { app, io, server }

