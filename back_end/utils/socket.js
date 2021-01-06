exports.socketConfig = (io) => {
  const users = [];

  io.on('connection', socket => {
  
    // When a user connect, take is ID and socketId and push it to the users array
    const isOnline = users.find(user => user.userId === socket.handshake.query.userId);
    if (!isOnline) {
      users.push({
          userId: Number.parseInt(socket.handshake.query.userId, 10),
          socketId: socket.id
      });
    }

    // Emit to all users the array of all users
    io.emit('onelineUsers', users);

    socket.on('privateMessage', msg => {
        // add the message to the database's table
        // if (msg.receiver.socketId) {emit the event to both receiver and sender}
        // else {emit only to the sender }
        io.to(msg.receiver.socketId)
            .to(socket.id)
            .emit('privateMessage', {
                ...msg,
                sender: users.filter(user => user.socketId === socket.id)[0]
            }
        )
    })

    //Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        users.forEach((user, index) => {
            if (user.socketId === socket.id) {
                users.splice(index, 1);
            }
        });
        io.emit('onelineUsers', users);
    });
  })
}
