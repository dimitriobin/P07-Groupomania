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
      console.log(users);
      let socketId = '';
      const isConnected = users.filter(user => user.userId === msg.toUser).length;
      if (isConnected) {
        socketId = users.filter(user => user.userId === msg.toUser)[0].socketId;
      } else {
        console.log('This user is not connected');
      }
      io.to(socketId).emit('privateMessage', msg)
    });

    // When a user create a conversation it inform the receiver directly
    socket.on('newConversation', conversation => {
      console.log(conversation);
      let socketId = '';
      const isConnected = users.filter(user => user.userId === conversation.toUser).length;
      if (isConnected) {
        socketId = users.filter(user => user.userId === conversation.toUser)[0].socketId;
      } else {
        console.log('This user is not connected');
      }
      io.to(socketId).emit('newConversation', conversation.conversation)
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
