'use strict'
const http = require('http');
const app = require('./app');
const db = require('./models');
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

// Initialize an Anonyme user 
const createAnonyme = (req, res, next) => {
    bcrypt.hash(process.env.ANONYME_PASSWORD, 10)
    .then(hash => {
        db.User.create({
            user_name: process.env.ANONYME_NAME,
            email: process.env.ANONYME_EMAIL,
            password: hash
          })
    })
    .catch(error => res.status(500).json({error}));
};


db.sequelize.sync(
    {force: true}
    )
.then(() => {
    createAnonyme();
    server.listen(port);
});