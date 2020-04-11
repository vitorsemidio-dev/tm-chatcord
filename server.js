const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = 'ChatCord Bot';

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  socket.emit('message', formatMessage(botName, 'Welcome to chatcord'));

  socket.broadcast.emit('message', formatMessage(botName, 'A new user has joined the chat'));

  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the chat'));
  });

  socket.on('chatMessage', (msg) => {
    io.emit('message', formatMessage('USER', msg));
  })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
