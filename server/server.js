import express from 'express';
import { createServer } from 'node:http';
import cors from "cors"
import { Server } from 'socket.io';



const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173"
    }
});

app.use(cors())
let users = []
let messages = []
io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);


    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });


    socket.on('newUser', (data) => {
        users = [...users, data]
        io.emit('newUserResponse', users)
      });

      socket.on("leaveChat" , (data)=>{
      users = data
      io.emit('newUserResponse', users)
    })



    socket.on("sendMessage", (data) => {
        messages = [...messages, data]
        console.log(messages)
        io.emit("sendMessageResponse", messages)
    })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});