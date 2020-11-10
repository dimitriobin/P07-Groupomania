const express = require('express');
const fs = require('fs');

const { Sequelize } = require('sequelize');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express');
const toobusy = require('toobusy-js');
require('dotenv').config();

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const commentsRoute = require('./routes/comments');
const subjectsRoute = require('./routes/subjects');

const app = express();


///////////////////////////////////
// database setup and testing
///////////////////////////////////
const db = require('./models');
// Test database
db.sequelize.authenticate()
.then(() => console.log('Database connected ...'))
.catch(err => console.log(err));


//////////////////////////////////////////////
// Set up a logger with morgan
//////////////////////////////////////////////
// log all errors to errors.log
app.use(morgan('common', {
    stream: fs.createWriteStream('./logging/errors.log', { flags: 'a' }),
    skip: function (req, res) { return res.statusCode < 400 }
  }));
// log all requests to access.log
app.use(morgan('common', {
stream: fs.createWriteStream('./logging/access.log', { flags: 'a' })
}));


//////////////////////////////////////////////
// Set up CORS 
//////////////////////////////////////////////
app.use(cors());


//////////////////////////////////////////////
// body parsers
//////////////////////////////////////////////
app.use(express.urlencoded({
    limit: "1kb",
    extended: false
}));
app.use(express.json({
    limit: "1kb"
}));


//////////////////////////////////////////////
// Set some secure headers with helmet.js
//////////////////////////////////////////////
app.use(helmet());


//////////////////////////////////////////////
// Express Session Middleware
//////////////////////////////////////////////
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: true
    }
}));

//////////////////////////////////////////////
// Secure the event-loop against DoS attacks
//////////////////////////////////////////////
app.use((req, res, next) => {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
    next();
    }
});


// Routes
app.use('/api/users', usersRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/posts', postsRoute);
app.use('/api/subjects', subjectsRoute);

module.exports = app;