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
        const { socketId } = users.filter(user => user.userId === msg.receiver_id)[0];
        console.log(socketId);
        io.to(socketId).emit('privateMessage', msg)
    });

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
