// const express = require('express');
// const app = express();
// const port = 3000;
// const http = require("http");
// const path = require("path") ;
// const socketio = require("socket.io");
// const server = http.createServer(app);
// const io = socketio(server);
// app.set("view engine", "ejs")

// app.use(express.static(path.join(__dirname, 'public',)))

// io.on("connection", function (socket) {
//     console.log("connected")
// })
// app.get('/', (req, res) => 
//     res.render("index"))

// app.listen(port, () => 
//     console.log(`Example app listening on port ${port}!`))

const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

// Create HTTP server
const server = http.createServer(app);
const io = socketio(server);

// Set view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle socket connection
io.on('connection', function (socket) {
    socket.on("send-location", function(data){
        io.emit("recieve-location", {id: socket.id, ...data})
    })
    console.log('connected');
    socket.on("disconnect", function(){
        io.emit("user-disconnected" ,socket.id)
    })
});

// Render index.ejs on the root route
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
