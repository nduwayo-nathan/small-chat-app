const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")

app.use(cors())

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        method:["GET","POST"]
    },
});

io.on("connection",(socket)=>{
    console.log(`User connected:${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data)
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("received_message",data);
    })
    socket.on("disconnected",()=>{
        console.log("user Doisconnect", socket.id)
    });
});

server.listen(3001,()=>{
    console.log("Nathan's serverr running on 3002 port")
})
