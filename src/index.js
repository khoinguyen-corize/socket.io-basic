const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected`);

  socket.on('send_message', (msg) => {
    io.emit('send_message', msg);
  })

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
