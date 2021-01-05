'use strict'
const http = require('http');
const app = require('./app');
const db = require('./models');
const socketio = require('socket.io');
const bcrypt = require('bcrypt');
require('dotenv').config();

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// const options = {
//     key: fs.readFileSync('./cert/key.pem'),
//     cert: fs.readFileSync('./cert/cert.pem')
// };
//
//
// const sslServer = https.createServer(options, app);

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// ///////////////////////////////////////////
// LIVE CHAT with socket.io
// ///////////////////////////////////////////
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
});

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
});

// Initialize an Anonyme user 
// const createAnonyme = (req, res, next) => {
//     bcrypt.hash(process.env.ANONYME_PASSWORD, 10)
//     .then(hash => {
//         db.User.create({
//             user_name: process.env.ANONYME_NAME,
//             email: process.env.ANONYME_EMAIL,
//             birthdate: '1970-01-01',
//             password: hash
//           })
//     })
//     .catch(error => res.status(500).json({error}));
// };


db.sequelize.sync(
    // {force: true}
    )
.then(() => {
    // createAnonyme();
    server.listen(port);
});