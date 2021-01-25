'use strict'
class WebSockets {
  users = [];
  connection(client) {
    // add identity of user mapped to the socket id
    this.users.push({
        socketId: client.id,
        userId: Number.parseInt(client.handshake.query.userId, 10),
    });
    // Emit the users array to all other connected users
    global.io.sockets.emit('onlineUsers', this.users);
    // subscribe person to chat
    client.on("subscribe", (room) => {
      client.join(room);
    });
    // serve a message to a room 
    client.on('message', (msg) => {
      client.broadcast.to(msg.ConversationId).emit('message', msg);
    });
    // serve a message when it's read by other participant
    client.on('lastMessageRead', (msg) => {
      client.broadcast.to(msg.ConversationId).emit('lastMessageRead', msg);
    });
    // serve a conversation to participants
    client.on('addNewConversation', (conv) => {
      conv.Users.forEach((participant) => {
        const userInfos = this.users.filter((user) => user.userId === participant.id && user.socketId !== client.id);
        userInfos.map((userInfo) => {
          const socketConn = userInfo.socketId;
          if (socketConn) {
            client.to(socketConn).emit('newConversation', conv);
          }
        });
      });
    });
    // mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
      global.io.sockets.emit('onlineUsers', this.users);
    });
  }
}

module.exports = new WebSockets();