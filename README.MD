# Realtime Chat

**[Link Video](https://www.youtube.com/watch?v=jD7FnbI76Hg)**


## 🏤 Emissão de mensagens

```js
io.on('connection', socket => {

  // Emite para o cliente conectado
  socket.emit('message', 'Welcome to chatcord');

  // Emite para todos os clientes exceto pro emissor
  socket.broadcast.emit('message', 'A new user has joined the chat');

  socket.on('disconnect', () => {
    // Emite para todos os clientes conectados
    io.emit('message', 'A user has left the chat');
  })
});
```


## Referências
* [socket.io](https://socket.io/docs/emit-cheatsheet/)