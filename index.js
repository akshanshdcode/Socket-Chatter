const http = require("http")
const express = require("express")
const path = require('path')
const { Server } = require("socket.io")
const app = express()
const server = http.createServer(app)
const PORT = 9000
const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        msg = "~ " + socket.id + " : " + msg;
      io.emit('chat message', msg);
    });
});

app.use(express.static(path.resolve('./public')))

app.get("/", (req, res) => {
    return res.sendFile('/public/index.html')
})

server.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})