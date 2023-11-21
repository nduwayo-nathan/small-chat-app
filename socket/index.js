const http=require('http');
const express=require('express');

const app=express()

const server=http.createServer(app);

const io =require('socket.io')(server);

server.listen(9000,()=>{
    console.log("NATHAN server running");
})
